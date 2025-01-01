import Link from 'next/link';
import {
    SignInButton,
    SignUpButton,
    SignedIn, SignedOut, UserButton
} from '@clerk/nextjs';
import { Button } from './ui/button';
import HeaderMenu from './headerMenu';

const PageHeader = () => {
    return (
        <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white/20 backdrop-blur-md">
            <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b">
                <div className="flex h-14 items-center justify-between">
                    <Link href="/">
                        <h1 className="text-3xl font-bold cursor-pointer">
                            Engage<span className="text-primary">Box</span>
                        </h1>
                    </Link>
                    <div>
                        <SignedOut>
                            <SignInButton >
                                <Button variant={'secondary'}>Sign In</Button>
                            </SignInButton>
                            <SignUpButton >
                                <Button className='ml-2 '>Sign Up</Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center">
                                <HeaderMenu />
                                <UserButton />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default PageHeader;