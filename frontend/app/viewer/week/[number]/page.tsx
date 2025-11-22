'use client';

import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRoadmap } from '@/context/RoadmapContext';
import BuildSectionComponent from '@/components/roadmap/BuildSection';
import ResearchSectionComponent from '@/components/roadmap/ResearchSection';
import ShareSectionComponent from '@/components/roadmap/ShareSection';
import { getWeekByNumber, getWeekProgress, getTotalDurationWeeks } from '@/lib/roadmap-utils';
import { NewFormatWeekView } from '@/components/viewer/NewFormatWeekView';
import type { Week as NewWeek, Week as LegacyWeek } from '@/lib/types';

import { HeroAction } from '@/components/viewer/hybrid/HeroAction';
import { CopilotSidebar } from '@/components/viewer/hybrid/CopilotSidebar';
import { ScrollFocusWrapper } from '@/components/viewer/hybrid/ScrollFocusWrapper';
import { SelectionProvider } from '@/context/SelectionContext';
import { BulkActionsBar } from '@/components/viewer/actions/BulkActionsBar';
import { SelectionToggle } from '@/components/viewer/controls/SelectionToggle';


export default function WeekPage({ params }: { params: Promise<{ number: string }> }) {
  const router = useRouter();
  const { roadmap, isNewFormat } = useRoadmap();
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
          <Link href="/dashboard" className="text-primary hover:underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  // If new format (PRD v4.1), use NewFormatWeekView
  if (isNewFormat) {
    return <NewFormatWeekView week={week as NewWeek} weekNumber={weekNumber} />;
  }

  // Legacy format - continue with old rendering below
  const legacyWeek = week as LegacyWeek;
  // Find the phase this week belongs to
  const phase = roadmap.phases.find((p: any) => p.weeks?.some((w: any) => w.weekNumber === weekNumber));

  return (
    <SelectionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <div className="mx-auto max-w-[1800px]">

          {/* Navigation / Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/viewer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to overview
            </Link>
            <SelectionToggle />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

            {/* Main Content (8 cols = 2/3) */}
            <div className="xl:col-span-8 pb-32">

              {/* Hero Action */}
              <div className="mb-20">
                <HeroAction
                  title={legacyWeek.title}
                  subtitle={legacyWeek.theme}
                  type="build"
                  onAction={() => { }}
                />
              </div>

              <div className="space-y-16">
                {/* 1. Build Section */}
                {legacyWeek.buildSection && (
                  <ScrollFocusWrapper
                    className="relative transition-all duration-500"
                    defaultInFocus={true}
                    rootMargin="-5% 0px -20% 0px"
                    threshold={0.1}
                  >
                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent opacity-20 rounded-full hidden xl:block" />
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
                          Build Phase
                        </span>
                        <span className="text-sm text-gray-500">{legacyWeek.buildSection.hours}h estimated</span>
                      </div>

                      <BuildSectionComponent
                        buildSection={legacyWeek.buildSection}
                        weekNumber={weekNumber}
                      />
                    </div>
                  </ScrollFocusWrapper>
                )}

                {/* 2. Research Section */}
                {legacyWeek.researchSection && (
                  <ScrollFocusWrapper
                    className="relative transition-all duration-500"
                    threshold={0.1}
                  >
                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent opacity-20 rounded-full hidden xl:block" />
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                          Research Phase
                        </span>
                        <span className="text-sm text-gray-500">{legacyWeek.researchSection.hours}h estimated</span>
                      </div>

                      <ResearchSectionComponent
                        researchSection={legacyWeek.researchSection}
                        weekNumber={weekNumber}
                      />
                    </div>
                  </ScrollFocusWrapper>
                )}

                {/* 3. Share Section */}
                {legacyWeek.shareSection && (
                  <ScrollFocusWrapper
                    className="relative transition-all duration-500"
                    threshold={0.1}
                  >
                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-20 rounded-full hidden xl:block" />
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                          Share Phase
                        </span>
                        <span className="text-sm text-gray-500">{legacyWeek.shareSection.hours}h estimated</span>
                      </div>

                      <ShareSectionComponent
                        shareSection={legacyWeek.shareSection}
                        weekNumber={weekNumber}
                      />
                    </div>
                  </ScrollFocusWrapper>
                )}

                {/* Navigation Footer */}
                <div className="flex items-center justify-between pt-12">
                  {weekNumber > 1 && (
                    <Link
                      href={`/viewer/week/${weekNumber - 1}`}
                      className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Week {weekNumber - 1}
                    </Link>
                  )}
                  <div className="flex-1" />
                  {weekNumber < getTotalDurationWeeks(roadmap) && (
                    <Link
                      href={`/viewer/week/${weekNumber + 1}`}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                      Week {weekNumber + 1}
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  )}
                </div>

              </div>
            </div>

            {/* Right Margin: Copilot (4 cols = 1/3) */}
            <div className="hidden xl:flex xl:col-span-4 flex-col gap-6 sticky top-8 h-[calc(100vh-4rem)]">
              <CopilotSidebar />
            </div>

          </div>
        </div>

        <BulkActionsBar />
      </div>
    </SelectionProvider>
  );
}
