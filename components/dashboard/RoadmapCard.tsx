'use client'

import Link from 'next/link'
import type { RoadmapRecord } from '@/lib/db/roadmaps'

interface RoadmapCardProps {
  roadmap: RoadmapRecord
  onDelete?: (id: string) => void
}

export default function RoadmapCard({ roadmap, onDelete }: RoadmapCardProps) {
  const statusColors = {
    not_started: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-600',
  }

  const statusLabels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed',
    paused: 'Paused',
    archived: 'Archived',
  }

  const createdDate = new Date(roadmap.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (confirm('Are you sure you want to delete this roadmap? This action cannot be undone.')) {
      onDelete?.(roadmap.id)
    }
  }

  return (
    <Link
      href={`/viewer?roadmapId=${roadmap.id}`}
      className="group block bg-white rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-md transition-all p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {roadmap.title}
          </h3>
        </div>
        <span
          className={`flex-shrink-0 ml-3 px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[roadmap.status]
          }`}
        >
          {statusLabels[roadmap.status]}
        </span>
      </div>

      {/* Goal */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{roadmap.goal}</p>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{roadmap.total_duration_weeks} weeks</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Created {createdDate}</span>
        </div>
      </div>

      {/* Progress Bar (if in progress) */}
      {roadmap.status === 'in_progress' && (
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: '0%' }} // TODO: Calculate actual progress
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleDelete}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Delete
        </button>
        <span className="text-sm text-blue-600 group-hover:text-blue-700 font-medium">
          View Roadmap →
        </span>
      </div>
    </Link>
  )
}
