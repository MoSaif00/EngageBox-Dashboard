import Loading from "./loading";
import { Suspense } from "react";

export default function UserLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="container w-full max-w-screen-xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-20 min-w-0">
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
    );
}