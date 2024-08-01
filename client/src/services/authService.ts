import type { AxiosInstance } from 'axios';
import type { UserFromBackendType, UserLoginType, UserSignUpType } from '../types/userTypes';
import axiosInstance from './apiInstance';

class AuthService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async signUp(formData: UserSignUpType): Promise<UserFromBackendType> {
    const { data } = await this.apiInstance.post<UserFromBackendType>('/auth/signup', formData);
    return data;
  }

  async login(formData: UserLoginType): Promise<UserFromBackendType> {
    const { data } = await this.apiInstance.post<UserFromBackendType>('/auth/login', formData);
    return data;
  }

  async logout(): Promise<{ status: number }> {
    const response = await this.apiInstance.post('/auth/logout');
    return { status: response.status };
  }

  async check(): Promise<UserFromBackendType> {
    const { data } = await this.apiInstance<UserFromBackendType>('/tokens/refresh');
    return data;
  }
}

export default new AuthService(axiosInstance);
