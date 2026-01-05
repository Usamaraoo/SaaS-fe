import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ISubscriptionPlan } from "@/types/subscription.type";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { changeSubscriptionPlan } from "@/api/services/subscriptionService";
import { toast } from "sonner";
import { getProfile } from "@/api/services/userService";
export default function PlanCard({ plan }: { plan: ISubscriptionPlan }) {
  const { user, persistUser } = useAuth();
  const navigate = useNavigate();
  const updatePlan = async () => {
    try {
      const res = await changeSubscriptionPlan(plan.id);
      console.log('res',res)
      if (res.success) {
        toast.success("plan updated successfully");
        // update user
        const res = await getProfile();
        persistUser({ ...res.data, token: user?.token! });
        navigate("/");
        console.log(res.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <Card
        key={plan.id}
        className={cn(
          user?.subscriptionPlanId === plan.id && "border border-green-400",
          "flex flex-col transition-shadow hover:shadow-lg"
        )}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
          {plan.description && (
            <CardDescription>{plan.description}</CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex-1">
          <div className="mb-4 text-3xl font-bold">
            ${(plan.amount / 100).toFixed(2)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              /{plan.interval}
            </span>
          </div>

          {plan.features.length > 0 && (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        <CardFooter>
          {user?.subscriptionPlanId !== plan.id && user?.subscriptionPlanId ? (
            <Button onClick={updatePlan} className="w-full">
              {"Change Plan"}
            </Button>
          ) : (
            <Link className="w-full rounded-md bg-foreground text-background text-center p-2 font-medium " to={`/payment/${plan.id}`}>Select Plan</Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
