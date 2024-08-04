import type { AxiosInstance } from 'axios';
import apiInstance from './apiInstance';
import type { VinylDataType, VinylListType, VinylType } from '../types/vinylTypes';

class VinylService {
  constructor(private readonly api: AxiosInstance) {}

  async getVinyls(): Promise<VinylListType> {
    const { data } = await this.api.get<VinylListType>('/vinyls');
    return data;
  }

  async addVinyl(obj: VinylDataType): Promise<VinylType> {
    const { data } = await this.api.post<VinylType>('/vinyls', obj);
    return data;
  }
}

export default new VinylService(apiInstance);
