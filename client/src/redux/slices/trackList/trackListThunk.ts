import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TrackListDataType, TrackListType } from "../../../types/trackListTypes";
import trackListService from "../../../services/trackListService";

// eslint-disable-next-line import/prefer-default-export
export const addTrackListThunk = createAsyncThunk<TrackListType, TrackListDataType>('trackLists/add', async (obj) => {
    const data = await trackListService.addTrackList(obj);
    return data;
});
