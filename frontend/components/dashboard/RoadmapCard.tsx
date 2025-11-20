'use client'

import Link from 'next/link'
import type { RoadmapRecord } from '@/lib/db/roadmaps'

interface RoadmapCardProps {
  roadmap: RoadmapRecord
  onDelete?: (id: string) => void
}

export default function RoadmapCard({ roadmap, onDelete }: RoadmapCardProps) {
  const statusColors = {
    not_started: 'bg-bg-secondary text-text-secondary',
    in_progress: 'bg-primary/10 text-primary',
    completed: 'bg-green-500/10 text-green-700 dark:text-green-400',
    paused: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    archived: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
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
      className="group block bg-surface rounded-md border border-border hover:border-primary hover:shadow-md transition-all p-[var(--space-6)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
            {roadmap.title}
          </h3>
        </div>
        <span
          className={`flex-shrink-0 ml-3 px-2 py-1 rounded-full text-xs font-medium ${statusColors[roadmap.status]
            }`}
        >
          {statusLabels[roadmap.status]}
        </span>
      </div>

      {/* Goal */}
      <p className="text-sm text-text-secondary line-clamp-2 mb-4">{roadmap.goal}</p>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-xs text-text-tertiary mb-4">
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
          <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: '0%' }} // TODO: Calculate actual progress
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={handleDelete}
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
        >
          Delete
        </button>
        <span className="text-sm text-primary group-hover:text-primary-hover font-medium">
          View Roadmap →
        </span>
      </div>
    </Link>
  )
}
