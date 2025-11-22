'use client';

import { Roadmap, Week } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { minutesToHoursDisplay, getUniqueTaskTypes } from '@/lib/roadmap-utils';
import { useRouter } from 'next/navigation';

interface NewFormatRoadmapOverviewProps {
  roadmap: Roadmap;
}

export function NewFormatRoadmapOverview({ roadmap }: NewFormatRoadmapOverviewProps) {
  const router = useRouter();

  // Calculate total statistics
  const totalMinutes = roadmap.phases.reduce((total, phaseDict) => {
    const phaseName = Object.keys(phaseDict)[0];
    const weeks = phaseDict[phaseName];
    return total + weeks.reduce((sum, week) => sum + week.total_minutes, 0);
  }, 0);

  const totalTasks = roadmap.phases.reduce((total, phaseDict) => {
    const phaseName = Object.keys(phaseDict)[0];
    const weeks = phaseDict[phaseName];
    return total + weeks.reduce((sum, week) => sum + (week.tasks?.length || 0), 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Roadmap Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">{roadmap.roadmap_title}</h1>

          {/* Roadmap Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="px-6 py-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
              <div className="text-2xl font-bold">{roadmap.total_duration_weeks} weeks</div>
            </div>
            <div className="px-6 py-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Time</div>
              <div className="text-2xl font-bold">{minutesToHoursDisplay(totalMinutes)}</div>
            </div>
            <div className="px-6 py-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Tasks</div>
              <div className="text-2xl font-bold">{totalTasks}</div>
            </div>
            <div className="px-6 py-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phases</div>
              <div className="text-2xl font-bold">{roadmap.phases.length}</div>
            </div>
          </div>
        </header>

        {/* Phases Grid */}
        <div className="space-y-8">
          {roadmap.phases.map((phaseDict, phaseIndex) => {
            const phaseName = Object.keys(phaseDict)[0];
            const weeks = phaseDict[phaseName];
            const phaseMinutes = weeks.reduce((sum, week) => sum + week.total_minutes, 0);
            const phaseTasks = weeks.reduce((sum, week) => sum + (week.tasks?.length || 0), 0);

            return (
              <div
                key={phaseIndex}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
              >
                {/* Phase Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                          Phase {phaseIndex + 1}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{phaseName}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {weeks.length} weeks
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {minutesToHoursDisplay(phaseMinutes)}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {phaseTasks} tasks
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/viewer/phase/${phaseIndex + 1}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      View Phase
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Weeks Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weeks.map((week) => (
                      <WeekCard key={week.week_number} week={week} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Get Started CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Begin?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Start with Week 1 and work through each task systematically. Remember, consistency is key to mastering any new skill.
          </p>
          <Link
            href={`/viewer/week/1`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            Start Week 1
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}

function WeekCard({ week }: { week: Week }) {
  const taskTypes = getUniqueTaskTypes(week);

  return (
    <Link href={`/viewer/week/${week.week_number}`}>
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer group">
        {/* Week Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Week {week.week_number}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {minutesToHoursDisplay(week.total_minutes)}
          </span>
        </div>

        {/* Week Goal */}
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {week.goal}
        </h4>

        {/* Task Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {week.tasks?.length || 0} tasks • {taskTypes.length} categories
        </div>
      </div>
    </Link>
  );
}
