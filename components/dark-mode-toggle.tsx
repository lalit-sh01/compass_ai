"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function DarkModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-surface hover:bg-bg-secondary transition-colors shadow-sm"
            aria-label="Toggle dark mode"
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4 text-text-secondary" />
            ) : (
                <Moon className="h-4 w-4 text-text-secondary" />
            )}
        </button>
    )
}
