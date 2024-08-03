import { createSlice } from "@reduxjs/toolkit";
import type { TrackListsType } from "../../../types/trackListTypes"
import { addTrackListThunk } from "./trackListThunk";



type InitialStateType = {
    data: TrackListsType;
};


const initialState: InitialStateType = {
    data: [],
};


const trackListSlice = createSlice({
  name: 'trackList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTrackListThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });
  },
});

export default trackListSlice.reducer;