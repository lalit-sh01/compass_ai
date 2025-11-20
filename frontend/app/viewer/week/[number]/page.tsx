'use client';

import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRoadmap } from '@/context/RoadmapContext';
import BuildSectionComponent from '@/components/roadmap/BuildSection';
import ResearchSectionComponent from '@/components/roadmap/ResearchSection';
import ShareSectionComponent from '@/components/roadmap/ShareSection';
import ProgressBar from '@/components/ui/ProgressBar';
import { getWeekByNumber, getWeekProgress } from '@/lib/roadmap-utils';

import { SelectionProvider } from '@/context/SelectionContext';
import { BulkActionsBar } from '@/components/viewer/actions/BulkActionsBar';
import { SelectionToggle } from '@/components/viewer/controls/SelectionToggle';
import { NoteDisplay } from '@/components/viewer/notes/NoteDisplay';
import { useNotes } from '@/hooks/useNotes';

export default function WeekPage({ params }: { params: Promise<{ number: string }> }) {
  const router = useRouter();
  const { roadmap } = useRoadmap();
  const resolvedParams = use(params);
  const weekNumber = parseInt(resolvedParams.number);

  useEffect(() => {
    if (!roadmap) {
      router.push('/');
    }
  }, [roadmap, router]);

  if (!roadmap) {
    return null;
  }

  const week = getWeekByNumber(roadmap, weekNumber);

  if (!week) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Week not found</h1>
          <Link href="/viewer" className="text-primary hover:underline">
            Back to overview
          </Link>
        </div>
      </div>
    );
  }

  const progress = getWeekProgress(week);

  // Find the phase this week belongs to
  const phase = roadmap.phases.find((p) => p.weeks.some((w) => w.weekNumber === weekNumber));

  // Week notes hook
  const { note: weekNote, saveNote: saveWeekNote } = useNotes({
    entityType: 'week',
    entityId: `w${weekNumber}`,
    weekNumber,
  });

  return (
    <SelectionProvider>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/viewer"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to overview
          </Link>
          <SelectionToggle />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-primary text-white-always text-sm font-bold rounded">Week {week.weekNumber}</span>
            {phase && (
              <Link
                href={`/viewer/phase/${phase.phaseNumber}`}
                className="px-3 py-1 bg-accent-secondary text-primary text-sm font-semibold rounded hover:bg-accent-primary/20 transition-colors"
              >
                Phase {phase.phaseNumber}
              </Link>
            )}
            <span className="px-3 py-1 bg-surface text-text-secondary text-sm font-semibold rounded">
              {week.status}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-2">{week.title}</h1>
          <p className="text-lg text-text-secondary italic mb-4">{week.theme}</p>

          <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {week.totalHours} hours total
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Build: {week.timeBreakdown.build}h | Research: {week.timeBreakdown.research}h | Share: {week.timeBreakdown.share}h
            </span>
          </div>

          <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="lg" />

          {/* Week Notes */}
          <div className="mt-6">
            <NoteDisplay
              entityType="week"
              entityId={`w${weekNumber}`}
              content={weekNote}
              onSave={saveWeekNote}
              title="Week Notes"
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Build Section */}
          {week.buildSection && (
            <div className="bg-surface rounded-lg p-6 border border-border">
              <BuildSectionComponent buildSection={week.buildSection} weekNumber={weekNumber} />
            </div>
          )}

          {/* Research Section */}
          {week.researchSection && (
            <div className="bg-surface rounded-lg p-6 border border-border">
              <ResearchSectionComponent researchSection={week.researchSection} weekNumber={weekNumber} />
            </div>
          )}

          {/* Share Section */}
          {week.shareSection && (
            <div className="bg-surface rounded-lg p-6 border border-border">
              <ShareSectionComponent shareSection={week.shareSection} weekNumber={weekNumber} />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {weekNumber > 1 && (
            <Link
              href={`/viewer/week/${weekNumber - 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-accent-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Week {weekNumber - 1}
            </Link>
          )}
          <div className="flex-1" />
          {weekNumber < roadmap.totalDurationWeeks && (
            <Link
              href={`/viewer/week/${weekNumber + 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white-always rounded-lg hover:bg-primary/90 transition-colors"
            >
              Week {weekNumber + 1}
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          )}
        </div>

        <BulkActionsBar />
      </div>
    </SelectionProvider>
  );
}
