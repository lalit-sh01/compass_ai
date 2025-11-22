'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { getPhaseProgress } from '@/lib/roadmap-utils';
import WeekRow from './WeekRow';
import type { Phase } from '@/lib/types';

interface AccordionPhaseProps {
  phase: Phase;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

export default function AccordionPhase({
  phase,
  isExpanded,
  onToggle,
  index,
}: AccordionPhaseProps) {
  const progress = getPhaseProgress(phase);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="border border-border rounded-lg overflow-hidden bg-surface hover:border-primary transition-colors"
    >
      {/* Phase Header - Always Visible */}
      <motion.button
        onClick={onToggle}
        className="w-full text-left p-6 hover:bg-bg-secondary transition-colors"
        whileHover={{ x: 4 }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: Phase Info */}
          <div className="flex-1 min-w-0">
            {/* Phase Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full font-primary">
                Phase {phase.phaseNumber}
              </span>
              <span className="text-xs text-text-tertiary font-secondary">{phase.weekRange}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold font-primary text-text-primary mb-2">
              {phase.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-text-secondary font-secondary mb-3 line-clamp-2">
              {phase.summary}
            </p>

            {/* Metadata Row */}
            <div className="flex items-center gap-4 text-xs text-text-tertiary font-secondary mb-3">
              <span>{phase.weeks.length} weeks</span>
              <span>•</span>
              <span>{phase.weeks.reduce((sum, w) => sum + w.totalHours, 0)} hours</span>
            </div>

            {/* Progress Bar */}
            <div className="max-w-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-text-primary font-secondary">Progress</span>
                <span className="text-xs text-text-secondary font-secondary">
                  {progress.completed}/{progress.total}
                </span>
              </div>
              <ProgressBar
                completed={progress.completed}
                total={progress.total}
                percentage={progress.percentage}
                size="sm"
              />
            </div>
          </div>

          {/* Right: Chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-6 h-6 text-text-secondary" />
          </motion.div>
        </div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-border bg-bg-secondary"
          >
            {/* Weeks List */}
            <div className="divide-y divide-border">
              {phase.weeks.map((week, idx) => (
                <WeekRow key={week.weekNumber} week={week} phaseNumber={phase.phaseNumber} index={idx} />
              ))}
            </div>

            {/* Phase Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-6 border-t border-border flex items-center justify-between"
            >
              <div className="text-xs text-text-secondary font-secondary">
                View full phase overview and resources
              </div>
              <Link
                href={`/viewer/phase/${phase.phaseNumber}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold font-primary text-sm hover:bg-primary-hover transition-colors"
              >
                View Phase
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
