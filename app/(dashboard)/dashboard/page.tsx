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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome!
        </h1>
        <p className="mt-2 text-gray-600">
          Create personalized learning roadmaps powered by AI
        </p>
      </div>

      {/* API Key Warning */}
      {!hasOpenAiKey && (
        <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-yellow-600"
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
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-900">
                API Key Required
              </h3>
              <p className="mt-1 text-sm text-yellow-800">
                You need to add your OpenAI API key before you can generate roadmaps.
              </p>
              <div className="mt-3">
                <Link
                  href="/settings"
                  className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Add API Key
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Create New Roadmap */}
        <Link
          href="/onboarding"
          className={`group relative overflow-hidden rounded-lg border-2 border-dashed p-6 transition-all hover:border-blue-600 hover:bg-blue-50 ${
            !hasOpenAiKey ? 'opacity-50 pointer-events-none' : 'border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900">
              Create New Roadmap
            </h3>
            <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-800">
              Start with an AI-powered assessment to generate your personalized learning path
            </p>
          </div>
        </Link>

        {/* Import Roadmap */}
        <ImportRoadmap />

        {/* Settings */}
        <Link
          href="/settings"
          className="group relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-6 transition-all hover:border-blue-600 hover:bg-blue-50"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-200 transition-colors">
              <svg
                className="h-6 w-6 text-gray-600 group-hover:text-blue-600"
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
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900">
              Settings
            </h3>
            <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-800">
              Manage your API keys and account settings
            </p>
          </div>
        </Link>
      </div>

      {/* Stats Overview */}
      {stats.total > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Roadmaps</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-600">{stats.notStarted}</div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
        </div>
      )}

      {/* My Roadmaps Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Roadmaps</h2>
          {roadmaps.length > 0 && (
            <Link
              href="/onboarding"
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ${
                !hasOpenAiKey ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              + New Roadmap
            </Link>
          )}
        </div>

        {roadmaps.length === 0 ? (
          /* Empty State */
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No roadmaps yet</h3>
            <p className="mt-2 text-sm text-gray-600">
              Get started by creating your first personalized learning roadmap
            </p>
            <div className="mt-6">
              <Link
                href="/onboarding"
                className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${
                  !hasOpenAiKey ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                Create Your First Roadmap
              </Link>
            </div>
          </div>
        ) : (
          <RoadmapGrid roadmaps={roadmaps} />
        )}
      </div>
    </div>
  )
}
