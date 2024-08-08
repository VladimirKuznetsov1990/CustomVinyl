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

export type OrderData = {
  userId: string;
  status: string;
  totalPrice: string;
  formatId: string;
  color: string;
  quantity: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  userImg?: File | string | undefined;
  tracks?: File[] | string[];
}

export type UpdateStatusOrderType = {
  status: string;
};
