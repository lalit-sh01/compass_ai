import Link from 'next/link'
import ImportRoadmap from '@/components/dashboard/ImportRoadmap'
import RoadmapGrid from '@/components/dashboard/RoadmapGrid'
import { getUserRoadmaps, getRoadmapStats } from '@/lib/db/roadmaps'
import { hasApiKey } from '@/lib/db/api-keys'
import { getCurrentUser } from '@/lib/db/users'

export default async function DashboardPage() {
  // Load real data from database
  const user = await getCurrentUser()
  const hasOpenAiKey = user ? await hasApiKey('openai') : false
  const roadmaps = user ? await getUserRoadmaps() : []
  const stats = user ? await getRoadmapStats() : {
    total: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
    paused: 0,
    archived: 0
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Compact Header with Inline Stats */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-primary">
            My Roadmaps
          </h1>
          {stats.total > 0 && (
            <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-text-primary">{stats.total}</span> total
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-primary">{stats.inProgress}</span> in progress
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-green-600 dark:text-green-400">{stats.completed}</span> completed
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/onboarding"
            className={`inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors font-medium shadow-sm glow-accent ${!hasOpenAiKey ? 'opacity-50 pointer-events-none' : ''
              }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Roadmap
          </Link>
        </div>
      </div>

      {/* API Key Warning - Conditional Banner */}
      {!hasOpenAiKey && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
          <svg
            className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              API Key Required
            </h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              Add your OpenAI API key to create new roadmaps.
            </p>
            <Link
              href="/settings"
              className="inline-flex items-center mt-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 underline"
            >
              Go to Settings →
            </Link>
          </div>
        </div>
      )}

      {/* Primary Content: My Roadmaps */}
      {roadmaps.length === 0 ? (
        /* Empty State */
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-text-primary font-primary">No roadmaps yet</h3>
          <p className="mt-2 text-sm text-text-secondary font-secondary mb-6">
            Get started by creating your first personalized learning roadmap
          </p>
          <Link
            href="/onboarding"
            className={`inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm glow-accent ${!hasOpenAiKey ? 'opacity-50 pointer-events-none' : ''
              }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Your First Roadmap
          </Link>
        </div>
      ) : (
        <RoadmapGrid roadmaps={roadmaps} />
      )}

      {/* Quick Actions - Compact Secondary Section */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold text-text-primary font-primary mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Import Roadmap */}
          <ImportRoadmap />

          {/* Settings */}
          <Link
            href="/settings"
            className="group relative overflow-hidden rounded-lg border border-border p-5 transition-all hover:border-primary hover:bg-primary/5 flex items-center gap-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface shadow-sm">
              <svg
                className="h-5 w-5 text-text-secondary group-hover:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary font-primary transition-colors">
                Settings
              </h3>
              <p className="text-xs text-text-secondary font-secondary">
                Manage API keys
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
