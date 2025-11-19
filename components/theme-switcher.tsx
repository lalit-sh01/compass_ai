"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const themes = [
        { id: "serene", name: "Serene", color: "#2C7A7B" },
        { id: "warm", name: "Warm", color: "#D4654F" },
        { id: "twilight", name: "Twilight", color: "#7DD3FC" },
        { id: "dusk", name: "Dusk", color: "#FCD34D" },
    ]

    return (
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface p-1 shadow-sm">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`h-6 w-6 rounded-full transition-all ${theme === t.id ? "ring-2 ring-offset-2 ring-offset-surface" : "hover:scale-110"
                        }`}
                    style={{ backgroundColor: t.color, borderColor: t.color }}
                    title={t.name}
                    aria-label={`Switch to ${t.name} theme`}
                />
            ))}
        </div>
    )
}
