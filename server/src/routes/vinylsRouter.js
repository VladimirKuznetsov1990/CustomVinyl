const fs = require('fs/promises');
const sharp = require('sharp');
const { Router } = require('express');
const { Vinyl } = require('../../db/models');
const { VinylSchema, vinylReqBodySchema } = require('../schemas/vinyl');
const upload = require('../middlewares/multer.middleware');

const vinylsRouter = Router();

vinylsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const vinyls = await Vinyl.findAll();
      res.status(200).json(VinylSchema.array().parse(vinyls));
    } catch (error) {
      console.log(error, 'Ошибка получения всех Пластинок');
      res.status(500).json({ message: 'Ошибка получения всех Пластинок' });
    }
  })
  .post(upload.single('img'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не найден' });
      }
      const filename = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${name}`, outputBuffer);

      // const { userId, color, userImg, formatId, price, trackListId } = vinylReqBodySchema.parse(
      //   req.body,
      // );
      const createdVinyl = await Vinyl.create({
        userId: req.body.userId,
        color: req.body.color,
        userImg: filename,
        formatId: req.body.formatId,
        price: req.body.price,
        trackListId: req.body.trackListId,
      });
      res.status(201).json(VinylSchema.parse(createdVinyl));
    } catch (error) {
      console.log(error, 'Ошибка добавления новой Пластинки');
      res.status(500).json({ message: 'Ошибка добавления новой Пластинки' });
    }
});

vinylsRouter
.route('/:id')
.get(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const vinyl = await Vinyl.findByPk(req.params.id);
      res.json(VinylSchema.parse(vinyl));
    } catch (error) {
      console.log(error, 'Ошибка получения одной Пластинки');
      res.status(500).json({ message: 'Ошибка получения одной Пластинки' });
    }
  })
  .delete(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const vinyl = await Vinyl.findByPk(req.params.id);
      await vinyl.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error, 'Ошибка удаления Пластинки');
      res.status(500).json({ message: 'Ошибка удаления Пластинки' });
    }
  })
  .patch(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const vinyl = await Vinyl.findOne({
        where: { id: req.params.id },
      });
      await vinyl.update(VinylSchema.partial().parse(req.body));
      res.json(VinylSchema.parse(vinyl));
    } catch (error) {
      console.log(error, 'Ошибка обновления Пластинки');
      res.status(500).json({ message: 'Ошибка обновления Пластинки' });
    }
});

module.exports = vinylsRouter;
