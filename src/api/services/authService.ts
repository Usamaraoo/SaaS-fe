import apiClient from '../axios';
import { AUTH_ENDPOINTS } from '../endpoints';
import type {
  LoginCredentials,
  RegisterData,
} from '../../types';
import type { User } from '@/types/user.type';
import type { ApiResponse } from '@/types/api.type';

// Login user
export const login = async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw (error as any).response?.data || (error as Error).message;
  }
};

// Register new user
export const register = async (userData: RegisterData): Promise<ApiResponse<true>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw (error as any).response?.data || (error as Error).message;
  }
};

// Logout user
export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    // Clear tokens even if request fails
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw (error as any).response?.data || (error as Error).message;
  }
};

