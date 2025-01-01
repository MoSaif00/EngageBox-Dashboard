import { MonthlyPlan, YearlyPlan } from "@/lib/constants";
import SubscribeBtn from "../subscribeBtn";

type SearchParams = Promise<{
    plan: string;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams; }) => {
    const params = await searchParams;
    const { plan } = params;

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

export default Page;