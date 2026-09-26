import NewProjectBtn from "@/components/newProjectBtn";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import ProjectsList from "./projects-list";
import { getSubscription } from "@/actions/userSubscriptions";
import { maxFreeProjects } from "@/lib/constants";

function dbErrorMessage(error: unknown) {
    if (!(error instanceof Error)) return "Unknown database error";
    const msg = error.message || "";
    if (/DATABASE_URL is not set/i.test(msg)) {
        return "DATABASE_URL is missing in Vercel environment variables.";
    }
    if (/CONNECT_TIMEOUT|ECONNREFUSED|ENOTFOUND|getaddrinfo/i.test(msg)) {
        return "Could not reach the database host. Check DATABASE_URL (use the Transaction pooler URI on port 6543).";
    }
    if (/password authentication failed|EAUTH|28P01/i.test(msg)) {
        return "Database password authentication failed. URL-encode special characters in the password (e.g. ! → %21, @ → %40).";
    }
    if (/does not exist|42P01/i.test(msg)) {
        return "Database tables are missing. Run the SQL in supabase-schema.sql in the Supabase SQL Editor.";
    }
    if (/Connection|SSL|tls/i.test(msg)) {
        return "Database connection failed. Verify DATABASE_URL and that the Supabase project is Active/Healthy.";
    }
    return `Database error: ${msg.slice(0, 180)}`;
}

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    let userProjects;
    let subscribed: boolean | null | undefined;

    try {
        userProjects = await db
            .select()
            .from(projects)
            .where(eq(projects.userId, userId));
        subscribed = await getSubscription({ userId });
    } catch (error) {
        console.error("[dashboard] database error:", error);
        return (
            <div className="mx-auto max-w-lg rounded-md border border-destructive/40 bg-destructive/5 p-6 text-center">
                <h1 className="mb-2 text-xl font-bold">Could not load projects</h1>
                <p className="text-muted-foreground text-sm">{dbErrorMessage(error)}</p>
            </div>
        );
    }

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
