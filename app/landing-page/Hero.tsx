"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);

    const observer = new MutationObserver(() => {
      const darkMode = document.documentElement.classList.contains("dark");
      setIsDarkMode(darkMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="grow">
      <div className="container mx-auto px-4 mb-16 sm:mb-24 mt-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        <div className="flex flex-col max-w-sm justify-center text-center md:text-left">
          <div className="mb-8">
            <h1 className="mb-5 text-4xl sm:text-5xl font-extrabold leading-tight">
              Gather Feedback Effortlessly
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Integrate EngageBox into your website with ease and start gaining
              valuable insights from your users in no time.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            {isLoaded &&
              (isSignedIn ? (
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <div className="flex gap-3">
                    <Button>
                      <LogIn className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                </SignUpButton>
              ))}
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg">
          <Image
            src={isDarkMode ? "/demoDark.gif" : "/demo.gif"}
            alt="demo"
            width={155}
            height={155}
            unoptimized={true}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
