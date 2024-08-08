import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OrderListType } from '../../../types/orderTypes';
import { addOrderThunk, deleteOrderThunk, getOrdersThunk, updateStatusOrderThunk } from './orderThunk';

type InitialStateType = {
  data: OrderListType;
  deliveryAddress: string;
};

const initialState: InitialStateType = {
  data: [],
  deliveryAddress: '',
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setDeliveryAddress(state, action: PayloadAction<string>) {
      state.deliveryAddress = action.payload;
    },
    resetDeliveryAddress(state) {
      state.deliveryAddress = '';
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    })
    .addCase(addOrderThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
      state.deliveryAddress = '';
    })
    .addCase(addOrderThunk.rejected, (state) => {
      state.data = [];
    })
    .addCase(updateStatusOrderThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.map((order) => {
        if (order.id === payload.id) {
          return payload;
        }
        return order;
      });
    })
    .addCase(deleteOrderThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((order) => order.id !== payload);
    });
  },
});

export const { setDeliveryAddress, resetDeliveryAddress } = orderSlice.actions;

export default orderSlice.reducer;
