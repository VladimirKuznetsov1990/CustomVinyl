const { Router } = require('express');
const { Order, User } = require('../../db/models');
const { OrderSchema, orderReqBodySchema } = require('../schemas/order');
const fs = require('fs/promises');
const upload = require('../middlewares/multer.middleware');
const sharp = require('sharp');

const router = Router();
// Получить все заказы
router
  .route('/')
  .get(async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(OrderSchema.array().parse(orders));
    } catch (error) {
      console.log('Ошибка получения всех заказов', error);
      res.sendStatus(500).json({ message: 'Ошибка получения всех заказов' });
    }
  })
  .post(upload.single('userImg'), upload.array('tracks'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не найден' });
      }

      
      const fileName = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      // const { userId, status, totalPrice, formatId, userImg, color,quantity, trackListId } = orderReqBodySchema.parse(req.body);
      await fs.writeFile(`./public/img/${fileName}`, outputBuffer);

      const order = await Order.create({
        userId: req.body.userId,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        formatId: req.body.formatId,
        userImg: fileName,
        color: req.body.color,
        quantity: req.body.quantity,
        tracks: req.body.tracks,
      });

      // const plainOrder = await Order.findOne({
      //   where: {
      //     id: order.id,
      //   },
      //   include: {
      //     model: User,
      //     attributes: ['id', 'userName', 'email'],
      //   },
      // });
      res.json(OrderSchema.parse(order));
    } catch (error) {
      console.log('Ошибка создания заказа', error);
      res.sendStatus(500).json({ message: 'Ошибка создания заказа' });
    }
  });

// Получить все заказы определенного пользователя
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(OrderSchema.array().parse(orders));
  } catch (error) {
    console.log('Ошибка получения всех заказов пользователя', error);
    res.sendStatus(500).json({ message: 'Ошибка получения всех заказов пользователя' });
  }
});

// Создать новый заказ

// Удалить заказ
router.delete('/:id', async (req, res) => {
  try {
    await Order.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    console.log('Ошибка удаления заказа', error);
    res.sendStatus(500).json({ message: 'Ошибка удаления заказа' });
  }
});

// Обновить статус заказа
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = orderReqBodySchema.partial().parse(req.body);

    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');

    await order.update({ status });
    res.json(OrderSchema.parse(order));
  } catch (error) {
    console.log('Ошибка обновления статуса заказа', error);
    res.status(500).json({ message: 'Ошибка обновления статуса заказа' });
  }
});

module.exports = router;
