export interface User {
    id: string;
    email: string;
    token: string
    stripeCustomerId?: string;
    name: string;
    // Subscription Info
    subscriptionId?: string;
    subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid';
    subscriptionPlanId?: string;
    subscriptionPlanName?: string;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    cancelAtPeriodEnd?: boolean;
    canceledAt?: Date;
    trialEnd?: Date;

    // Access Control
    membershipType?: 'basic' | 'premium' | 'elite';
    accessLevel?: number; // 1: Basic, 2: Premium, 3: Elite

    // Payment History
    defaultPaymentMethodId?: string;

    createdAt: Date;
    updatedAt: Date;
    // name: string;
    // avatar?: string;
    // role: 'admin' | 'user' | 'moderator';
}