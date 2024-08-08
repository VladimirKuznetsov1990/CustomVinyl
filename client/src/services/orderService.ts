import type { AxiosInstance } from 'axios';
import apiInstance from './apiInstance';
import {
  type OrderData,
  OrderSchema,
  type OrderDataType,
  type OrderListType,
  type OrderType,
  type UpdateStatusOrderType,
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

  async addOrder(formData: FormData): Promise<OrderType> {
    const { data } = await this.api.post<OrderType>('/orders', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  async deleteOrder(id: number): Promise<void> {
    return this.api.delete(`/orders/${id}`);
  }

  async updateStatusOrder(id: number, obj: UpdateStatusOrderType): Promise<OrderType> {
    const { data } = await this.api.patch<OrderType>(`/orders/${id}/status`, obj);
    return data;
  }
}

export default new OrderService(apiInstance);
