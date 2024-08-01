const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../../config/cookiesConfig');

const router = Router();

router.post('/signup', async (req, res) => {
  const { userName, email, pass } = req.body;

  if (userName && email && pass) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { userName, pass: await bcrypt.hash(pass, 10) },
      });

      if (!created) {
        return res.status(403).json({ message: 'User already exists' });
      }

      const plainUser = user.get();
      delete plainUser.pass;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  if (email && pass) {
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!(await bcrypt.compare(pass, user.pass))) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const plainUser = user.get();
      delete plainUser.pass;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = router;
