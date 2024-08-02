import type { AxiosInstance } from "axios";
import apiInstance from "./apiInstance";

class OrderService {
    constructor(private readonly api: AxiosInstance) {}
}

export default new OrderService(apiInstance)