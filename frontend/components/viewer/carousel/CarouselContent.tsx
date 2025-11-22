'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Hammer, BookOpen, Share2 } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { getPhaseProgress, getWeekProgress } from '@/lib/roadmap-utils';
import type { Phase, Week } from '@/lib/types';

interface CarouselContentProps {
  phase: Phase;
  week: Week;
  focusMode: boolean;
  phaseIndex: number;
  weekIndex: number;
  totalPhases: number;
  totalWeeks: number;
  globalWeekIndex: number;
}

export default function CarouselContent({
  phase,
  week,
  focusMode,
  phaseIndex,
  weekIndex,
  totalPhases,
  totalWeeks,
  globalWeekIndex,
}: CarouselContentProps) {
  if (focusMode) {
    return <FocusModeCard week={week} phase={phase} weekIndex={weekIndex} totalWeeks={totalWeeks} globalWeekIndex={globalWeekIndex} />;
  }

  return <OverviewModeCard phase={phase} phaseIndex={phaseIndex} totalPhases={totalPhases} />;
}

/* Overview Mode: Show Phase with Weeks Grid */
function OverviewModeCard({
  phase,
  phaseIndex,
  totalPhases,
}: {
  phase: Phase;
  phaseIndex: number;
  totalPhases: number;
}) {
  const progress = getPhaseProgress(phase);

  return (
    <motion.div
      className="p-8 sm:p-12 bg-surface rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ y: -4 }}
    >
      {/* Phase Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 mb-4"
      >
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full font-primary">
          Phase {phase.phaseNumber}
        </span>
        <span className="text-sm text-text-secondary font-secondary">
          {phase.weekRange}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-3xl sm:text-4xl font-bold font-primary text-text-primary mb-3 leading-tight"
      >
        {phase.title}
      </motion.h2>

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-base text-text-secondary font-secondary mb-6 max-w-2xl"
      >
        {phase.summary}
      </motion.p>

      {/* Metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-4 mb-8 flex-wrap text-sm"
      >
        <span className="text-text-secondary font-secondary">
          <span className="font-bold text-text-primary">{phase.weeks.length}</span> weeks
        </span>
        <span className="text-border">•</span>
        <span className="text-text-secondary font-secondary">
          <span className="font-bold text-text-primary">{phase.weeks.reduce((sum, w) => sum + w.totalHours, 0)}</span> hours total
        </span>
        <span className="text-border">•</span>
        <span className="text-text-secondary font-secondary">
          <span className="font-bold text-text-primary">{phase.weeks.length}</span> learning weeks
        </span>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary font-secondary">Progress</span>
          <span className="text-sm text-text-secondary font-secondary">
            {progress.completed} of {progress.total}
          </span>
        </div>
        <ProgressBar
          completed={progress.completed}
          total={progress.total}
          percentage={progress.percentage}
          size="lg"
        />
      </motion.div>

      {/* Weeks Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-8"
      >
        <h3 className="text-sm font-bold text-text-primary font-primary mb-4">WEEKS IN THIS PHASE</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {phase.weeks.map((w, idx) => (
            <Link
              key={w.weekNumber}
              href={`/viewer/week/${w.weekNumber}`}
              className="group p-4 bg-bg-secondary rounded-lg border border-border hover:border-primary transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-primary font-primary">Week {w.weekNumber}</span>
                <span className="text-xs text-text-tertiary font-secondary">{w.totalHours}h</span>
              </div>
              <p className="text-xs text-text-secondary font-secondary line-clamp-2 group-hover:text-text-primary transition-colors">
                {w.title}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href={`/viewer/phase/${phase.phaseNumber}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold font-primary hover:bg-primary-hover transition-colors"
        >
          View Full Phase
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* Focus Mode: Show Week Details */
function FocusModeCard({
  week,
  phase,
  weekIndex,
  totalWeeks,
  globalWeekIndex,
}: {
  week: Week;
  phase: Phase;
  weekIndex: number;
  totalWeeks: number;
  globalWeekIndex: number;
}) {
  const progress = getWeekProgress(week);

  return (
    <motion.div
      className="p-8 sm:p-12 bg-surface rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ y: -4 }}
    >
      {/* Week Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 mb-4"
      >
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full font-primary">
          Week {week.weekNumber}
        </span>
        <span className="text-sm text-text-secondary font-secondary">
          {week.status}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-3xl sm:text-4xl font-bold font-primary text-text-primary mb-2 leading-tight"
      >
        {week.title}
      </motion.h2>

      {/* Theme */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-base text-text-secondary font-secondary italic mb-6"
      >
        {week.theme}
      </motion.p>

      {/* Phase Context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-6 p-4 bg-bg-secondary rounded-lg border border-border"
      >
        <div className="text-xs font-semibold text-text-secondary font-primary mb-1">CONTEXT</div>
        <div className="text-sm text-text-primary font-secondary">{phase.title}</div>
      </motion.div>

      {/* Metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-3 sm:gap-4 mb-8"
      >
        <div className="p-4 bg-bg-secondary rounded-lg text-center">
          <div className="text-xs text-text-secondary font-secondary mb-1">Total Time</div>
          <div className="text-2xl font-bold text-text-primary font-primary">{week.totalHours}h</div>
        </div>
        <div className="p-4 bg-bg-secondary rounded-lg text-center">
          <div className="text-xs text-text-secondary font-secondary mb-1">Build</div>
          <div className="text-2xl font-bold text-orange-600 font-primary">{week.timeBreakdown.build}h</div>
        </div>
        <div className="p-4 bg-bg-secondary rounded-lg text-center">
          <div className="text-xs text-text-secondary font-secondary mb-1">Research</div>
          <div className="text-2xl font-bold text-blue-600 font-primary">{week.timeBreakdown.research}h</div>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary font-secondary">Week Progress</span>
          <span className="text-sm text-text-secondary font-secondary">
            {progress.completed} of {progress.total}
          </span>
        </div>
        <ProgressBar
          completed={progress.completed}
          total={progress.total}
          percentage={progress.percentage}
          size="lg"
        />
      </motion.div>

      {/* Project Title */}
      {week.buildSection?.projectTitle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-5 bg-primary/5 border border-primary/20 rounded-lg"
        >
          <div className="text-xs font-bold text-primary font-primary mb-2">PROJECT</div>
          <div className="text-lg font-bold text-text-primary font-primary">{week.buildSection.projectTitle}</div>
        </motion.div>
      )}

      {/* Section Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="space-y-4 mb-8"
      >
        {week.buildSection && (
          <div className="p-4 bg-bg-secondary rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Hammer className="w-4 h-4 text-orange-600" />
              <h4 className="font-semibold text-text-primary font-primary">Build Section</h4>
            </div>
            <p className="text-sm text-text-secondary font-secondary">{week.buildSection.hours}h</p>
          </div>
        )}

        {week.researchSection && (
          <div className="p-4 bg-bg-secondary rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-text-primary font-primary">Research Section</h4>
            </div>
            <p className="text-sm text-text-secondary font-secondary">{week.researchSection.hours}h</p>
          </div>
        )}

        {week.shareSection && (
          <div className="p-4 bg-bg-secondary rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4 text-green-600" />
              <h4 className="font-semibold text-text-primary font-primary">Share Section</h4>
            </div>
            <p className="text-sm text-text-secondary font-secondary">{week.shareSection.hours}h</p>
          </div>
        )}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href={`/viewer/week/${week.weekNumber}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold font-primary hover:bg-primary-hover transition-colors"
        >
          View Full Week Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
