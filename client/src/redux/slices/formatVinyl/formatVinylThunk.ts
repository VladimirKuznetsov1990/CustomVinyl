import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FormatListType } from "../../../types/formatVinylTypes";
import formatVinylService from "../../../services/formatVinylService";

// eslint-disable-next-line import/prefer-default-export
export const getFormatVinylThunk = createAsyncThunk<FormatListType>('format/getAll', async () => {
    const data = await formatVinylService.getFormats();
    return data;
})