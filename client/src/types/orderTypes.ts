import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  status: z.string(),
  totalPrice: z.number(),
  formatId: z.number(),
  userImg: z.string(),
  color: z.string(),
  quantity: z.number(),
  tracks: z.array(z.string()),
  userName: z.string(),
  email: z.string(),
  address: z.string(),
  phone: z.string(),
});

export const OrdersSchema = z.array(OrderSchema);
export const orderReqBodySchema = OrderSchema.omit({ id: true });

export type OrderType = z.infer<typeof OrderSchema>;

export type OrderListType = OrderType[];

export type OrderDataType = Omit<OrderType, 'id'>;

export type UpdateStatusOrderType = {
  status: string;
};
