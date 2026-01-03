import { createPaymentIntent } from "@/api/services/paymentService";
import { plansList } from "@/api/services/subscriptionService";
import PlanCard from "@/components/plans/PlanCard";
import type { ISubscriptionPlan } from "@/types/subscription.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/App";
import StripeForm from "./StripeForm";

export default function PaymentPage() {
  const [plan, setPlan] = useState<ISubscriptionPlan>();
  const [clientSecret, setClientSecret] = useState("");
  const { priceId } = useParams();
  useEffect(() => {
    (async () => {
      const res = await plansList();
      if (res.success) {
        setPlan(res.data.find((p) => p.id === priceId));
      }
    })();
  }, [priceId]);

  useEffect(() => {
    if (!plan) return;

    (async () => {
      const clientSecret = await createPaymentIntent(plan.amount);
      setClientSecret(clientSecret.data.clientSecret);
    })();
  }, [plan]);


  return (
    <div className="h-screen flex flex-col items-center justify-center md:mx-20 mx-5">
      <div className="grid grid-cols-2 gap-5 w-full">
        <div>{plan && <PlanCard plan={plan} />}</div>
        <div>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                amount: 2000,
                mode:"subscription",
                currency:"usd",
                paymentMethodCreation:"manual",
              }}
            >
             {priceId && <StripeForm priceId={priceId} />}
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
