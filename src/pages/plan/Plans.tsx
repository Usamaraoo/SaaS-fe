import { plansList } from "@/api/services/subscriptionService";
import PlanCard from "@/components/plans/PlanCard";
import type { ISubscriptionPlan } from "@/types/subscription.type";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);

  useEffect(() => {
    (async () => {
      const res = await plansList();
      if (res.success) {
        setPlans([...res.data.filter((p) => p !== null)]);
      }
    })();
  }, []);
  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <Link to={`/payment/${plan.id}`} key={plan.id}>
          <PlanCard plan={plan} />
        </Link>
      ))}
    </div>
  );
}
