'use client';

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

const SubmitBtn = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit">
            {pending ? <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating...
            </>
                : 'Create Project'}
        </Button>
    );
};


export default SubmitBtn;