import { MonthlyPlan, YearlyPlan } from "@/lib/constants";
import SubscribeBtn from "../subscribeBtn";

export const runtime = 'edge'; // Optional: Add if you want edge runtime
export const dynamic = 'force-dynamic'; // Optional: Add if you need dynamic data

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined; };
}) => {
    const plan = searchParams.plan as string | undefined;
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