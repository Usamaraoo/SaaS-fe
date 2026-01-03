import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createSubscription } from "@/api/services/subscriptionService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getProfile } from "@/api/services/userService";
import { useAuth } from "@/context/auth-context";

export default function StripeForm({ priceId }: { priceId: string }) {
  const { user, persistUser } = useAuth();

  const stripe = useStripe();
  const elements = useElements();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // 1. MUST call submit() first to validate the PaymentElement
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // 2. Now you can safely create the Payment Method
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          elements, // Pass the elements instance
        });
      console.log("paymentMethod", paymentMethod);
      if (pmError) {
        throw new Error(pmError.message);
      }

      // 3. Send paymentMethod.id to your backend
      console.log("Success! PM ID:", paymentMethod.id);
      const result = await createSubscription(priceId, paymentMethod.id);
      console.log("result", result);
      if (!result.success) {
        throw new Error(result.error);
      }

      // 4. Handle 3D Secure / Confirm the Payment if backend returns a secret
      if (result.data?.clientSecret) {
        const { error: confirmError } = await stripe.confirmPayment({
          clientSecret: result.data.clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/success`,
          },
        });

        if (confirmError) throw new Error(confirmError.message);
      }

      // update user
      const res = await getProfile();
      persistUser({ ...res.data, token: user?.token! });

      toast.success("Subscription successful!", {
        id: "sub-success",
      });
      router("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <PaymentElement />
      <Button className="w-full mt-3" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
