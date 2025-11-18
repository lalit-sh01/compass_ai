import { createServiceClient } from '@/lib/supabase/server'
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

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('roadmaps')
    .insert({
      user_id: user.id,
      title: input.roadmap.title,
      goal: input.roadmap.goal,
      status: 'not_started',
      original_roadmap: input.roadmap,
      current_roadmap: input.roadmap,
      customizations: {},
      version: 1,
      edit_history: [],
      total_duration_weeks: input.roadmap.totalDurationWeeks,
      start_date: input.roadmap.startDate || null,
      target_end_date: input.roadmap.targetEndDate || null,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create roadmap: ${error.message}`)
  }

  // Also create the assessment record
  await supabase.from('assessments').insert({
    user_id: user.id,
    roadmap_id: data.id,
    assessment_data: input.assessment,
    gap_analysis: input.gapAnalysis,
    selected_skills: input.selectedSkills,
  })

  return data
}

/**
 * Gets all roadmaps for the current user
 */
export async function getUserRoadmaps(): Promise<RoadmapRecord[]> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get roadmaps: ${error.message}`)
  }

  return data || []
}

/**
 * Gets a single roadmap by ID
 */
export async function getRoadmapById(roadmapId: string): Promise<RoadmapRecord | null> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('id', roadmapId)
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    throw new Error(`Failed to get roadmap: ${error.message}`)
  }

  // Update last viewed timestamp
  await supabase
    .from('roadmaps')
    .update({ last_viewed_at: new Date().toISOString() })
    .eq('id', roadmapId)

  return data
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

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('roadmaps')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', roadmapId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update roadmap: ${error.message}`)
  }

  return data
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

  const supabase = createServiceClient()

  const { error } = await supabase
    .from('roadmaps')
    .delete()
    .eq('id', roadmapId)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(`Failed to delete roadmap: ${error.message}`)
  }
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

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('roadmaps')
    .select('status')
    .eq('user_id', user.id)
    .eq('is_archived', false)

  if (error) {
    throw new Error(`Failed to get roadmap stats: ${error.message}`)
  }

  const stats = {
    total: data.length,
    notStarted: data.filter((r) => r.status === 'not_started').length,
    inProgress: data.filter((r) => r.status === 'in_progress').length,
    completed: data.filter((r) => r.status === 'completed').length,
    paused: data.filter((r) => r.status === 'paused').length,
  }

  return stats
}
