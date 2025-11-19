'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Target, Calendar, Clock, TrendingUp } from 'lucide-react';
import { useRoadmap } from '@/context/RoadmapContext';
import PhaseCard from '@/components/roadmap/PhaseCard';
import ProgressBar from '@/components/ui/ProgressBar';

import { getRoadmapProgress, formatDate } from '@/lib/roadmap-utils';

function ViewerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { roadmap, loadRoadmapById, loading } = useRoadmap();
  const roadmapId = searchParams.get('roadmapId');

  useEffect(() => {
    if (roadmapId && !roadmap && !loading) {
      // Load from database
      loadRoadmapById(roadmapId);
    } else if (!roadmapId && !roadmap) {
      // No roadmap ID and no roadmap loaded - redirect to home
      router.push('/');
    }
  }, [roadmapId, roadmap, loading, loadRoadmapById, router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-600">Loading roadmap...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return null;
  }

  const progress = getRoadmapProgress(roadmap);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Compact Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-primary font-primary mb-2">{roadmap.title}</h1>
            <div className="flex items-center gap-2 text-base text-text-secondary font-secondary">
              <Target className="w-4 h-4 text-primary flex-shrink-0" />
              <p>{roadmap.goal}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="text-right">
              <div className="font-semibold text-text-primary">{roadmap.totalDurationWeeks} weeks</div>
              <div className="text-xs">Duration</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-text-primary">{roadmap.timeCommitmentPerWeek}</div>
              <div className="text-xs">Per week</div>
            </div>
          </div>
        </div>

        {/* Inline Progress */}
        <div className="bg-surface rounded-lg p-4 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-text-primary">Overall Progress</h3>
            <span className="text-sm text-text-secondary">{progress.completed} of {progress.total} completed</span>
          </div>
          <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="lg" />
        </div>
      </div>

      {/* Primary Content: Phases */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-text-primary mb-6 font-primary">Learning Phases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmap.phases.map((phase) => (
            <PhaseCard key={phase.phaseNumber} phase={phase} />
          ))}
        </div>
      </div>

      {/* Expandable Details Section */}
      <details className="group mb-6">
        <summary className="cursor-pointer list-none">
          <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors">
            <h3 className="text-lg font-semibold text-text-primary font-primary">Core Skills & Details</h3>
            <svg className="w-5 h-5 text-text-secondary group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>
        <div className="mt-4 space-y-6">
          {/* Core Skills */}
          <div className="bg-surface rounded-lg p-6 border border-border shadow-sm">
            <h3 className="text-base font-semibold text-text-primary mb-4">Core Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmap.coreSkills.map((skill, index) => (
                <div key={index} className="p-4 bg-bg-secondary rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-text-primary text-sm">{skill.skill}</h4>
                    <span className="text-xs text-text-secondary whitespace-nowrap ml-2">{skill.relevantWeeks}</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile & Learning Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-lg p-6 border border-border shadow-sm">
              <h3 className="text-base font-semibold text-text-primary mb-3">Profile</h3>
              <p className="text-sm text-text-secondary mb-2">{roadmap.profile.description}</p>
              <p className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">Experience:</span> {roadmap.profile.experience}
              </p>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border shadow-sm">
              <h3 className="text-base font-semibold text-text-primary mb-3">Learning Style</h3>
              <p className="text-xl font-bold text-primary">{roadmap.learningStyle}</p>
            </div>
          </div>

          {/* Timeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-lg p-4 border border-border shadow-sm">
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                <Calendar className="w-4 h-4" />
                <span>Start Date</span>
              </div>
              <div className="text-base font-semibold text-text-primary">{formatDate(roadmap.startDate)}</div>
            </div>

            <div className="bg-surface rounded-lg p-4 border border-border shadow-sm">
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                <Calendar className="w-4 h-4" />
                <span>Target End</span>
              </div>
              <div className="text-base font-semibold text-text-primary">{formatDate(roadmap.targetEndDate)}</div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

export default function ViewerPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ViewerContent />
    </Suspense>
  );
}
