'use client';

import { Week, Task } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { minutesToHoursDisplay, getUniqueTaskTypes, calculateTaskDistribution } from '@/lib/roadmap-utils';

interface NewFormatPhaseViewProps {
  phaseName: string;
  weeks: Week[];
  phaseIndex: number;
  totalPhases: number;
}

export function NewFormatPhaseView({ phaseName, weeks, phaseIndex, totalPhases }: NewFormatPhaseViewProps) {
  // Calculate phase-level statistics
  const totalMinutes = weeks.reduce((sum, week) => sum + week.total_minutes, 0);
  const totalTasks = weeks.reduce((sum, week) => sum + (week.tasks?.length || 0), 0);

  // Get task type distribution across all weeks
  const allTaskTypes = new Set<string>();
  weeks.forEach(week => {
    getUniqueTaskTypes(week).forEach(type => allTaskTypes.add(type));
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Phase Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
              Phase {phaseIndex + 1}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{phaseName}</h1>

          {/* Phase Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
              <div className="text-lg font-semibold">{weeks.length} weeks</div>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
              <div className="text-lg font-semibold">{minutesToHoursDisplay(totalMinutes)}</div>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
              <div className="text-lg font-semibold">{totalTasks}</div>
            </div>
          </div>

          {/* Task Type Distribution */}
          {allTaskTypes.size > 0 && (
            <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Task Types in This Phase
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(allTaskTypes).map(type => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full capitalize"
                  >
                    {type.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Weeks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((week) => (
            <WeekCard key={week.week_number} week={week} />
          ))}
        </div>

        {/* Phase Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          {phaseIndex > 0 ? (
            <Link
              href={`/viewer/phase/${phaseIndex}`}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Phase
            </Link>
          ) : (
            <div />
          )}

          {phaseIndex < totalPhases - 1 && (
            <Link
              href={`/viewer/phase/${phaseIndex + 2}`}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Next Phase
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

function WeekCard({ week }: { week: Week }) {
  const taskTypes = getUniqueTaskTypes(week);
  const distribution = calculateTaskDistribution(week);

  return (
    <Link href={`/viewer/week/${week.week_number}`}>
      <div className="h-full p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group">
        {/* Week Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Week {week.week_number}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {minutesToHoursDisplay(week.total_minutes)}
          </span>
        </div>

        {/* Week Goal */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {week.goal}
        </h3>

        {/* Task Stats */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {week.tasks?.length || 0} tasks
        </div>

        {/* Task Distribution Mini View */}
        {taskTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {taskTypes.slice(0, 3).map(type => (
              <span
                key={type}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded capitalize"
              >
                {type.replace('-', ' ')} {distribution[type]}%
              </span>
            ))}
            {taskTypes.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                +{taskTypes.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
