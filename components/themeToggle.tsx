"use client";

import { useTheme } from "@/app/providers/theme-provider";


export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-4 left-4 z-40 p-2 rounded-full shadow-lg bg-card text-card-foreground hover:bg-muted hover:text-muted-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
            aria-label="Toggle Theme"
        >
            {theme === "light" ? "🌙" : "🌞"}
        </button>
    );
}
