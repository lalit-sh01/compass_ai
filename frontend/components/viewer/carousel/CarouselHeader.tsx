'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import type { Roadmap } from '@/lib/types';

interface CarouselHeaderProps {
  roadmap: Roadmap;
  focusModeEnabled: boolean;
  onToggleFocusMode: () => void;
}

export default function CarouselHeader({
  roadmap,
  focusModeEnabled,
  onToggleFocusMode,
}: CarouselHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border bg-surface sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Title & Goal */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold font-primary text-text-primary mb-2">
              {roadmap.title}
            </h1>
            <p className="text-base sm:text-lg text-text-secondary font-secondary">
              {roadmap.goal}
            </p>
          </div>

          {/* Right: Focus Mode Toggle */}
          <motion.button
            onClick={onToggleFocusMode}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 flex-shrink-0 ${
              focusModeEnabled
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-bg-secondary border-border text-text-secondary hover:border-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: focusModeEnabled ? 0 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {focusModeEnabled ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </motion.div>
            <span className="text-sm font-semibold font-primary whitespace-nowrap">
              {focusModeEnabled ? 'Focus: ON' : 'Focus: OFF'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
