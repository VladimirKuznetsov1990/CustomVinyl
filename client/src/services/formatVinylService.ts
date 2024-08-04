import type { AxiosInstance } from "axios";
import type { FormatListType } from "../types/formatVinylTypes";
import apiInstance from "./apiInstance";

class FormatVinylServise {
    constructor(private readonly api: AxiosInstance) {}

    async getFormats(): Promise<FormatListType> {
        const { data } = await this.api.get<FormatListType>('/formats');
        return data;
    }
}

export default new FormatVinylServise(apiInstance);