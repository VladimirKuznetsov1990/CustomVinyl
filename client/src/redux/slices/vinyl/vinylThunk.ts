import { createAsyncThunk } from '@reduxjs/toolkit';
import vinylService from '../../../services/vinylService';
import type { VinylDataType, VinylType } from '../../../types/vinylTypes';

export const getVinylsThunk = createAsyncThunk(
  'vinyls/getAllVinyls',
  async () => {
    const data = await vinylService.getVinyls();
    return data;
  },
);

export const addVinylThunk = createAsyncThunk<VinylType, VinylDataType>(
  'vinyl/addVinyl',
  async (vinylData) => {
    const data = await vinylService.addVinyl(vinylData);
    return data;
  },
);
