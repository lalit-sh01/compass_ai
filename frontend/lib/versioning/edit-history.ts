/**
 * Edit History Management
 *
 * Tracks all edits made to a roadmap for undo/redo functionality.
 * Maintains a rolling history of the last 50 edits.
 */

import type { Roadmap } from '../types'

export type EditType =
  | 'update_deliverable'
  | 'add_deliverable'
  | 'remove_deliverable'
  | 'update_resource'
  | 'add_resource'
  | 'remove_resource'
  | 'update_week_title'
  | 'update_week_theme'
  | 'update_hours'
  | 'add_note'
  | 'update_note'
  | 'remove_note'
  | 'skip_week'
  | 'unskip_week'
  | 'hide_week'
  | 'unhide_week'
  | 'toggle_progress'
  | 'reorder_deliverables'
  | 'reorder_resources'
  | 'bulk_operation'

export interface EditLocation {
  phaseNumber?: number
  weekNumber?: number
  sectionType?: 'build' | 'research' | 'share'
  topicIndex?: number
  deliverableIndex?: number
  resourceIndex?: number
  subtaskIndex?: number
  entityId?: string // For notes: "w1", "w1-t1", "w1-d1", etc.
}

export interface Edit {
  id: string
  timestamp: Date
  type: EditType
  location: EditLocation

  // Before/after state for undo/redo
  before: any
  after: any

  // Metadata
  description: string // Human-readable description
  userId?: string
}

export interface EditHistory {
  edits: Edit[]
  currentIndex: number // Points to the current state in history
  maxSize: number // Max edits to keep (default 50)
}

/**
 * Creates a new edit history
 */
export function createEditHistory(maxSize: number = 50): EditHistory {
  return {
    edits: [],
    currentIndex: -1,
    maxSize,
  }
}

/**
 * Adds an edit to the history
 * If we're not at the end of history (user undid some actions),
 * this will discard all "future" edits
 */
export function addEdit(
  history: EditHistory,
  edit: Omit<Edit, 'id' | 'timestamp'>
): EditHistory {
  const newEdit: Edit = {
    ...edit,
    id: generateEditId(),
    timestamp: new Date(),
  }

  // If we're not at the end of history, discard future edits
  const edits = history.edits.slice(0, history.currentIndex + 1)

  // Add new edit
  edits.push(newEdit)

  // Keep only last N edits
  const trimmedEdits = edits.slice(-history.maxSize)

  return {
    ...history,
    edits: trimmedEdits,
    currentIndex: trimmedEdits.length - 1,
  }
}

/**
 * Checks if we can undo
 */
export function canUndo(history: EditHistory): boolean {
  return history.currentIndex >= 0
}

/**
 * Checks if we can redo
 */
export function canRedo(history: EditHistory): boolean {
  return history.currentIndex < history.edits.length - 1
}

/**
 * Gets the edit to undo (current edit)
 */
export function getUndoEdit(history: EditHistory): Edit | null {
  if (!canUndo(history)) return null
  return history.edits[history.currentIndex] || null
}

/**
 * Gets the edit to redo (next edit)
 */
export function getRedoEdit(history: EditHistory): Edit | null {
  if (!canRedo(history)) return null
  return history.edits[history.currentIndex + 1] || null
}

/**
 * Moves the current index back (undo)
 */
export function moveToUndo(history: EditHistory): EditHistory {
  if (!canUndo(history)) return history

  return {
    ...history,
    currentIndex: history.currentIndex - 1,
  }
}

/**
 * Moves the current index forward (redo)
 */
export function moveToRedo(history: EditHistory): EditHistory {
  if (!canRedo(history)) return history

  return {
    ...history,
    currentIndex: history.currentIndex + 1,
  }
}

/**
 * Gets all edits in chronological order
 */
export function getAllEdits(history: EditHistory): Edit[] {
  return [...history.edits]
}

/**
 * Gets recent edits (last N)
 */
export function getRecentEdits(history: EditHistory, count: number = 10): Edit[] {
  return history.edits.slice(-count)
}

/**
 * Finds edits by location
 */
export function findEditsByLocation(
  history: EditHistory,
  location: Partial<EditLocation>
): Edit[] {
  return history.edits.filter(edit => {
    return Object.keys(location).every(key => {
      const locationKey = key as keyof EditLocation
      return edit.location[locationKey] === location[locationKey]
    })
  })
}

/**
 * Finds edits by type
 */
export function findEditsByType(
  history: EditHistory,
  type: EditType
): Edit[] {
  return history.edits.filter(edit => edit.type === type)
}

/**
 * Exports history as JSON
 */
export function exportHistory(history: EditHistory): string {
  return JSON.stringify(history, null, 2)
}

/**
 * Imports history from JSON
 */
export function importHistory(json: string): EditHistory {
  const parsed = JSON.parse(json)

  // Convert timestamp strings back to Date objects
  parsed.edits = parsed.edits.map((edit: any) => ({
    ...edit,
    timestamp: new Date(edit.timestamp),
  }))

  return parsed
}

/**
 * Generates a unique edit ID
 */
function generateEditId(): string {
  return `edit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Creates a human-readable description for an edit
 */
export function createEditDescription(type: EditType, location: EditLocation): string {
  const weekStr = location.weekNumber ? `Week ${location.weekNumber}` : ''

  switch (type) {
    case 'add_deliverable':
      return `Added deliverable to ${weekStr}`
    case 'update_deliverable':
      return `Updated deliverable in ${weekStr}`
    case 'remove_deliverable':
      return `Removed deliverable from ${weekStr}`
    case 'add_resource':
      return `Added resource to ${weekStr}`
    case 'update_resource':
      return `Updated resource in ${weekStr}`
    case 'remove_resource':
      return `Removed resource from ${weekStr}`
    case 'update_week_title':
      return `Changed title for ${weekStr}`
    case 'update_week_theme':
      return `Changed theme for ${weekStr}`
    case 'update_hours':
      return `Updated hours for ${weekStr}`
    case 'add_note':
      return `Added note to ${location.entityId || weekStr}`
    case 'update_note':
      return `Updated note for ${location.entityId || weekStr}`
    case 'remove_note':
      return `Removed note from ${location.entityId || weekStr}`
    case 'skip_week':
      return `Skipped ${weekStr}`
    case 'unskip_week':
      return `Un-skipped ${weekStr}`
    case 'hide_week':
      return `Hid ${weekStr}`
    case 'unhide_week':
      return `Un-hid ${weekStr}`
    case 'toggle_progress':
      return `Toggled completion status in ${weekStr}`
    case 'reorder_deliverables':
      return `Reordered deliverables in ${weekStr}`
    case 'reorder_resources':
      return `Reordered resources in ${weekStr}`
    case 'bulk_operation':
      return `Bulk operation in ${weekStr}`
    default:
      return `Edit in ${weekStr}`
  }
}

/**
 * Serializes history for database storage
 */
export function serializeHistory(history: EditHistory): any[] {
  return history.edits.map(edit => ({
    id: edit.id,
    timestamp: edit.timestamp.toISOString(),
    type: edit.type,
    location: edit.location,
    before: edit.before,
    after: edit.after,
    description: edit.description,
    userId: edit.userId,
  }))
}

/**
 * Deserializes history from database
 */
export function deserializeHistory(data: any[]): EditHistory {
  const edits: Edit[] = data.map(item => ({
    id: item.id,
    timestamp: new Date(item.timestamp),
    type: item.type,
    location: item.location,
    before: item.before,
    after: item.after,
    description: item.description,
    userId: item.userId,
  }))

  return {
    edits,
    currentIndex: edits.length - 1,
    maxSize: 50,
  }
}
