import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OrderData, OrderDataType, OrderListType, OrderType, UpdateStatusOrderType } from "../../../types/orderTypes";
import orderService from "../../../services/orderService";

// eslint-disable-next-line import/prefer-default-export
export const getOrdersThunk = createAsyncThunk<OrderListType>('orders/getAll', async () => {
    const data = await orderService.getOrders();
    return data;
});


export const addOrderThunk = createAsyncThunk('orders/add', async (formData: FormData) => {
    const data = await orderService.addOrder(formData);
    return data;
});

export const deleteOrderThunk = createAsyncThunk<OrderType['id'], OrderType['id']>('orders/delete', async (id) => {
    await orderService.deleteOrder(id);
    return id;
});

// export const getOrdersOfUserThunk = createAsyncThunk<OrderListType>('orders/getOrdersOfUser', async (id) => {
//     const data = await orderService.getOrdersOfUser(id);
//     return data;
// });


// export const updateOrderThunk = createAsyncThunk<OrderType, {id: number, obj: OrderDataType}>('orders/update', async ({ id, obj }) => {
//     const data = await orderService.updateOrder(id, obj);
//     return data;
// });

export const updateStatusOrderThunk = createAsyncThunk<OrderType, {id: number, obj: UpdateStatusOrderType}>('orders/updateStatus', async ({ id, obj }) => {
    const data = await orderService.updateStatusOrder(id, obj);
    return data;
});