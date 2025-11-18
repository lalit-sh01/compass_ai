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
    PLANNED: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    IN_PROGRESS: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    COMPLETED: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
      <div className={compact ? 'p-4' : 'p-6'}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded">Week {week.weekNumber}</span>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded ${statusColors[week.status] || statusColors.PLANNED}`}>
                {week.status}
              </span>
            </div>
            <h4 className={`font-bold text-gray-900 dark:text-gray-100 mb-1 ${compact ? 'text-base' : 'text-lg'}`}>{week.title}</h4>
            <p className={`text-gray-600 dark:text-gray-400 italic ${compact ? 'text-xs' : 'text-sm'}`}>{week.theme}</p>
          </div>
        </div>

        {!compact && (
          <>
            {/* Time Breakdown */}
            <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 text-xs">
                <Hammer className="w-4 h-4 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{week.timeBreakdown.build}h</div>
                  <div className="text-gray-500 dark:text-gray-500">Build</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{week.timeBreakdown.research}h</div>
                  <div className="text-gray-500 dark:text-gray-500">Research</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Share2 className="w-4 h-4 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{week.timeBreakdown.share}h</div>
                  <div className="text-gray-500 dark:text-gray-500">Share</div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="sm" />
            </div>

            {/* Project Info */}
            {week.buildSection && (
              <div className="mb-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="text-xs font-semibold text-orange-900 dark:text-orange-200 mb-1">PROJECT</div>
                <div className="text-sm font-medium text-orange-800 dark:text-orange-300">{week.buildSection.projectTitle}</div>
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {week.totalHours} hours
          </span>
          <Link
            href={`/viewer/week/${week.weekNumber}`}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
