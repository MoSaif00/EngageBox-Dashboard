import { MonthlyPlan, YearlyPlan } from "@/lib/constants";
import SubscribeBtn from "../subscribeBtn";

const page = ({ searchParams }: {
    searchParams: {
        plan: string;
    };
}) => {
    const { plan } = searchParams;

    const planId = plan === "monthly" ? MonthlyPlan : YearlyPlan;

    return (
        <div className="flex border p-4 rounded-md flex-col">
            <h1 className="text-2xl font-bold">Start your subscription now:</h1>
            <div className="w-fit mt-3">
                <SubscribeBtn price={planId} />
            </div>
        </div>
    );
};

export default page;