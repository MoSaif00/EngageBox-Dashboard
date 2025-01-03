"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { Loader2 } from "lucide-react";

type Props = {
    price?: string;
    subscribed?: boolean | null;
};

const SubscribeBtn = ({ price, subscribed }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async (price: string) => {
        setLoading(true);
        try {
            const { sessionId } = await fetch("/api/stripe/checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ price }),
            }
            ).then((res) => res.json());

            const stripe = await getStripe();
            if (stripe) {
                stripe.redirectToCheckout({ sessionId });
            }
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Button onClick={() => price && handleCheckout(price)} className={subscribed ? "bg-muted-foreground" : "bg-primary"} disabled={loading}>{loading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</> : "Subscribe"}</Button>
    );
};

export default SubscribeBtn;