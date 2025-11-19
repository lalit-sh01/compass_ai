'use client';

import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRoadmap } from '@/context/RoadmapContext';
import WeekCard from '@/components/roadmap/WeekCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { getPhaseByNumber, getPhaseProgress } from '@/lib/roadmap-utils';



export default function PhasePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { roadmap } = useRoadmap();
  const resolvedParams = use(params);
  const phaseNumber = parseInt(resolvedParams.id);

  useEffect(() => {
    if (!roadmap) {
      router.push('/');
    }
  }, [roadmap, router]);

  if (!roadmap) {
    return null;
  }

  const phase = getPhaseByNumber(roadmap, phaseNumber);

  if (!phase) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Phase not found</h1>
          <Link href="/viewer" className="text-primary hover:text-primary-hover hover:underline">
            Back to overview
          </Link>
        </div>
      </div>
    );
  }

  const progress = getPhaseProgress(phase);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/viewer"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to overview
        </Link>

      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded">
            Phase {phase.phaseNumber}
          </span>
          <span className="text-sm text-text-secondary">{phase.weekRange}</span>
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-2">{phase.title}</h1>
        <p className="text-lg text-text-secondary mb-6">{phase.summary}</p>

        <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="lg" />
      </div>

      {/* Weeks */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Weeks ({phase.weeks.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phase.weeks.map((week) => (
            <WeekCard key={week.weekNumber} week={week} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        {phaseNumber > 1 && (
          <Link
            href={`/viewer/phase/${phaseNumber - 1}`}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Phase {phaseNumber - 1}
          </Link>
        )}
        <div className="flex-1" />
        {phaseNumber < roadmap.phases.length && (
          <Link
            href={`/viewer/phase/${phaseNumber + 1}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors shadow-sm glow-accent"
          >
            Phase {phaseNumber + 1}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        )}
      </div>
    </div>
  );
}
