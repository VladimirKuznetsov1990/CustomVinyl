import { z } from 'zod';

export const OrderSchema = z.object({
    id: z.number(),
    userId: z.number(),
    status: z.number(),
    totalPrice: z.number(),
});

export const OrdersSchema = z.array(OrderSchema);
export const orderReqBodySchema = OrderSchema.omit({ id: true });