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
    <div className="h-full flex flex-col bg-surface rounded-md shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex-1 flex flex-col p-[var(--space-6)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                Phase {phase.phaseNumber}
              </span>
              <span className="text-sm text-text-secondary flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {phase.weekRange}
              </span>
            </div>
            <div className="min-h-[3.5rem]">
              <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">{phase.title}</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{phase.summary}</p>
          </div>
        </div>

        <div className="mb-4 mt-auto">
          <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="md" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm text-text-secondary">{phase.weeks.length} weeks</span>
          <Link
            href={`/viewer/phase/${phase.phaseNumber}`}
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
