'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RoadmapCard from './RoadmapCard'
import type { RoadmapRecord } from '@/lib/db/roadmaps'

interface RoadmapGridProps {
  roadmaps: RoadmapRecord[]
}

export default function RoadmapGrid({ roadmaps: initialRoadmaps }: RoadmapGridProps) {
  const router = useRouter()
  const [roadmaps, setRoadmaps] = useState(initialRoadmaps)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setIsDeleting(id)

    try {
      const response = await fetch(`/api/roadmaps/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete roadmap')
      }

      // Remove from local state
      setRoadmaps(roadmaps.filter((r) => r.id !== id))

      // Refresh the page to update stats
      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete roadmap. Please try again.')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roadmaps.map((roadmap) => (
        <div key={roadmap.id} className={isDeleting === roadmap.id ? 'opacity-50' : ''}>
          <RoadmapCard roadmap={roadmap} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  )
}
