import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { createProject } from "@/actions/createProject";
import SubmitBtn from "./submitProjectBtn";

const NewProjectBtn = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-muted-foreground">
                    <Plus className="w-4 h-4" />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-md">
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to be able to manage feedbacks
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex gap-4 flex-col "
                    action={createProject}
                >
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name='name' placeholder="Project Name" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="url">URL</Label>
                            <Input id="url" name='url' placeholder="https://example.com" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" placeholder="Project Description (optional)" />
                    </div>


                    <SubmitBtn />
                </form>

            </DialogContent>
        </Dialog>

    );
};

export default NewProjectBtn;