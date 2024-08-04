import type { AxiosInstance } from 'axios';
import apiInstance from './apiInstance';
import type {
  OrderDataType,
  OrderListType,
  OrderType,
  UpdateStatusOrderType,
} from '../types/orderTypes';

class OrderService {
  constructor(private readonly api: AxiosInstance) {}

  async getOrders(): Promise<OrderListType> {
    const { data } = await this.api.get<OrderListType>('/orders');
    return data;
  }

  async getOrdersOfUser(id: number): Promise<OrderListType> {
    const { data } = await this.api.get<OrderListType>(`/orders/user/${id}`);
    return data;
  }

  async addOrder(obj: OrderDataType): Promise<OrderType> {
    const { data } = await this.api.post<OrderType>('/orders', obj);
    return data; //TODO сомневаюсь очень с этим сервисом, как создатся заказ с такими ключами
  }

  async deleteOrder(id: number): Promise<void> {
    return this.api.delete(`/orders/${id}`);
  }

  async updateOrder(id: number, obj): Promise<OrderType> {
    const { data } = await this.api.patch<OrderType>(`/orders/${id}`, obj);
    return data;
  }

  async updateStatusOrder(id: number, obj: UpdateStatusOrderType): Promise<OrderType> {
    const { data } = await this.api.patch<OrderType>(`/orders/${id}/status`, obj);
    return data;
  }
}

export default new OrderService(apiInstance);
