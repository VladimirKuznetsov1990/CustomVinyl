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

export type OrderItemType = z.infer<typeof OrderItemSchema>;

export type OrderItemListType = OrderItemType[];

export type OrderItemDataType = Omit<OrderItemType, 'id'>;