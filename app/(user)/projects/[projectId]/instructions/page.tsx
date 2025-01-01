"use client";

import { useSearchParams } from "next/navigation";
import CopyBtn from "@/components/copyBtn";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId");

    const widgetUrl = process.env.NEXT_PUBLIC_WIDGET_URL;

    if (!projectId) {
        return <div className="text-red-500">Invalid Project ID</div>;
    }

    if (!widgetUrl) {
        return <div className="text-red-500">Missing Widget URL</div>;
    }

    return (
        <div>
            <div>
                <Link href="/" className="flex items-center text-primary mb-5 w-fit">
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    <span className="text-lg">Back to projects</span>
                </Link>
            </div>
            <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
            <p className="text-lg text-secondary-foreground">Embed the following code in your site</p>

            <div className="bg-muted-foreground p-6 rounded-md mt-6 relative">
                <code className="text-white">
                    {`<my-widget project-id="${projectId}"></my-widget>`}
                    <br />
                    {`<script src="${widgetUrl}/widget.umd.js"></script>`}
                </code>
                <CopyBtn
                    text={`<my-widget project-id="${projectId}"></my-widget>\n<script src="${widgetUrl}/widget.umd.js"></script>`}
                />
            </div>
        </div>
    );
};

export default Page;
