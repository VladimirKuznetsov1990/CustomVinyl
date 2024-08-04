import { createSlice } from "@reduxjs/toolkit";
import type { VinylListType } from "../../../types/vinylTypes"
import { addVinylThunk, getVinylsThunk } from "./vinylThunk";


type InitialStateType = {
    data: VinylListType;
    loading: boolean;
    error: string | null;
};


const initialState: InitialStateType = {
    data: [],
    loading: false,
    error: null,
};

const vinylSlice = createSlice({
  name: 'vinyl',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVinylsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVinylsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getVinylsThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(addVinylThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVinylThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.push(payload);
      })
      .addCase(addVinylThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default vinylSlice.reducer;
