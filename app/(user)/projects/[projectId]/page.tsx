import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import Link from "next/link";
import { ChevronLeft, Code, Globe } from "lucide-react";
import Table from "@/components/table";

type Params = Promise<{ projectId: string; }>;

const Page = async ({ params }: { params: Params; }) => {
    const { projectId } = await params;

    if (!projectId) {
        return <div>Invalid Project ID</div>;
    }

    const userProjects = await db.query.projects.findMany({
        where: eq(projects.id, parseInt(projectId)),
        with: {
            feedbacks: true,
        },
    });

    const project = userProjects[0];

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="min-w-0">
            <div>
                <Link href="/dashboard" className="flex items-center text-primary mb-5 w-fit">
                    <ChevronLeft className="h-5 w-5 mr-1 shrink-0" />
                    <span className="text-base sm:text-lg">Back to projects</span>
                </Link>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                <div className="proj-info min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-3 break-words">{project.name}</h1>
                    <h2 className="text-primary-background text-lg sm:text-xl mb-2 break-words">{project.description}</h2>
                </div>
                <div className="flex flex-col shrink-0">
                    {project.url ? (
                        <Link
                            href={project.url.startsWith("http") ? project.url : `http://${project.url}`}
                            className="underline text-primary flex items-center"
                        >
                            <Globe className="h-5 w-5 mr-1 shrink-0" />
                            <span className="text-base sm:text-lg">Visit site</span>
                        </Link>
                    ) : null}
                    <Link href={`/projects/${projectId}/instructions`} className="underline text-primary flex items-center mt-2">
                        <Code className="h-5 w-5 mr-1 shrink-0" />
                        <span className="text-base sm:text-lg">Embed Code</span>
                    </Link>
                </div>
            </div>
            <div className="mt-4 min-w-0 overflow-hidden">
                <Table data={project.feedbacks} />
            </div>
        </div>
    );
};

export default Page;
