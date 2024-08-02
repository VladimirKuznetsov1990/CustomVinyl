const { z } = require('zod');

const OrderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  status: z.string(),
  totalPrice: z.number(),
});

const orderReqBodySchema = OrderSchema.omit({ id: true });

module.exports = { OrderSchema, orderReqBodySchema };
