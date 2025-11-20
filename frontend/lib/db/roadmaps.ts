import { serverApiClient } from '@/lib/api-client-server'
import { getCurrentUser } from './users'
import type { Roadmap } from '@/lib/types'

export interface RoadmapRecord {
  id: string
  user_id: string
  title: string
  goal: string
  status: 'not_started' | 'in_progress' | 'completed' | 'paused' | 'archived'
  original_roadmap: Roadmap
  current_roadmap: Roadmap
  customizations: any
  version: number
  edit_history: any[]
  user_notes: Record<string, any>
  start_date: string | null
  target_end_date: string | null
  total_duration_weeks: number
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  last_viewed_at: string | null
  is_archived: boolean
}

export interface CreateRoadmapInput {
  roadmap: Roadmap
  assessment: any
  gapAnalysis: any
  selectedSkills: string[]
}

/**
 * Creates a new roadmap for the current user
 */
export async function createRoadmap(input: CreateRoadmapInput): Promise<RoadmapRecord> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  return serverApiClient.post<RoadmapRecord>('/api/roadmaps/', input)
}

/**
 * Gets all roadmaps for the current user
 */
export async function getUserRoadmaps(): Promise<RoadmapRecord[]> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  return serverApiClient.get<RoadmapRecord[]>('/api/roadmaps/')
}

/**
 * Gets a single roadmap by ID
 */
export async function getRoadmapById(roadmapId: string): Promise<RoadmapRecord | null> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  try {
    return await serverApiClient.get<RoadmapRecord>(`/api/roadmaps/${roadmapId}`)
  } catch (error) {
    // Handle 404 or other errors
    console.error(`Failed to get roadmap ${roadmapId}:`, error)
    return null
  }
}

/**
 * Updates a roadmap
 */
export async function updateRoadmap(
  roadmapId: string,
  updates: Partial<RoadmapRecord>
): Promise<RoadmapRecord> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  return serverApiClient.patch<RoadmapRecord>(`/api/roadmaps/${roadmapId}`, updates)
}

/**
 * Updates the current roadmap content (creates edit history entry)
 */
export async function updateRoadmapContent(
  roadmapId: string,
  newRoadmap: Roadmap,
  editDescription: string
): Promise<RoadmapRecord> {
  const existing = await getRoadmapById(roadmapId)
  if (!existing) {
    throw new Error('Roadmap not found')
  }

  // Create edit history entry
  const editEntry = {
    timestamp: new Date().toISOString(),
    version: existing.version + 1,
    description: editDescription,
    changes: {
      // Could add diff here if needed
    },
  }

  // Keep only last 50 edits
  const newEditHistory = [...existing.edit_history, editEntry].slice(-50)

  return updateRoadmap(roadmapId, {
    current_roadmap: newRoadmap,
    version: existing.version + 1,
    edit_history: newEditHistory,
  })
}

/**
 * Updates roadmap status
 */
export async function updateRoadmapStatus(
  roadmapId: string,
  status: RoadmapRecord['status']
): Promise<RoadmapRecord> {
  const updates: Partial<RoadmapRecord> = { status }

  // Set timestamps based on status
  if (status === 'in_progress' && !(await getRoadmapById(roadmapId))?.started_at) {
    updates.started_at = new Date().toISOString()
  }
  if (status === 'completed') {
    updates.completed_at = new Date().toISOString()
  }

  return updateRoadmap(roadmapId, updates)
}

/**
 * Archives a roadmap
 */
export async function archiveRoadmap(roadmapId: string): Promise<void> {
  await updateRoadmap(roadmapId, {
    is_archived: true,
    status: 'archived',
  })
}

/**
 * Deletes a roadmap permanently
 */
export async function deleteRoadmap(roadmapId: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  await serverApiClient.delete(`/api/roadmaps/${roadmapId}`)
}

/**
 * Gets roadmap statistics for the current user
 */
export async function getRoadmapStats(): Promise<{
  total: number
  notStarted: number
  inProgress: number
  completed: number
  paused: number
}> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  return serverApiClient.get('/api/roadmaps/stats')
}
