import { z } from 'zod';

export const OrderItemSchema = z.object({
    id: z.number(),
    orderId: z.number(),
    vinylId: z.number(),
    quantity: z.number(),
    price: z.number().nonnegative(),
});

export const OrderItemsSchema = z.array(OrderItemSchema);
export const orderItemReqBodySchema = OrderItemSchema.omit({ id: true });