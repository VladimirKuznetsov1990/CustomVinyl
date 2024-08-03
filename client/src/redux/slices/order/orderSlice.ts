import { createSlice } from "@reduxjs/toolkit";
import type { OrderListType } from "../../../types/orderTypes";
import { addOrderThunk, getOrdersThunk } from "./orderThunk";

type InitialStateType = {
    data: OrderListType;
  };
  
  const initialState: InitialStateType = {
    data: [],
  };
  
  const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
        state.data = payload;
      });
      builder.addCase(addOrderThunk.fulfilled, (state, { payload }) => {
        state.data.push(payload);
      });

    },
  });
  
  export default orderSlice.reducer;