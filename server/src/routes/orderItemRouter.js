const { Router } = require('express');
const { OrderItem } = require('../../db/models');
const { OrderItemSchema } = require('../schemas/orderItem');
const router = Router();

//Получить все позиции в заказе
router.get('/:orderId', async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll({ where: { orderId: req.params.orderId } });
        res.json(OrderItemSchema.array().parse(orderItems));
    } catch (error) {
        console.log('Ошибка получения всех позиций заказа',error);
        res.sendStatus(500).json({ message: 'Ошибка получения всех позиций заказа' });
    }
});

//Удалить позицию в заказе
router.delete('/:id', async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (orderItem) {
            await orderItem.destroy();
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log('Ошибка удаления позиции в заказе', error);
        res.sendStatus(500).json({ message: 'Ошибка удаления позиции в заказе' });
    }
});

module.exports = router;