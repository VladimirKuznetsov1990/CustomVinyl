import type { AxiosInstance } from "axios";
import apiInstance from "./apiInstance";
import type { TrackListDataType, TrackListType } from "../types/trackListTypes";


class TrackListService {
    constructor(private readonly api: AxiosInstance) {}

    async addTrackList(obj: TrackListDataType): Promise<TrackListType> {
        const { data } = await this.api.post<TrackListType>('/trackLists', obj);
        return data;
    }   
}

export default new TrackListService(apiInstance)