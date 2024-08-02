const { Router } = require('express');
const { Order, OrderItem } = require('../../db/models');
const { OrderSchema, orderReqBodySchema } = require('../schemas/order');
const router = Router();


// Получить все заказы
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: OrderItem });
    res.json(OrderSchema.array().parse(orders));
  } catch (error) {
    console.log('Ошибка получения всех заказов', error);
    res.sendStatus(500).json({ message: 'Ошибка получения всех заказов' });
  }
});

// Получить все заказы определенного пользователя
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.userId }, include: OrderItem });
    res.json(OrderSchema.array().parse(orders));
  } catch (error) {
    console.log('Ошибка получения всех заказов пользователя', error);
    res.sendStatus(500).json({ message: 'Ошибка получения всех заказов пользователя' });
  }
});

// Создать новый заказ
router.post('/', async (req, res) => {
  try {
    const { userId, status, totalPrice, orderItems } = orderReqBodySchema.parse(req.body);
    const order = await Order.create({ userId, status, totalPrice });
    await Promise.all(orderItems.map(item => OrderItem.create({ ...item, orderId: order.id })));
    res.json(OrderSchema.parse(order));
  } catch (error) {
    console.log('Ошибка создания заказа',error);
    res.sendStatus(500).json({ message: 'Ошибка создания заказа' });
  }
});

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

// Изменить сам заказ
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, status, totalPrice } = orderReqBodySchema.partial().parse(req.body);

    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');

    await order.update({ userId, status, totalPrice });
    res.json(OrderSchema.parse(order));
  } catch (error) {
    console.log('Ошибка обновления заказа', error);
    res.status(500).json({ message: 'Ошибка обновления заказа' });
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
