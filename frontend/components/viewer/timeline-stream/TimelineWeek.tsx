'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Hammer, BookOpen, Share2, ArrowRight } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { getWeekProgress } from '@/lib/roadmap-utils';
import type { Week } from '@/lib/types';

interface TimelineWeekProps {
  week: Week;
  phaseNumber: number;
  index: number;
}

const statusConfig = {
  COMPLETED: {
    badge: 'bg-green-500/10 text-green-700 dark:text-green-400',
    dot: 'bg-green-500',
  },
  IN_PROGRESS: {
    badge: 'bg-primary/10 text-primary',
    dot: 'bg-primary',
  },
  PLANNED: {
    badge: 'bg-bg-secondary text-text-secondary',
    dot: 'bg-text-secondary',
  },
};

export default function TimelineWeek({
  week,
  phaseNumber,
  index,
}: TimelineWeekProps) {
  const progress = getWeekProgress(week);
  const status = week.status as keyof typeof statusConfig;
  const config = statusConfig[status] || statusConfig.PLANNED;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group"
    >
      <Link href={`/viewer/week/${week.weekNumber}`}>
        <motion.div
          className="relative h-full p-5 sm:p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden"
          whileHover={{
            borderColor: 'rgba(212, 101, 79, 0.5)',
            boxShadow: '0 8px 32px rgba(212, 101, 79, 0.1)',
          }}
        >
          {/* Animated Background Gradient on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 pointer-events-none"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content Container */}
          <div className="relative z-10">
            {/* Week Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Status Dot */}
                <motion.div
                  className={`w-3 h-3 rounded-full ${config.dot}`}
                  animate={{
                    scale: status === 'IN_PROGRESS' ? [1, 1.3, 1] : 1,
                  }}
                  transition={{
                    repeat: status === 'IN_PROGRESS' ? Infinity : 0,
                    duration: 2,
                  }}
                />

                {/* Week Badge */}
                <span className="px-2.5 py-0.5 bg-primary/15 text-primary text-xs font-bold rounded-sm font-primary">
                  Week {week.weekNumber}
                </span>
              </div>

              {/* Status Badge */}
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-sm ${config.badge}`}>
                {week.status}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-base sm:text-lg font-bold text-text-primary font-primary mb-1 line-clamp-2">
              {week.title}
            </h4>

            {/* Theme */}
            <p className="text-xs sm:text-sm text-text-secondary font-secondary italic mb-4 line-clamp-1">
              {week.theme}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <ProgressBar
                completed={progress.completed}
                total={progress.total}
                percentage={progress.percentage}
                size="sm"
              />
            </div>

            {/* Time Breakdown */}
            <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Hammer className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div className="text-xs font-bold text-text-primary font-primary">
                  {week.timeBreakdown.build}h
                </div>
                <div className="text-xs text-text-tertiary font-secondary">Build</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="text-xs font-bold text-text-primary font-primary">
                  {week.timeBreakdown.research}h
                </div>
                <div className="text-xs text-text-tertiary font-secondary">Research</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Share2 className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div className="text-xs font-bold text-text-primary font-primary">
                  {week.timeBreakdown.share}h
                </div>
                <div className="text-xs text-text-tertiary font-secondary">Share</div>
              </div>
            </div>

            {/* Project Title */}
            {week.buildSection?.projectTitle && (
              <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
                <div className="text-xs font-bold text-primary font-primary mb-1">PROJECT</div>
                <div className="text-sm font-medium text-text-primary font-secondary line-clamp-2">
                  {week.buildSection.projectTitle}
                </div>
              </div>
            )}

            {/* Total Hours & Link */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-xs text-text-secondary font-secondary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {week.totalHours} hours
              </span>
              <motion.div
                className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all"
                whileHover={{ x: 2 }}
              >
                View <ArrowRight className="w-3 h-3" />
              </motion.div>
            </div>
          </div>

          {/* Corner Accent */}
          <motion.div
            className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.2 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
