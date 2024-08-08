// src/redux/slices/imageSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

const CroppedImageSchema = z.object({
  croppedImage: z.object({file: z.string(), fileUrl: z.string()}).nullable(),
});

// type CroppedImageState = z.infer<typeof CroppedImageSchema>;

type CroppedImageState = {
  croppedImage: {file: string | File, fileUrl: string} | null
}

const initialState: CroppedImageState = {
  croppedImage: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setCroppedImage(state, action: PayloadAction<CroppedImageState['croppedImage'] | null>) {
      state.croppedImage = action.payload;
    },
    clearCroppedImage(state) {
      state.croppedImage = null;
    },
  },
});

export const { setCroppedImage, clearCroppedImage } = imageSlice.actions;
export default imageSlice.reducer;
