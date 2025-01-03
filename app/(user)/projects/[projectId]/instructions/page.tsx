import CopyBtn from "@/components/copyBtn";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ projectId: string; }>;

const Page = async ({ params }: { params: Params; }) => {
    const { projectId } = await params;

    if (!projectId) {
        return (<div>Invalid Project ID</div>);
    }
    if (!process.env.WIDGET_URL) return (<div>Missing Widget URL</div>);

    return (
        <div>
            <div>
                <Link href={`/projects/${projectId}`} className="flex items-center text-primary mb-5 w-fit">
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    <span className="text-lg">Back to project</span>
                </Link>
            </div>
            <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
            <p className="text-lg text-secondary-foreground">Embed the following code in your site</p>

            <div className="bg-muted-foreground p-6 rounded-md mt-6 relative">
                <code className="text-white">
                    {`<my-widget project-id="${projectId}"></my-widget>`}
                    <br />
                    {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
                </code>
                <CopyBtn text={`<my-widget project-id="${projectId}"></my-widget>\n<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`} />
            </div>
        </div>
    );
};

export default Page;