/**
 * Edit Database Operations
 *
 * CRUD operations for roadmap edits and version history.
 * Manages edit_history JSONB array in the roadmaps table.
 */

import { createClientForServer } from '@/lib/supabase/server'
import type { Edit, EditHistory } from '../versioning/edit-history'
import {
  serializeHistory,
  deserializeHistory,
  addEdit as addEditToHistory,
  moveToUndo,
  moveToRedo,
} from '../versioning/edit-history'

/**
 * Gets edit history for a roadmap
 */
export async function getEditHistory(roadmapId: string): Promise<EditHistory> {
  const supabase = await createClientForServer()

  const { data, error } = await supabase
    .from('roadmaps')
    .select('edit_history')
    .eq('id', roadmapId)
    .single()

  if (error) {
    console.error('[EDITS] Error fetching edit history:', error)
    throw new Error('Failed to fetch edit history')
  }

  if (!data || !data.edit_history) {
    return {
      edits: [],
      currentIndex: -1,
      maxSize: 50,
    }
  }

  // edit_history is stored as JSONB array in database
  return deserializeHistory(data.edit_history)
}

/**
 * Appends an edit to the history
 */
export async function appendEdit(
  roadmapId: string,
  edit: Omit<Edit, 'id' | 'timestamp'>
): Promise<EditHistory> {
  const supabase = await createClientForServer()

  // Get current history
  const currentHistory = await getEditHistory(roadmapId)

  // Add new edit
  const updatedHistory = addEditToHistory(currentHistory, edit)

  // Serialize for storage
  const serialized = serializeHistory(updatedHistory)

  // Update database
  const { data, error } = await supabase
    .from('roadmaps')
    .update({
      edit_history: serialized,
      updated_at: new Date().toISOString(),
    })
    .eq('id', roadmapId)
    .select('edit_history')
    .single()

  if (error) {
    console.error('[EDITS] Error appending edit:', error)
    throw new Error('Failed to save edit')
  }

  return deserializeHistory(data.edit_history)
}

/**
 * Performs undo operation (moves current index back)
 */
export async function undoEdit(roadmapId: string): Promise<EditHistory> {
  const supabase = await createClientForServer()

  // Get current history
  const currentHistory = await getEditHistory(roadmapId)

  // Move to undo
  const updatedHistory = moveToUndo(currentHistory)

  // Serialize and save
  const serialized = serializeHistory(updatedHistory)

  const { data, error } = await supabase
    .from('roadmaps')
    .update({
      edit_history: serialized,
      updated_at: new Date().toISOString(),
    })
    .eq('id', roadmapId)
    .select('edit_history')
    .single()

  if (error) {
    console.error('[EDITS] Error undoing edit:', error)
    throw new Error('Failed to undo')
  }

  return deserializeHistory(data.edit_history)
}

/**
 * Performs redo operation (moves current index forward)
 */
export async function redoEdit(roadmapId: string): Promise<EditHistory> {
  const supabase = await createClientForServer()

  // Get current history
  const currentHistory = await getEditHistory(roadmapId)

  // Move to redo
  const updatedHistory = moveToRedo(currentHistory)

  // Serialize and save
  const serialized = serializeHistory(updatedHistory)

  const { data, error } = await supabase
    .from('roadmaps')
    .update({
      edit_history: serialized,
      updated_at: new Date().toISOString(),
    })
    .eq('id', roadmapId)
    .select('edit_history')
    .single()

  if (error) {
    console.error('[EDITS] Error redoing edit:', error)
    throw new Error('Failed to redo')
  }

  return deserializeHistory(data.edit_history)
}

/**
 * Clears all edit history (use with caution)
 */
export async function clearEditHistory(roadmapId: string): Promise<void> {
  const supabase = await createClientForServer()

  const { error } = await supabase
    .from('roadmaps')
    .update({
      edit_history: [],
      updated_at: new Date().toISOString(),
    })
    .eq('id', roadmapId)

  if (error) {
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
  const supabase = await createClientForServer()

  const { error } = await supabase
    .from('roadmaps')
    .update({
      customizations,
      updated_at: new Date().toISOString(),
    })
    .eq('id', roadmapId)

  if (error) {
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
  const supabase = await createClientForServer()

  const { data, error } = await supabase
    .from('roadmaps')
    .select('customizations')
    .eq('id', roadmapId)
    .single()

  if (error) {
    console.error('[EDITS] Error fetching customizations:', error)
    throw new Error('Failed to fetch customizations')
  }

  return data?.customizations || {}
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
