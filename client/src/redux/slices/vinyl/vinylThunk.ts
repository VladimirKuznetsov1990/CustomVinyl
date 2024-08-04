import { createAsyncThunk } from "@reduxjs/toolkit";
import vinylService from "../../../services/vinylService";
import type { VinylDataType, VinylType } from "../../../types/vinylTypes";

// eslint-disable-next-line import/prefer-default-export
export const getVinylsThunk = createAsyncThunk('vinyls/getAll', async () => {
    const data = await vinylService.getVinyls();
    return data;
});

export const addVinylThunk = createAsyncThunk<VinylType, VinylDataType>('vinyls/add', async (obj) => {
    const data = await vinylService.addVinyl(obj);
    return data;
});
