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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{roadmap.title}</h1>
        <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <p>{roadmap.goal}</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Start Date</span>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formatDate(roadmap.startDate)}</div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Target End</span>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formatDate(roadmap.targetEndDate)}</div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {roadmap.totalDurationWeeks} weeks
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Time/Week</span>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{roadmap.timeCommitmentPerWeek}</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Overall Progress</h3>
          <ProgressBar completed={progress.completed} total={progress.total} percentage={progress.percentage} size="lg" />
        </div>
      </div>

      {/* Profile & Learning Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Profile</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{roadmap.profile.description}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Experience:</span> {roadmap.profile.experience}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Learning Style</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{roadmap.learningStyle}</p>
        </div>
      </div>

      {/* Core Skills */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Core Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmap.coreSkills.map((skill, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{skill.skill}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-2">{skill.relevantWeeks}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phases */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Phases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmap.phases.map((phase) => (
            <PhaseCard key={phase.phaseNumber} phase={phase} />
          ))}
        </div>
      </div>
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
