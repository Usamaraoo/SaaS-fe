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
export default function PlanCard({ plan }: { plan: ISubscriptionPlan }) {
  return (
    <Card
      key={plan.id}
      className="flex flex-col transition-shadow hover:shadow-lg"
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
        <Button className="w-full">Choose Plan</Button>
      </CardFooter>
    </Card>
  );
}
