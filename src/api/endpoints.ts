export const BASE_URL: string = import.meta.env.VITE_API_URL || 'https://api.example.com/api/v1';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  ME: '/user/me',

} as const;

export const SUBSCRIPTION_ENDPOINTS = {
  PLANS: '/subscriptions/plans',
  SUBSCRIBE: '/subscriptions/create',
  CURRENT_SUBSCRIPTION: '/subscriptions/current',

} as const;

export const PAYMENT = {
  CREATE_INTENT: '/payments/create-payment-intent',
} as const