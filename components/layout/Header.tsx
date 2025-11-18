'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Home, Upload, List } from 'lucide-react';
import { useRoadmap } from '@/context/RoadmapContext';

export default function Header() {
  const pathname = usePathname();
  const { roadmap, clearRoadmap } = useRoadmap();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Map className="w-6 h-6" />
            <span>Roadmap Viewer</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {roadmap && (
              <>
                <Link
                  href="/viewer"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/viewer')
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </Link>

                <button
                  onClick={clearRoadmap}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">New</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
