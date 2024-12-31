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

    return (
        <div>
            <div className="flex items-center justify-center relative my-8">
                <h1 className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
                    Your Projects
                </h1>
                {subscribed !== true && userProjects.length > maxFreeProjects
                    ? null
                    : (<div className="absolute right-0">
                        <NewProjectBtn />
                    </div>)
                }
            </div>
            <ProjectsList projects={userProjects} subscribed={subscribed} />
        </div>
    );
}
