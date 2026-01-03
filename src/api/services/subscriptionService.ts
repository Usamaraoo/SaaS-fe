import type { ApiResponse } from '@/types/api.type';
import apiClient from '../axios';
import { SUBSCRIPTION_ENDPOINTS } from '../endpoints';
import type { ISubscription, ISubscriptionPlan } from '@/types/subscription.type';
import type { User } from '@/types/user.type';


// Login user


export const plansList = async (): Promise<ApiResponse<ISubscriptionPlan[]>> => {
    try {
        const response = await apiClient.get(SUBSCRIPTION_ENDPOINTS.PLANS);
        return response.data;
    } catch (error) {
        throw (error as any).response?.data || (error as Error).message;
    }
}

export const createSubscription = async (priceId: string, paymentMethodId: string,): Promise<ApiResponse<unknown>> => {
    try {
        const response = await apiClient.post(SUBSCRIPTION_ENDPOINTS.SUBSCRIBE,
            {
                priceId,
                paymentMethodId
            }
        );
        return response.data;
    } catch (error) {
        throw (error as any).response?.data || (error as Error).message;
    }
}

export const getCurrentSubscription = async (): Promise<ApiResponse<ISubscription>> => {
    try {
        const response = await apiClient.get(SUBSCRIPTION_ENDPOINTS.CURRENT_SUBSCRIPTION);
        return response.data;
    } catch (error) {
        throw (error as any).response?.data || (error as Error).message;
    }
}