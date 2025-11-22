import Link from 'next/link';
import { Clock, ChevronRight, Hammer, BookOpen, Share2 } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import { getWeekProgress } from '@/lib/roadmap-utils';
import type { Week } from '@/lib/types';

interface WeekCardProps {
  week: Week;
  compact?: boolean;
}

export default function WeekCard({ week, compact = false }: WeekCardProps) {
  const progress = getWeekProgress(week);

  const statusColors: Record<string, string> = {
    PLANNED: 'bg-bg-secondary text-text-secondary',
    IN_PROGRESS: 'bg-primary/10 text-primary',
    COMPLETED: 'bg-green-500/10 text-green-700 dark:text-green-400',
  };

  return (
    <div className="h-full flex flex-col bg-surface rounded-md shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
      <div className={`${compact ? 'p-[var(--space-4)]' : 'p-[var(--space-6)]'} flex-1 flex flex-col`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-1 bg-primary text-on-primary text-xs font-bold rounded-sm">Week {week.weekNumber}</span>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-sm ${statusColors[week.status] || statusColors.PLANNED}`}>
                {week.status}
              </span>
            </div>
            <div className={compact ? 'min-h-[2.5rem]' : 'min-h-[3.5rem]'}>
              <h4 className={`font-bold text-text-primary mb-1 line-clamp-2 ${compact ? 'text-base' : 'text-lg'}`}>{week.title}</h4>
            </div>
            <p className={`text-text-secondary italic line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}>{week.theme}</p>
          </div>
        </div>

        {!compact && (
          <>
            {/* Time Breakdown */}
            <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-border mt-auto">
              <div className="flex items-center gap-2 text-xs">
                <Hammer className="w-4 h-4 text-orange-600" />
                <div>
                  <div className="font-semibold text-text-primary">{week.timeBreakdown.build}h</div>
                  <div className="text-text-tertiary">Build</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-semibold text-text-primary">{week.timeBreakdown.research}h</div>
                  <div className="text-text-tertiary">Research</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Share2 className="w-4 h-4 text-green-600" />
                <div>
                  <div className="font-semibold text-text-primary">{week.timeBreakdown.share}h</div>
                  <div className="text-text-tertiary">Share</div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="sm" />
            </div>

            {/* Project Info */}
            {week.buildSection && (
              <div className="mb-3 p-3 bg-primary/5 border border-primary/20 rounded-md">
                <div className="text-xs font-semibold text-primary mb-1">PROJECT</div>
                <div className="text-sm font-medium text-text-primary line-clamp-1">{week.buildSection.projectTitle}</div>
              </div>
            )}
          </>
        )}

        <div className={`flex items-center justify-between pt-3 border-t border-border ${compact ? 'mt-auto' : ''}`}>
          <span className="text-xs text-text-secondary flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {week.totalHours} hours
          </span>
          <Link
            href={`/viewer/week/${week.weekNumber}`}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
