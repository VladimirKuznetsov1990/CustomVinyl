const { Router } = require('express')
const { FormatVinyl } = require('../../db/models');
const { FormatSchema } = require('../schemas/formatVinyl');


const formatsRouter = Router();

formatsRouter
.route('/')
  .get(async (req, res) => {
    try {
      const formats = await FormatVinyl.findAll();
      res.status(200).json(FormatSchema.array().parse(formats));
    } catch (error) {
      console.log(error, 'Ошибка получения Форматов');
      res.status(500).json({ message: 'Ошибка получения всех "Задач"' });
    }
});

module.exports = formatsRouter;