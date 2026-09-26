import Link from 'next/link';
import {
    SignInButton,
    SignUpButton,
    Show,
    UserButton,
} from '@clerk/nextjs';
import { Button } from './ui/button';
import HeaderMenu from './headerMenu';

const PageHeader = () => {
    return (
        <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white/20 backdrop-blur-md dark:bg-background/80">
            <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-20 relative mx-auto border-b">
                <div className="flex h-14 items-center justify-between gap-2">
                    <Link href="/" className="min-w-0 shrink">
                        <h1 className="text-xl sm:text-3xl font-bold cursor-pointer truncate">
                            Engage<span className="text-primary">Box</span>
                        </h1>
                    </Link>
                    <div className="flex items-center shrink-0">
                        <Show when="signed-out">
                            <SignInButton>
                                <Button variant={'secondary'} size="sm">
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button size="sm" className="ml-2">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </Show>
                        <Show when="signed-in">
                            <div className="flex items-center">
                                <HeaderMenu />
                                <UserButton />
                            </div>
                        </Show>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PageHeader;
