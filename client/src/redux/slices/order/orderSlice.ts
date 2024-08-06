import { createSlice } from '@reduxjs/toolkit';
import type { OrderListType } from '../../../types/orderTypes';
import { addOrderThunk, getOrdersThunk, updateStatusOrderThunk } from './orderThunk';

type InitialStateType = {
  data: OrderListType;
};

const initialState: InitialStateType = {
  data: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    })
    .addCase(addOrderThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
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
  },
});

export default orderSlice.reducer;
