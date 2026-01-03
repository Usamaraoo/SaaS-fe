import type { ApiResponse } from '@/types/api.type';
import apiClient from '../axios';
import { PAYMENT } from '../endpoints';


export const createPaymentIntent = async (amount: number): Promise<ApiResponse<{ clientSecret: string, paymentIntentId: string }>> => {
    try {
        const response = await apiClient.post(PAYMENT.CREATE_INTENT, { amount });
        return response.data;
    } catch (error) {
        throw (error as any).response?.data || (error as Error).message;
    }
}