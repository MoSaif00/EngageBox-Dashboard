import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { InferSelectModel } from "drizzle-orm";
import { projects } from "@/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";
import SubscribeBtn from "../payments/subscribeBtn";
import { maxFreeProjects, MonthlyPlan } from "@/lib/constants";


type Project = InferSelectModel<typeof projects>;

type Props = {
    projects: Project[];
    subscribed: boolean | null | undefined;

};

const ProjectsList = (props: Props) => {
    return (
        <div>
            <ul className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4">
                {props.projects.map((project: Project) => (
                    <li key={project.id}>
                        <Card className="max-w-[350px] flex flex-col h-full">
                            <CardHeader className="flex-1">
                                <CardTitle>{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link href={`/projects/${project.id}`}>
                                    <Button className={!props.subscribed ? "bg-muted-foreground" : ""}>View Project</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </li>
                ))}
                {props.subscribed !== true && props.projects?.length >= maxFreeProjects ?
                    <Card className="max-w-[350px] flex flex-col h-full bg-muted">
                        <CardHeader className="flex-1">
                            <CardTitle className="flex flex-row text-sm md:text-lg items-center">
                                <Lock className="h-4 w-4 md:h-8 md:w-8 mr-2" />
                                <span>Upgrade to Premium</span></CardTitle>
                            <CardDescription className="mt-3">Unlock unlimited projects</CardDescription>
                        </CardHeader>
                        <div className="w-fit mx-auto mb-4">
                            <SubscribeBtn subscribed={props.subscribed} price={MonthlyPlan} />
                        </div>
                    </Card> : null}
            </ul>
        </div>
    );
};

export default ProjectsList;