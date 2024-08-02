const { Router } = require('express');
const { TrackList } = require('../../db/models');
const { TrackListSchema, TrListReqBodySchema } = require('../schemas/trackList');

const trackListsRouter = Router();

trackListsRouter.route('/').post(async (req, res) => {
  try {
    const { userId } = TrListReqBodySchema.parse(req.body);
    const createdTrackList = await TrackList.create({ userId });
    res.status(201).json(TrackListSchema.parse(createdTrackList));
  } catch (error) {
    console.log(error, 'Ошибка добавления нового Трэклиста');
    res.status(500).json({ message: 'Ошибка добавления нового Трэклиста' });
  }
});

trackListsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const trackList = await TrackList.findByPk(req.params.id);
      res.json(TrackListSchema.parse(trackList));
    } catch (error) {
      console.log(error, 'Ошибка получения одного Трэклиста');
      res.status(500).json({ message: 'Ошибка получения одного Трэклиста' });
    }
  })
  .delete(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const trackList = await TrackList.findByPk(req.params.id);
      await trackList.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error, 'Ошибка удаления Трэклиста');
      res.status(500).json({ message: 'Ошибка удаления Трэклиста' });
    }
});

module.exports = trackListsRouter;
