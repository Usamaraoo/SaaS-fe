import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Calendar,
  Mail,
  Shield,
  Zap,
  Lock,
  CreditCard,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentSubscription } from "@/api/services/subscriptionService";
import type { ISubscription } from "@/types/subscription.type";

const formatDate = (date?: Date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusBadgeColor = (status?: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/10 text-green-700 border-green-200";
    case "trialing":
      return "bg-blue-500/10 text-blue-700 border-blue-200";
    case "canceled":
      return "bg-red-500/10 text-red-700 border-red-200";
    case "past_due":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    case "incomplete":
      return "bg-orange-500/10 text-orange-700 border-orange-200";
    case "incomplete_expired":
      return "bg-red-500/10 text-red-700 border-red-200";
    case "unpaid":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    default:
      return "bg-accent text-accent-foreground border-0";
  }
};

const getPlanTypeColor = (type?: string) => {
  switch (type) {
    case "elite":
      return "text-yellow-600";
    case "premium":
      return "text-blue-600";
    case "pro":
      return "text-purple-600";
    case "basic":
      return "text-gray-600";
    default:
      return "text-foreground";
  }
};

export default function MembershipPage() {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
    console.log('check',subscription?.currentPeriodStart)
  useEffect(() => {
    (async () => {
      try {
        const res = await getCurrentSubscription();
        if (res.success) {
          console.log(res.data);
          setSubscription(res.data);
        }
      } catch (error) {}
    })();
  }, []);
  return (
    <>
      {subscription && (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                Membership Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your subscription and account details
              </p>
            </div>

            {/* Status Overview */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {/* Subscription Status */}
              <Card className="border border-border bg-card shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {subscription.status && (
                    <Badge
                      className={`${getStatusBadgeColor(
                        subscription.status
                      )} border capitalize`}
                    >
                      {subscription.status}
                    </Badge>
                  )}
                  {subscription.planName && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {subscription.planName}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Plan Type */}
              <Card className="border border-border bg-card shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Plan Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {subscription.planType && (
                    <>
                      <p
                        className={`text-2xl font-bold capitalize ${getPlanTypeColor(
                          subscription.planType
                        )}`}
                      >
                        {subscription.planType}
                      </p>
                    </>
                  )}
                  {subscription.billingInterval && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Billed {subscription.billingInterval}ly
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Amount */}
              <Card className="border border-border bg-card shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {subscription.amount !== undefined && (
                    <>
                      <p className="text-2xl font-bold text-primary">
                        $
                        {subscription.amount/100}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        per {subscription.billingInterval || "month"}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="border border-border bg-card shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-accent" />
                  Stripe Information
                </CardTitle>
                <CardDescription>
                  Payment and billing identifiers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {subscription.stripeCustomerId && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Customer ID
                      </p>
                      <p className="text-sm text-foreground font-mono break-all">
                        {subscription.stripeCustomerId}
                      </p>
                    </div>
                  )}

                  {subscription.stripeSubscriptionId && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Subscription ID
                      </p>
                      <p className="text-sm text-foreground font-mono break-all">
                        {subscription.stripeSubscriptionId}
                      </p>
                    </div>
                  )}

                  {subscription.stripePriceId && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Price ID
                      </p>
                      <p className="text-sm text-foreground font-mono break-all">
                        {subscription.stripePriceId}
                      </p>
                    </div>
                  )}

                  {subscription.stripeProductId && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Product ID
                      </p>
                      <p className="text-sm text-foreground font-mono break-all">
                        {subscription.stripeProductId}
                      </p>
                    </div>
                  )}

                  {subscription.userId && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        User ID
                      </p>
                      <p className="text-sm text-foreground font-mono break-all">
                        {subscription.userId}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {(subscription.currentPeriodStart ||
              subscription.currentPeriodEnd) && (
              <Card className="border border-border bg-card shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    Billing Period
                  </CardTitle>
                  <CardDescription>
                    Your current subscription period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {subscription.currentPeriodStart && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Period Start
                          </p>
                          <p className="text-foreground font-semibold">
                            {formatDate(subscription.currentPeriodStart)}
                          </p>
                        </div>
                      )}
                      {subscription.currentPeriodEnd && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Period End
                          </p>
                          <p className="text-foreground font-semibold">
                            {formatDate(subscription.currentPeriodEnd)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {subscription.cancelAtPeriodEnd !== undefined && (
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                      <span className="text-foreground font-medium">
                        Auto-Renewal
                      </span>
                      <Badge
                        variant={
                          subscription.cancelAtPeriodEnd ? "outline" : "default"
                        }
                        className={
                          subscription.cancelAtPeriodEnd
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-green-500/10 text-green-700 border-green-200"
                        }
                      >
                        {subscription.cancelAtPeriodEnd
                          ? "Scheduled for Cancellation"
                          : "Active"}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {(subscription.trialStart || subscription.trialEnd) && (
              <Card className="border border-border bg-card shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    Trial Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {subscription.trialStart && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Trial Start
                        </p>
                        <p className="text-foreground font-semibold">
                          {formatDate(subscription.trialStart)}
                        </p>
                      </div>
                    )}
                    {subscription.trialEnd && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Trial End
                        </p>
                        <p className="text-foreground font-semibold">
                          {formatDate(subscription.trialEnd)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {(subscription.canceledAt || subscription.endedAt) && (
              <Card className="border border-border bg-card shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-destructive" />
                    Subscription Changes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {subscription.canceledAt && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Canceled At
                        </p>
                        <p className="text-foreground font-semibold">
                          {formatDate(subscription.canceledAt)}
                        </p>
                      </div>
                    )}
                    {subscription.endedAt && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Ended At
                        </p>
                        <p className="text-foreground font-semibold">
                          {formatDate(subscription.endedAt)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {subscription.metadata &&
              Object.keys(subscription.metadata).length > 0 && (
                <Card className="border border-border bg-card shadow-lg mb-8">
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subscription.metadata.features &&
                        Array.isArray(subscription.metadata.features) && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-3">
                              Features
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {subscription.metadata.features.map(
                                (feature, idx) => (
                                  <Badge key={idx} variant="secondary">
                                    {feature}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Account Timeline */}
            <Card className="border border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Account Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {subscription.createdAt && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Created
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {formatDate(subscription.createdAt)}
                      </p>
                    </div>
                  )}

                  {subscription.updatedAt && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Last Updated
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {formatDate(subscription.updatedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Support Footer */}
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>
                Need assistance? Contact our support team for help with your
                subscription.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
