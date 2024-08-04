import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { TrackListsType } from '../../../types/trackListTypes';
import { addTrackListThunk } from './trackListThunk';

type InitialStateType = {
  data: TrackListsType;
  tempAudioFile: File | null; // Временное состояние для аудио файла
};

const initialState: InitialStateType = {
  data: [],
  tempAudioFile: null,
};

const trackListSlice = createSlice({
  name: 'trackList',
  initialState,
  reducers: {
    setTempAudioFile: (state, action: PayloadAction<File | null>) => {
      state.tempAudioFile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTrackListThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });
  },
});

export const { setTempAudioFile } = trackListSlice.actions;
export default trackListSlice.reducer;
