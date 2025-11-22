'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TimelineWeek from './TimelineWeek';
import ProgressBar from '@/components/ui/ProgressBar';
import { getPhaseProgress } from '@/lib/roadmap-utils';
import type { Phase } from '@/lib/types';

interface TimelinePhaseProps {
  phase: Phase;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

export default function TimelinePhase({
  phase,
  isExpanded,
  onToggle,
  index,
}: TimelinePhaseProps) {
  const progress = getPhaseProgress(phase);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8"
      data-phase={phase.phaseNumber}
    >
      {/* Phase Header Card */}
      <motion.button
        onClick={onToggle}
        className="w-full text-left group relative"
        whileHover={{ x: 8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6 sm:p-8 bg-surface rounded-lg border border-border hover:border-primary transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Phase Badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full font-primary">
                  Phase {phase.phaseNumber}
                </span>
                <span className="text-xs text-text-secondary font-secondary">
                  {phase.weekRange}
                </span>
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold font-primary text-text-primary mb-3 leading-tight">
                {phase.title}
              </h3>

              {/* Summary */}
              <p className="text-base text-text-secondary font-secondary mb-6 leading-relaxed max-w-2xl">
                {phase.summary}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary font-secondary">
                    Progress
                  </span>
                  <span className="text-sm text-text-secondary font-secondary">
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

              {/* Week Count */}
              <span className="text-sm text-text-tertiary font-secondary">
                {phase.weeks.length} weeks
              </span>
            </div>

            {/* Chevron */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 mt-2"
            >
              <ChevronDown className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Expanded Weeks Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden mt-4"
          >
            {/* Glassmorphic Container */}
            <div className="glass-effect-dark rounded-lg p-6 sm:p-8 backdrop-blur-xl">
              {/* Weeks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {phase.weeks.map((week, weekIdx) => (
                  <TimelineWeek
                    key={week.weekNumber}
                    week={week}
                    phaseNumber={phase.phaseNumber}
                    index={weekIdx}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 mt-8 mb-6" />

              {/* Phase Description Footer */}
              <div className="text-sm text-text-secondary font-secondary">
                <p>
                  Complete the activities in each week to progress through this phase.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
