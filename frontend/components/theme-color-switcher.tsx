'use client';

import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

type ThemeColor = 'orange' | 'blue' | 'green' | 'gray' | 'purple' | 'pink' | 'teal';

const THEME_COLORS = {
    orange: {
        '--color-accent-primary': '#D4654F',
        '--color-accent-hover': '#E08A78',
        '--color-accent-light': '#F5D5C8',
        '--color-accent-secondary': 'rgba(212, 101, 79, 0.15)',
        '--shadow-focus': '0 0 0 3px rgba(212, 101, 79, 0.2)',
        '--glow-accent': '0 0 20px rgba(212, 101, 79, 0.2)',
    },
    blue: {
        '--color-accent-primary': '#2563EB', // Blue 600
        '--color-accent-hover': '#3B82F6', // Blue 500
        '--color-accent-light': '#DBEAFE', // Blue 100
        '--color-accent-secondary': 'rgba(37, 99, 235, 0.15)',
        '--shadow-focus': '0 0 0 3px rgba(37, 99, 235, 0.2)',
        '--glow-accent': '0 0 20px rgba(37, 99, 235, 0.2)',
    },
    green: {
        '--color-accent-primary': '#059669', // Emerald 600
        '--color-accent-hover': '#10B981', // Emerald 500
        '--color-accent-light': '#D1FAE5', // Emerald 100
        '--color-accent-secondary': 'rgba(5, 150, 105, 0.15)',
        '--shadow-focus': '0 0 0 3px rgba(5, 150, 105, 0.2)',
        '--glow-accent': '0 0 20px rgba(5, 150, 105, 0.2)',
    },
    gray: {
        '--color-accent-primary': '#52525B', // Zinc 600
        '--color-accent-hover': '#71717A', // Zinc 500
        '--color-accent-light': '#E4E4E7', // Zinc 200
        '--color-accent-secondary': 'rgba(82, 82, 91, 0.15)',
        '--shadow-focus': '0 0 0 3px rgba(82, 82, 91, 0.2)',
        '--glow-accent': '0 0 20px rgba(82, 82, 91, 0.2)',
    },

    purple: {
        '--color-accent-primary': '#7C3AED', // Violet 600
        '--color-accent-hover': '#8B5CF6', // Violet 500
        '--color-accent-light': '#EDE9FE', // Violet 100
        '--color-accent-secondary': 'rgba(124, 58, 237, 0.15)',
        '--shadow-focus': '0 0 0 3px rgba(124, 58, 237, 0.2)',
        '--glow-accent': '0 0 20px rgba(124, 58, 237, 0.2)',
    },
    pink: {
        '--color-accent-primary': '#DB2777', // Pink 600
        '--color-accent-hover': '#EC4899', // Pink 500
        '--color-accent-light': '#FCE7F3', // Pink 100
        '--color-accent-secondary': 'rgba(219, 39, 119, 0.15)',
        '--shadow-focus': '0 0 0 3px rgba(219, 39, 119, 0.2)',
        '--glow-accent': '0 0 20px rgba(219, 39, 119, 0.2)',
    },

    teal: {
        '--color-accent-primary': '#0D9488', // Teal 600
        '--color-accent-hover': '#14B8A6', // Teal 500
        '--color-accent-light': '#CCFBF1', // Teal 100
        '--color-accent-secondary': 'rgba(13, 148, 136, 0.15)',
        '--shadow-focus': '0 0 0 3px rgba(13, 148, 136, 0.2)',
        '--glow-accent': '0 0 20px rgba(13, 148, 136, 0.2)',
    },

};

const THEME_DISPLAY_NAMES: Record<ThemeColor, string> = {
    orange: 'Warm Ember',
    blue: 'Oceanic Blue',
    green: 'Emerald Forest',
    gray: 'Slate Minimal',
    purple: 'Royal Violet',
    pink: 'Berry Rose',
    teal: 'Tropical Teal',
};

export function ThemeColorSwitcher() {
    const [selectedColor, setSelectedColor] = useState<ThemeColor>('orange');
    const [isOpen, setIsOpen] = useState(false);

    const changeColor = (color: ThemeColor) => {
        setSelectedColor(color);
        const variables = THEME_COLORS[color];
        const root = document.documentElement;

        Object.entries(variables).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-bg-secondary transition-colors text-text-secondary hover:text-text-primary"
                title="Change Theme Color"
            >
                <Palette className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 py-2 bg-surface rounded-lg shadow-lg border border-border z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                        Theme Color
                    </div>
                    {Object.keys(THEME_COLORS).map((color) => (
                        <button
                            key={color}
                            onClick={() => changeColor(color as ThemeColor)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-secondary transition-colors flex items-center gap-2 ${selectedColor === color ? 'text-primary font-medium' : 'text-text-primary'
                                }`}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: THEME_COLORS[color as ThemeColor]['--color-accent-primary'] }}
                            />
                            <span className="capitalize">{THEME_DISPLAY_NAMES[color as ThemeColor]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
