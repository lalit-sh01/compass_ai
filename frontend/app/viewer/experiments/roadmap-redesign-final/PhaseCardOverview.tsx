'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { getPhaseProgress } from '@/lib/roadmap-utils';
import type { Phase } from '@/lib/types';

interface PhaseCardOverviewProps {
  phase: Phase;
}

export default function PhaseCardOverview({ phase }: PhaseCardOverviewProps) {
  const progress = getPhaseProgress(phase);
  const totalHours = phase.weeks.reduce((sum, w) => sum + w.totalHours, 0);

  return (
    <motion.div
      className="group h-full p-8 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-lg transition-all cursor-pointer flex flex-col"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Phase Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full font-primary">
          <Zap className="w-3 h-3" />
          Phase {phase.phaseNumber}
        </span>
      </div>

      {/* Phase Title */}
      <h3 className="text-2xl font-bold font-primary text-text-primary mb-2 leading-tight">
        {phase.title}
      </h3>

      {/* Phase Summary */}
      <p className="text-sm text-text-secondary font-secondary mb-6 flex-grow line-clamp-3">
        {phase.summary}
      </p>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-border/50">
        {/* Weeks */}
        <div>
          <div className="text-xs text-text-tertiary font-secondary uppercase mb-1">
            Duration
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-text-primary font-primary">
              {phase.weeks.length}
            </span>
            <span className="text-xs text-text-tertiary font-secondary">weeks</span>
          </div>
        </div>

        {/* Hours */}
        <div>
          <div className="text-xs text-text-tertiary font-secondary uppercase mb-1">
            Total Hours
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-text-primary font-primary">
              {totalHours}
            </span>
            <span className="text-xs text-text-tertiary font-secondary">h</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-text-primary font-secondary">
            Progress
          </span>
          <span className="text-xs text-text-secondary font-secondary">
            {progress.completed} of {progress.total}
          </span>
        </div>
        <ProgressBar
          completed={progress.completed}
          total={progress.total}
          percentage={progress.percentage}
          size="md"
        />
      </div>

      {/* CTA Button */}
      <motion.div
        className="flex items-center justify-between px-4 py-3 bg-primary/5 rounded-lg border border-primary/20 group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <span className="font-semibold text-sm font-primary text-primary group-hover:text-on-primary transition-colors">
          Enter Phase
        </span>
        <motion.div
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
          className="text-primary group-hover:text-on-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
