import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import Link from "next/link";
import { ChevronLeft, Code, Globe } from "lucide-react";
import Table from "@/components/table";

type PageProps = {
    params: {
        projectId: string;
    };
};

const page = async ({ params }: PageProps) => {
    const { projectId } = params; // No need for `await` here

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
        <div>
            <div>
                <Link href="/dashboard" className="flex items-center text-primary mb-5 w-fit">
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    <span className="text-lg">Back to projects</span>
                </Link>
            </div>
            <div className="flex justify-between items-start">
                <div className="proj-info">
                    <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
                    <h2 className="text-primary-background text-xl mb-2">{project.description}</h2>
                </div>
                <div className="flex flex-col">
                    {project.url ? (
                        <Link
                            href={project.url.startsWith("http") ? project.url : `http://${project.url}`}
                            className="underline text-primary flex items-center"
                        >
                            <Globe className="h-5 w-5 mr-1" />
                            <span className="text-lg">Visit site</span>
                        </Link>
                    ) : null}
                    <Link href={`/projects/${projectId}/instructions`} className="underline text-primary flex items-center mt-2">
                        <Code className="h-5 w-5 mr-1" />
                        <span className="text-lg">Embed Code</span>
                    </Link>
                </div>
            </div>
            <div>
                <Table data={project.feedbacks} />
            </div>
        </div>
    );
};

export default page;
