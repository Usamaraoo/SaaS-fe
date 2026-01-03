import type { User } from '@/types/user.type';
import apiClient from '../axios';
import { USER_ENDPOINTS } from '../endpoints';
import type { ApiResponse } from '@/types/api.type';



// Get current user profile
export const getProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.get(USER_ENDPOINTS.ME);
    return response.data;
  } catch (error) {
    throw (error as any).response?.data || (error as Error).message;
  }
};



