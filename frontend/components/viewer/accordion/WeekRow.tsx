'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Hammer, BookOpen, Share2, ChevronRight } from 'lucide-react';
import { getWeekProgress } from '@/lib/roadmap-utils';
import ProgressBar from '@/components/ui/ProgressBar';
import type { Week } from '@/lib/types';

interface WeekRowProps {
  week: Week;
  phaseNumber: number;
  index: number;
}

export default function WeekRow({ week, phaseNumber, index }: WeekRowProps) {
  const progress = getWeekProgress(week);

  const statusConfig = {
    COMPLETED: { badge: 'bg-green-500/10 text-green-700 dark:text-green-400', dot: 'bg-green-500' },
    IN_PROGRESS: { badge: 'bg-primary/10 text-primary', dot: 'bg-primary' },
    PLANNED: { badge: 'bg-bg-secondary text-text-secondary', dot: 'bg-text-secondary' },
  };

  const config = statusConfig[week.status as keyof typeof statusConfig] || statusConfig.PLANNED;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/viewer/week/${week.weekNumber}`}>
        <motion.div
          className="p-4 sm:p-6 hover:bg-surface transition-colors cursor-pointer"
          whileHover={{ x: 4 }}
        >
          <div className="flex items-start justify-between gap-4">
            {/* Left: Week Info */}
            <div className="flex-1 min-w-0">
              {/* Status Row */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {/* Status Dot */}
                <motion.div
                  className={`w-2.5 h-2.5 rounded-full ${config.dot}`}
                  animate={week.status === 'IN_PROGRESS' ? { scale: [1, 1.3, 1] } : {}}
                  transition={
                    week.status === 'IN_PROGRESS'
                      ? { repeat: Infinity, duration: 2 }
                      : {}
                  }
                />

                {/* Week Badge */}
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded font-primary">
                  Week {week.weekNumber}
                </span>

                {/* Status Badge */}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${config.badge}`}>
                  {week.status}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold font-primary text-text-primary mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                {week.title}
              </h4>

              {/* Theme */}
              <p className="text-xs sm:text-sm text-text-secondary font-secondary italic mb-3 line-clamp-1">
                {week.theme}
              </p>

              {/* Time & Progress */}
              <div className="flex items-center gap-4 flex-wrap mb-3">
                {/* Total Hours */}
                <span className="flex items-center gap-1 text-xs text-text-tertiary font-secondary">
                  <Clock className="w-3 h-3" />
                  {week.totalHours}h
                </span>

                {/* Time Breakdown */}
                <div className="flex items-center gap-2 text-xs text-text-tertiary font-secondary">
                  <div className="flex items-center gap-0.5">
                    <Hammer className="w-3 h-3 text-orange-600" />
                    <span>{week.timeBreakdown.build}h</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <BookOpen className="w-3 h-3 text-blue-600" />
                    <span>{week.timeBreakdown.research}h</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Share2 className="w-3 h-3 text-green-600" />
                    <span>{week.timeBreakdown.share}h</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <ProgressBar
                  completed={progress.completed}
                  total={progress.total}
                  percentage={progress.percentage}
                  size="sm"
                />
                <span className="text-xs text-text-tertiary font-secondary whitespace-nowrap">
                  {progress.completed}/{progress.total}
                </span>
              </div>

              {/* Project Title */}
              {week.buildSection?.projectTitle && (
                <div className="mt-3 p-2 bg-primary/5 border border-primary/20 rounded">
                  <div className="text-xs font-bold text-primary font-primary">PROJECT</div>
                  <div className="text-xs text-text-primary font-secondary truncate">
                    {week.buildSection.projectTitle}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Arrow Icon */}
            <motion.div
              className="flex-shrink-0 text-text-secondary group-hover:text-primary transition-colors"
              whileHover={{ x: 2 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
