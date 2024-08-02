const { z } = require('zod');

const OrderItemSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  vinylId: z.number(),
  quantity: z.number(),
  price: z.number(),
});

const orderItemReqBodySchema = OrderItemSchema.omit({ id: true });

module.exports = { OrderItemSchema, orderItemReqBodySchema };
