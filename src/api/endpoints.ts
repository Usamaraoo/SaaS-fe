export const BASE_URL: string = import.meta.env.VITE_API_URL || 'https://api.example.com/api/v1';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  ME: '/users/me',
} as const;

export const SUBSCRIPTION_ENDPOINTS = {
  PLANS: '/subscriptions/plans',
  SUBSCRIBE: '/subscriptions/create',
  CURRENT_SUBSCRIPTION: '/subscriptions/current',
  CHANGE_PLAN: '/subscriptions/change-plan',
  CANCEL_SUBSCRIPTION:'/subscriptions/cancel',
  RESUME_SUBSCRIPTION:'/subscriptions/resume',
  CREATE_PORTAL:'/subscriptions/portal'

} as const;

export const PAYMENT = {
  CREATE_INTENT: '/payments/create-payment-intent',
} as const