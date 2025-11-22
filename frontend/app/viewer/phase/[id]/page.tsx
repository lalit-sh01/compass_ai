'use client';

import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRoadmap } from '@/context/RoadmapContext';
import { getPhaseByNumber } from '@/lib/roadmap-utils';
import { getActiveWeek, getUpcomingWeeks } from '@/lib/phase-utils';
import PhaseCanvasHero from '@/components/viewer/phase/PhaseCanvasHero';
import AIInsightCard from '@/components/viewer/phase/AIInsightCard';
import WeekPreviewCard from '@/components/viewer/phase/WeekPreviewCard';
import { NewFormatPhaseView } from '@/components/viewer/NewFormatPhaseView';
import type { Roadmap as NewRoadmap, Week as NewWeek } from '@/lib/types';

export default function PhasePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { roadmap, isNewFormat } = useRoadmap();
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

  // If new format (PRD v4.1), use NewFormatPhaseView
  if (isNewFormat) {
    const newRoadmap = roadmap as NewRoadmap;
    const phaseIndex = phaseNumber - 1; // Convert 1-indexed URL to 0-indexed array

    if (phaseIndex < 0 || phaseIndex >= newRoadmap.phases.length) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Phase not found</h1>
            <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to dashboard
            </Link>
          </div>
        </div>
      );
    }

    // Extract phase name and weeks from the dictionary structure
    // phases[0] = { "Foundation": [Week1, Week2, ...] }
    const phaseDict = newRoadmap.phases[phaseIndex];
    const phaseName = Object.keys(phaseDict)[0];
    const weeks = phaseDict[phaseName];

    return (
      <NewFormatPhaseView
        phaseName={phaseName}
        weeks={weeks}
        phaseIndex={phaseIndex}
        totalPhases={newRoadmap.phases.length}
      />
    );
  }

  // Legacy format - continue with old rendering
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

  // Get active week and upcoming weeks
  const activeWeek = getActiveWeek(phase);
  const upcomingWeeks = getUpcomingWeeks(phase, activeWeek, 3);

  // Calculate phase progress
  const completedWeeks = phase.weeks.filter((w: any) => w.status === 'completed').length;
  const progressPercentage = Math.round((completedWeeks / phase.weeks.length) * 100);

  return (
    <div className="min-h-screen bg-bg-secondary/30 text-text-primary font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border bg-bg-primary/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-xs font-mono text-primary font-medium">CONCEPT B: PHASE CANVAS</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">{phase.title}</h1>
            <p className="text-text-secondary max-w-2xl">{phase.summary}</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-surface rounded-lg border border-border text-sm font-medium">
              <span className="text-text-secondary">Velocity:</span>{' '}
              <span className={progressPercentage >= 50 ? "text-green-600" : "text-yellow-600"}>
                {progressPercentage >= 50 ? "On Track" : "In Progress"}
              </span>
            </div>
            <div className="px-4 py-2 bg-surface rounded-lg border border-border text-sm font-medium">
              <span className="text-text-secondary">Progress:</span>{' '}
              <span className="text-text-primary">{progressPercentage}%</span>
            </div>
          </div>
        </header>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* 1. Current Week (Hero - 2x2) */}
          <PhaseCanvasHero week={activeWeek} />

          {/* 2. AI Insight (1x1) */}
          <AIInsightCard />

          {/* 3-5. Upcoming Weeks (1x1 each) */}
          {upcomingWeeks.length > 0 && (
            <WeekPreviewCard week={upcomingWeeks[0]} label="NEXT UP" />
          )}
          {upcomingWeeks.length > 1 && (
            <WeekPreviewCard week={upcomingWeeks[1]} />
          )}
          {upcomingWeeks.length > 2 && (
            <WeekPreviewCard week={upcomingWeeks[2]} />
          )}

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
      </main>
    </div>
  );
}
