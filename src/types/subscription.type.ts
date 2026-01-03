export interface ISubscriptionPlan {
    id: string;
    productId: string;
    name: string;
    description: string | null;
    type: 'basic' | 'premium' | 'elite';
    amount: number;
    currency: string;
    interval: 'day' | 'week' | 'month' | 'year';
    intervalCount: number;
    features: string[];
}

export type plan_Type = 'basic' | 'premium' | 'elite'

export interface ISubscription  {
 userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  stripeProductId: string;
  
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid';
  
  planName: string;
  planType: plan_Type;
  billingInterval: 'month' | 'year';
  amount: number;
  currency: string;
  
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  endedAt?: Date;
  
  trialStart?: Date;
  trialEnd?: Date;
  
  metadata?: Record<string, any>;
  
  createdAt: Date;
  updatedAt: Date;
}