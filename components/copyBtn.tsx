'use client';

import { Clipboard } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const CopyBtn = ({ text }: { text: string; }) => {
    const { toast } = useToast();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: "Code is copied to Clipboard",
            });
        });
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => copyToClipboard(text)}
                        className="text-muted absolute right-0 top-0 p-2">
                        <Clipboard />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Copy Code</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>



    );
};

export default CopyBtn;