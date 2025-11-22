'use client';

import { Week, Task } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import {
  getUniqueTaskTypes,
  getTasksByType,
  calculateTaskDistribution,
  getTaskCategoryDisplay,
  minutesToHoursDisplay,
  countQualityWarnings,
} from '@/lib/roadmap-utils';

interface NewFormatWeekViewProps {
  week: Week;
  weekNumber: number;
}

export function NewFormatWeekView({ week, weekNumber }: NewFormatWeekViewProps) {
  const taskTypes = getUniqueTaskTypes(week);
  const distribution = calculateTaskDistribution(week);
  const qualityWarnings = countQualityWarnings(week);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
        </div>

        {/* Week Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
              Week {week.week_number}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {minutesToHoursDisplay(week.total_minutes)}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {week.goal}
          </h1>

          {/* Quality Warnings */}
          {qualityWarnings > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {qualityWarnings} task{qualityWarnings > 1 ? 's have' : ' has'} low-confidence resources
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  These resources may need manual verification for quality.
                </p>
              </div>
            </div>
          )}

          {/* Task Distribution */}
          <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Time Distribution
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {taskTypes.map(type => (
                <div key={type} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {distribution[type] || 0}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 capitalize">
                    {type.replace('-', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks by Type */}
        <div className="space-y-8">
          {taskTypes.map(taskType => {
            const tasks = getTasksByType(week, taskType);
            const totalMinutes = tasks.reduce((sum, t) => sum + t.estimated_minutes, 0);

            return (
              <div key={taskType} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                    {taskType.replace('-', ' ')} Tasks
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {minutesToHoursDisplay(totalMinutes)} • {tasks.length} task{tasks.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-4">
                  {tasks.map(task => (
                    <TaskCard key={task.task_id} task={task} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {task.task_name}
            </h3>
            {task.quality_warning && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                Low Confidence
              </span>
            )}
          </div>

          {task.task_category_label && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {task.task_category_label}
            </span>
          )}
        </div>

        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex-shrink-0">
          {minutesToHoursDisplay(task.estimated_minutes)}
        </span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
        {task.description}
      </p>

      {/* Resource */}
      {task.resource_url ? (
        <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <a
                href={task.resource_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline block truncate"
              >
                {task.resource_title || task.resource_url}
              </a>
              {task.resource_author && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  by {task.resource_author}
                </p>
              )}
            </div>

            {task.quality_score !== null && task.quality_score !== undefined && (
              <div className="flex-shrink-0">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  task.quality_score >= 70
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : task.quality_score >= 30
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                  Quality: {task.quality_score}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            Resource search: {task.resource_search_query}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Resource not yet enriched
          </p>
        </div>
      )}
    </div>
  );
}
