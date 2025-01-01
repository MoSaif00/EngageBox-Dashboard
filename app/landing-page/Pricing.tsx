import PricingCard from "./PricingCard";

export type PricingPlan = {
    title: string;
    price: number;
    description: string;
    isPopular: boolean;
    features: string[];
    url: string;
};

export const pricingPlans: PricingPlan[] = [
    {
        title: "Free",
        price: 0,
        description: "Perfect for new projects and small websites.",
        isPopular: false,
        url: "/dashboard",
        features: [
            "3 active projects",
            "Unlimited feedback collection",
            "2GB data storage",
            "Standard support",
        ],
    },
    {
        title: "Monthly",
        price: 6.99,
        description: "Ideal for growing teams and expanding feedback needs.",
        isPopular: true,
        url: "/payments/subscribe?plan=monthly",
        features: [
            "Unlimited projects",
            "Unlimited feedback responses",
            "5GB data storage",
            "Priority support",
        ],
    },
    {
        title: "Yearly",
        price: 39.99,
        description: "Get the best value with an annual plan.",
        isPopular: false,
        url: "/payments/subscribe?plan=yearly",
        features: [
            "Unlimited projects",
            "Unlimited feedback collection",
            "50GB data storage",
            "24/7 premium support",
        ],
    },
];


const Pricing = () => {
    return (
        <div className="text-center">
            <h1 className="capitalize text-3xl">Pricing</h1>
            <h2 className="font-extrabold text-3xl mb-8 pt-3">
                Flexible Pricing to Fit Your Needs
            </h2>
            <div className="mt-10 grid items-center grid-cols-1 gap-3 md:grid-cols-3 max-w-screen-xl">
                {
                    pricingPlans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))
                }
            </div>
        </div>
    );
};

export default Pricing;