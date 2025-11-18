import Link from 'next/link';
import { ChevronRight, Calendar } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import { getPhaseProgress } from '@/lib/roadmap-utils';
import type { Phase } from '@/lib/types';

interface PhaseCardProps {
  phase: Phase;
}

export default function PhaseCard({ phase }: PhaseCardProps) {
  const progress = getPhaseProgress(phase);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">
                Phase {phase.phaseNumber}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {phase.weekRange}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{phase.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.summary}</p>
          </div>
        </div>

        <div className="mb-4">
          <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="md" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <span className="text-sm text-gray-600 dark:text-gray-400">{phase.weeks.length} weeks</span>
          <Link
            href={`/viewer/phase/${phase.phaseNumber}`}
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
