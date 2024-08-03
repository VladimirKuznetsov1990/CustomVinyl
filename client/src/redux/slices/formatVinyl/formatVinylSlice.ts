import { createSlice } from '@reduxjs/toolkit';
import type { FormatListType } from '../../../types/formatVinylTypes';
import { getFormatVinylThunk } from './formatVinylThunk';

type InitialStateType = {
  data: FormatListType;
};

const initialState: InitialStateType = {
  data: [],
};

const formatVinylSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFormatVinylThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

export default formatVinylSlice.reducer;
