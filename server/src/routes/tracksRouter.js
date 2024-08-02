const { Router } = require('express');
const { Track } = require('../../db/models');
const { TrackSchema, TrackReqBodySchema } = require('../schemas/track');

const todosRouter = Router();

todosRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const tracks = await Track.findAll();
      res.status(200).json(TrackSchema.array().parse(tracks));
    } catch (error) {
      console.log(error, 'Ошибка получения всех Трэков');
      res.status(500).json({ message: 'Ошибка получения всех Трэков' });
    }
  })
  .post(async (req, res) => {
    try {
      const { trackName, originalName, trackListId } = TrackReqBodySchema.parse(req.body);
      const createdTrack = await Track.create({ trackName, originalName, trackListId });
      res.status(201).json(TrackSchema.parse(createdTrack));
    } catch (error) {
      console.log(error, 'Ошибка добавления Трэка');
      res.status(500).json({ message: 'Ошибка добавления новой Трэка' });
    }
  });

todosRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const track = await Track.findByPk(req.params.id);
      res.json(TrackSchema.parse(track));
    } catch (error) {
      console.log(error, 'Ошибка получения Трэка');
      res.status(500).json({ message: 'Ошибка получения Трэка' });
    }
  })
  .delete(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const track = await Track.findByPk(req.params.id);
      await track.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error, 'Ошибка удаления Трэка');
      res.status(500).json({ message: 'Ошибка удаления Трэка' });
    }
});

module.exports = todosRouter;
