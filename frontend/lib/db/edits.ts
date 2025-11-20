/**
 * Edit Database Operations
 *
 * CRUD operations for roadmap edits and version history.
 * Manages edit_history JSONB array in the roadmaps table.
 */

import { serverApiClient } from '@/lib/api-client-server'
import type { Edit, EditHistory } from '../versioning/edit-history'
import {
  serializeHistory,
  deserializeHistory,
  addEdit as addEditToHistory,
  moveToUndo,
  moveToRedo,
} from '../versioning/edit-history'
import { RoadmapRecord } from './roadmaps'

/**
 * Gets edit history for a roadmap
 */
export async function getEditHistory(roadmapId: string): Promise<EditHistory> {
  try {
    const roadmap = await serverApiClient.get<RoadmapRecord>(`/api/roadmaps/${roadmapId}`)

    if (!roadmap || !roadmap.edit_history) {
      return {
        edits: [],
        currentIndex: -1,
        maxSize: 50,
      }
    }

    return deserializeHistory(roadmap.edit_history)
  } catch (error) {
    console.error('[EDITS] Error fetching edit history:', error)
    throw new Error('Failed to fetch edit history')
  }
}

/**
 * Appends an edit to the history
 */
export async function appendEdit(
  roadmapId: string,
  edit: Omit<Edit, 'id' | 'timestamp'>
): Promise<EditHistory> {
  // Get current history
  const currentHistory = await getEditHistory(roadmapId)

  // Add new edit
  const updatedHistory = addEditToHistory(currentHistory, edit)

  // Serialize for storage
  const serialized = serializeHistory(updatedHistory)

  // Update database
  try {
    const updatedRoadmap = await serverApiClient.patch<RoadmapRecord>(`/api/roadmaps/${roadmapId}`, {
      edit_history: serialized
    })
    return deserializeHistory(updatedRoadmap.edit_history)
  } catch (error) {
    console.error('[EDITS] Error appending edit:', error)
    throw new Error('Failed to save edit')
  }
}

/**
 * Performs undo operation (moves current index back)
 */
export async function undoEdit(roadmapId: string): Promise<EditHistory> {
  // Get current history
  const currentHistory = await getEditHistory(roadmapId)

  // Move to undo
  const updatedHistory = moveToUndo(currentHistory)

  // Serialize and save
  const serialized = serializeHistory(updatedHistory)

  try {
    const updatedRoadmap = await serverApiClient.patch<RoadmapRecord>(`/api/roadmaps/${roadmapId}`, {
      edit_history: serialized
    })
    return deserializeHistory(updatedRoadmap.edit_history)
  } catch (error) {
    console.error('[EDITS] Error undoing edit:', error)
    throw new Error('Failed to undo')
  }
}

/**
 * Performs redo operation (moves current index forward)
 */
export async function redoEdit(roadmapId: string): Promise<EditHistory> {
  // Get current history
  const currentHistory = await getEditHistory(roadmapId)

  // Move to redo
  const updatedHistory = moveToRedo(currentHistory)

  // Serialize and save
  const serialized = serializeHistory(updatedHistory)

  try {
    const updatedRoadmap = await serverApiClient.patch<RoadmapRecord>(`/api/roadmaps/${roadmapId}`, {
      edit_history: serialized
    })
    return deserializeHistory(updatedRoadmap.edit_history)
  } catch (error) {
    console.error('[EDITS] Error redoing edit:', error)
    throw new Error('Failed to redo')
  }
}

/**
 * Clears all edit history (use with caution)
 */
export async function clearEditHistory(roadmapId: string): Promise<void> {
  try {
    await serverApiClient.patch(`/api/roadmaps/${roadmapId}`, {
      edit_history: []
    })
  } catch (error) {
    console.error('[EDITS] Error clearing edit history:', error)
    throw new Error('Failed to clear edit history')
  }
}

/**
 * Gets edit history count
 */
export async function getEditCount(roadmapId: string): Promise<number> {
  const history = await getEditHistory(roadmapId)
  return history.edits.length
}

/**
 * Updates customizations tracker
 */
export async function updateCustomizations(
  roadmapId: string,
  customizations: Record<string, any>
): Promise<void> {
  try {
    await serverApiClient.patch(`/api/roadmaps/${roadmapId}`, {
      customizations
    })
  } catch (error) {
    console.error('[EDITS] Error updating customizations:', error)
    throw new Error('Failed to update customizations')
  }
}

/**
 * Gets customizations for a roadmap
 */
export async function getCustomizations(
  roadmapId: string
): Promise<Record<string, any>> {
  try {
    const roadmap = await serverApiClient.get<RoadmapRecord>(`/api/roadmaps/${roadmapId}`)
    return roadmap.customizations || {}
  } catch (error) {
    console.error('[EDITS] Error fetching customizations:', error)
    throw new Error('Failed to fetch customizations')
  }
}

/**
 * Marks a field as customized
 */
export async function markFieldAsCustomized(
  roadmapId: string,
  fieldPath: string,
  userId: string
): Promise<void> {
  const customizations = await getCustomizations(roadmapId)

  customizations[fieldPath] = {
    customized: true,
    customizedBy: userId,
    customizedAt: new Date().toISOString(),
  }

  await updateCustomizations(roadmapId, customizations)
}

/**
 * Checks if a field has been customized
 */
export async function isFieldCustomized(
  roadmapId: string,
  fieldPath: string
): Promise<boolean> {
  const customizations = await getCustomizations(roadmapId)
  return customizations[fieldPath]?.customized || false
}

/**
 * Gets stats about edits
 */
export async function getEditStats(roadmapId: string): Promise<{
  totalEdits: number
  canUndo: boolean
  canRedo: boolean
  lastEditAt?: Date
  customizedFieldsCount: number
}> {
  const history = await getEditHistory(roadmapId)
  const customizations = await getCustomizations(roadmapId)

  const lastEdit = history.edits[history.edits.length - 1]

  return {
    totalEdits: history.edits.length,
    canUndo: history.currentIndex >= 0,
    canRedo: history.currentIndex < history.edits.length - 1,
    lastEditAt: lastEdit?.timestamp,
    customizedFieldsCount: Object.keys(customizations).length,
  }
}
