import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/pageHeader";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { ThemeToggle } from "@/components/themeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EngageBox",
  description: "Feedback collection app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider proxyUrl={process.env.NEXT_PUBLIC_CLERK_PROXY_URL}>
          <ThemeProvider>
            <PageHeader />
            {children}
            <Toaster />
            <ThemeToggle />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
