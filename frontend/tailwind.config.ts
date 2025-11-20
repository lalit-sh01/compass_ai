import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Map CSS variables to Tailwind classes
                'bg-primary': 'var(--color-bg-primary)',
                'bg-secondary': 'var(--color-bg-secondary)',
                'surface': 'var(--color-surface)',
                'primary': {
                    DEFAULT: 'var(--color-accent-primary)',
                    hover: 'var(--color-accent-hover)',
                    light: 'var(--color-accent-light)',
                },
                'on-primary': 'var(--color-text-on-primary)',
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-tertiary': 'var(--color-text-tertiary)',
                'border': 'var(--color-border)',
            },
            fontFamily: {
                primary: 'var(--font-primary)',
                secondary: 'var(--font-secondary)',
            },
        },
    },
    plugins: [],
};

export default config;
