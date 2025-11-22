'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '@/lib/types';

interface ProgressBreadcrumbProps {
  phases: Phase[];
  expandedPhases: number[];
}

export default function ProgressBreadcrumb({
  phases,
  expandedPhases,
}: ProgressBreadcrumbProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-40"
    >
      {/* Breadcrumb Container */}
      <div className="glass-effect-dark p-4 rounded-lg backdrop-blur-xl border border-white/10">
        {/* Title */}
        <div className="text-xs font-bold text-text-secondary font-primary mb-4 px-2">
          PROGRESS
        </div>

        {/* Phase Indicators */}
        <div className="flex flex-col gap-3">
          {phases.map((phase) => {
            const isExpanded = expandedPhases.includes(phase.phaseNumber);
            const phaseIndex = phase.phaseNumber - 1;
            const totalPhases = phases.length;
            const estimatedScroll = (phaseIndex / totalPhases) * 100;
            const isActive = scrollProgress >= estimatedScroll - 5 && scrollProgress <= estimatedScroll + 10;

            return (
              <motion.button
                key={phase.phaseNumber}
                onClick={() => {
                  const element = document.querySelector(
                    `[data-phase="${phase.phaseNumber}"]`
                  );
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="group relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : isExpanded
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="breadcrumb-bg"
                  />

                  {/* Content */}
                  <div className="relative">
                    <div className="text-xs font-bold font-primary">P{phase.phaseNumber}</div>
                    <div className="text-xs text-center truncate max-w-[80px]">
                      {phase.title.split(':')[0].split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>

                  {/* Expanded Indicator */}
                  {isExpanded && (
                    <motion.div
                      layoutId="expanded-indicator"
                      className="absolute -right-2 -top-1 w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </div>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: -40 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-surface border border-border rounded-lg text-xs text-text-primary font-secondary whitespace-nowrap pointer-events-none"
                >
                  {phase.title}
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Scroll Progress */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-xs text-text-tertiary font-secondary text-center mb-2">
            {Math.round(scrollProgress)}%
          </div>
          <div className="w-8 h-24 bg-white/5 rounded border border-white/10 overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary to-primary/50"
              style={{ height: `${scrollProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
