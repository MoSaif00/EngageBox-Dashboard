import NewProjectBtn from "@/components/newProjectBtn";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import ProjectsList from "./projects-list";
import { getSubscription } from "@/actions/userSubscriptions";
import { maxFreeProjects } from "@/lib/constants";

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const userProjects = await db.select().from(projects).where(eq(projects.userId, userId));

    const subscribed = await getSubscription({ userId });
    const canCreate =
        subscribed === true || userProjects.length < maxFreeProjects;

    return (
        <div>
            <div className="my-6 flex flex-col gap-4 sm:my-8 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-xl font-bold text-center sm:text-left">
                    Your Projects
                </h1>
                {canCreate ? (
                    <div className="flex justify-center sm:justify-end">
                        <NewProjectBtn />
                    </div>
                ) : null}
            </div>
            <ProjectsList projects={userProjects} subscribed={subscribed} />
        </div>
    );
}
