"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { PricingPlan } from "./Pricing";
import { Button } from "@/components/ui/button";

const PricingCard = ({ title, price, description, features, isPopular, url }: PricingPlan) => {
    const router = useRouter();

    const onClick = () => {
        router.push(url);
    };

    return (
        <div className="border flex flex-col justify-between bg-white/20 rounded-lg h-full p-6 hover:shadow-md text-left relative">
            {
                isPopular && (
                    <div className="absolute top-0 right-0 bg-primary text-secondary px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        Popular
                    </div>
                )
            }
            <div>
                <div className="inline-flex items-end">
                    <h1 className="font-extrabold text-3xl">${price}</h1>
                </div>
                <h2 className="font-bold text-xl my-2">
                    {title}
                </h2>
                <p>{description}</p>
                <div className="flex-grow border-t border-gray-400 opacity-25 my-3"></div>
                <ul>
                    {
                        features.map((feature, index) => (
                            <li key={index} className="flex flex-row items-center text-muted-foreground gap-2 my-2">
                                <div className="rounded-full flex items-center justify-center bg-gray-900 w-4 h-4 mr-2">
                                    <Check className="text-secondary" width={10} height={10} />
                                </div>
                                <p>{feature}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <Button onClick={onClick} className="py-2 mt-3 rounded-lg w-full" >
                    Select Plan
                </Button>
            </div>
        </div>
    );
};

export default PricingCard;