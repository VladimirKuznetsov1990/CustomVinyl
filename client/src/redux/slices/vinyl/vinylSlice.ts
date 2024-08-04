import { createSlice } from "@reduxjs/toolkit";
import type { VinylListType } from "../../../types/vinylTypes"
import { addVinylThunk, getVinylsThunk } from "./vinylThunk";


type InitialStateType = {
    data: VinylListType;
};


const initialState: InitialStateType = {
    data: [],
};

const vinylSlice = createSlice({
  name: 'vinyl',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVinylsThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
    builder.addCase(addVinylThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });
  },
});

export default vinylSlice.reducer;
