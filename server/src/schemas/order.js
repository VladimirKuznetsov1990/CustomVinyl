const { z } = require('zod');

const OrderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  status: z.string(),
  totalPrice: z.number(),
  formatId: z.number(),
  userImg: z.string(),
  color: z.string(),
  quantity: z.number(),
  tracks: z.array(z.string()),
});

const orderReqBodySchema = OrderSchema.omit({ id: true });

module.exports = { OrderSchema, orderReqBodySchema };
