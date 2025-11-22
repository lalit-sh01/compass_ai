'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Home, Upload, List } from 'lucide-react';
import { useRoadmap } from '@/context/RoadmapContext';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { ThemeColorSwitcher } from '@/components/theme-color-switcher';
import { UserMenu } from '@/components/user-menu';

export default function Header() {
  const pathname = usePathname();
  const { roadmap, clearRoadmap } = useRoadmap();

  const isActive = (path: string) => pathname === path;

  // Hide global header on landing page as it has its own custom nav
  if (pathname === '/') {
    return null;
  }

  return (
    <header className="border-b border-border bg-surface/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-[var(--container-max-width)] mx-auto px-[var(--space-6)]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[var(--space-3)] font-bold text-xl text-text-primary hover:text-primary transition-colors font-primary">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm glow-accent">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-on-primary" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </div>
            <span className="tracking-tight">Compass.ai</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-[var(--space-4)]">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${isActive('/')
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {roadmap && (
              <>
                <Link
                  href="/viewer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${isActive('/viewer')
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                    }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </Link>

                <button
                  onClick={clearRoadmap}
                  className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-medium text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">New</span>
                </button>
              </>
            )}
            <div className="ml-2 pl-2 border-l border-border flex items-center gap-2">
              <ThemeColorSwitcher />
              <DarkModeToggle />
              <UserMenu />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
