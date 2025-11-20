/**
 * Notes Database Operations
 *
 * CRUD operations for user notes on roadmap entities.
 * Notes are stored in user_notes JSONB column keyed by entity ID.
 */

import { serverApiClient } from '@/lib/api-client-server'
import { sanitizeNote } from '../validation/sanitizers'
import { RoadmapRecord } from './roadmaps'

export interface Note {
  entityId: string // e.g., "w1", "w1-t1", "w1-d1"
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface NotesMap {
  [entityId: string]: Note
}

/**
 * Gets all notes for a roadmap
 */
export async function getAllNotes(roadmapId: string): Promise<NotesMap> {
  try {
    const roadmap = await serverApiClient.get<RoadmapRecord>(`/api/roadmaps/${roadmapId}`)

    if (!roadmap || !roadmap.user_notes) {
      return {}
    }

    // Convert stored format to Note objects
    const notesMap: NotesMap = {}
    Object.entries(roadmap.user_notes).forEach(([entityId, noteData]: [string, any]) => {
      notesMap[entityId] = {
        entityId,
        content: noteData.content || '',
        createdAt: new Date(noteData.createdAt),
        updatedAt: new Date(noteData.updatedAt),
      }
    })

    return notesMap
  } catch (error) {
    console.error('[NOTES] Error fetching notes:', error)
    throw new Error('Failed to fetch notes')
  }
}

/**
 * Gets a note for a specific entity
 */
export async function getNote(
  roadmapId: string,
  entityId: string
): Promise<Note | null> {
  const notes = await getAllNotes(roadmapId)
  return notes[entityId] || null
}

/**
 * Creates or updates a note
 */
export async function upsertNote(
  roadmapId: string,
  entityId: string,
  content: string,
  allowMarkdown: boolean = true
): Promise<Note> {
  // Sanitize content
  const sanitizedContent = sanitizeNote(content, allowMarkdown)

  // Get existing notes
  const existingNotes = await getAllNotes(roadmapId)

  // Create or update note
  const now = new Date()
  const existingNote = existingNotes[entityId]

  const note: Note = {
    entityId,
    content: sanitizedContent,
    createdAt: existingNote?.createdAt || now,
    updatedAt: now,
  }

  // Update notes map
  const updatedNotes = {
    ...existingNotes,
    [entityId]: {
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    },
  }

  // Save to database
  try {
    await serverApiClient.patch(`/api/roadmaps/${roadmapId}`, {
      user_notes: updatedNotes
    })
    return note
  } catch (error) {
    console.error('[NOTES] Error upserting note:', error)
    throw new Error('Failed to save note')
  }
}

/**
 * Deletes a note
 */
export async function deleteNote(
  roadmapId: string,
  entityId: string
): Promise<void> {
  // Get existing notes
  const existingNotes = await getAllNotes(roadmapId)

  // Remove the note
  const { [entityId]: removed, ...remainingNotes } = existingNotes

  // Convert to storage format
  const updatedNotes: Record<string, any> = {}
  Object.entries(remainingNotes).forEach(([id, note]) => {
    updatedNotes[id] = {
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    }
  })

  // Save to database
  try {
    await serverApiClient.patch(`/api/roadmaps/${roadmapId}`, {
      user_notes: updatedNotes
    })
  } catch (error) {
    console.error('[NOTES] Error deleting note:', error)
    throw new Error('Failed to delete note')
  }
}

/**
 * Gets notes for a specific week
 */
export async function getWeekNotes(
  roadmapId: string,
  weekNumber: number
): Promise<NotesMap> {
  const allNotes = await getAllNotes(roadmapId)
  const weekPrefix = `w${weekNumber}`

  const weekNotes: NotesMap = {}
  Object.entries(allNotes).forEach(([entityId, note]) => {
    if (entityId.startsWith(weekPrefix)) {
      weekNotes[entityId] = note
    }
  })

  return weekNotes
}

/**
 * Deletes all notes for a week
 */
export async function deleteWeekNotes(
  roadmapId: string,
  weekNumber: number
): Promise<void> {
  const allNotes = await getAllNotes(roadmapId)
  const weekPrefix = `w${weekNumber}`

  // Filter out week notes
  const remainingNotes: NotesMap = {}
  Object.entries(allNotes).forEach(([entityId, note]) => {
    if (!entityId.startsWith(weekPrefix)) {
      remainingNotes[entityId] = note
    }
  })

  // Convert to storage format
  const updatedNotes: Record<string, any> = {}
  Object.entries(remainingNotes).forEach(([id, note]) => {
    updatedNotes[id] = {
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    }
  })

  // Save to database
  try {
    await serverApiClient.patch(`/api/roadmaps/${roadmapId}`, {
      user_notes: updatedNotes
    })
  } catch (error) {
    console.error('[NOTES] Error deleting week notes:', error)
    throw new Error('Failed to delete week notes')
  }
}

/**
 * Gets count of notes for a roadmap
 */
export async function getNotesCount(roadmapId: string): Promise<number> {
  const notes = await getAllNotes(roadmapId)
  return Object.keys(notes).length
}

/**
 * Checks if an entity has a note
 */
export async function hasNote(
  roadmapId: string,
  entityId: string
): Promise<boolean> {
  const note = await getNote(roadmapId, entityId)
  return note !== null && note.content.trim() !== ''
}

/**
 * Gets stats about notes
 */
export async function getNotesStats(roadmapId: string): Promise<{
  totalNotes: number
  weekNotes: number
  topicNotes: number
  deliverableNotes: number
  lastUpdatedAt?: Date
}> {
  const notes = await getAllNotes(roadmapId)

  let weekNotes = 0
  let topicNotes = 0
  let deliverableNotes = 0
  let lastUpdatedAt: Date | undefined

  Object.entries(notes).forEach(([entityId, note]) => {
    // Count by type
    if (entityId.match(/^w\d+$/)) {
      weekNotes++
    } else if (entityId.match(/^w\d+-t\d+$/)) {
      topicNotes++
    } else if (entityId.match(/^w\d+-d\d+$/)) {
      deliverableNotes++
    }

    // Track latest update
    if (!lastUpdatedAt || note.updatedAt > lastUpdatedAt) {
      lastUpdatedAt = note.updatedAt
    }
  })

  return {
    totalNotes: Object.keys(notes).length,
    weekNotes,
    topicNotes,
    deliverableNotes,
    lastUpdatedAt,
  }
}

/**
 * Bulk upsert notes
 */
export async function bulkUpsertNotes(
  roadmapId: string,
  notes: Array<{ entityId: string; content: string }>,
  allowMarkdown: boolean = true
): Promise<void> {
  // Get existing notes
  const existingNotes = await getAllNotes(roadmapId)

  // Update with new notes
  const now = new Date()
  const updatedNotes: Record<string, any> = {}

  // Keep existing notes
  Object.entries(existingNotes).forEach(([id, note]) => {
    updatedNotes[id] = {
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    }
  })

  // Add/update new notes
  notes.forEach(({ entityId, content }) => {
    const sanitizedContent = sanitizeNote(content, allowMarkdown)
    const existingNote = existingNotes[entityId]

    updatedNotes[entityId] = {
      content: sanitizedContent,
      createdAt: existingNote?.createdAt.toISOString() || now.toISOString(),
      updatedAt: now.toISOString(),
    }
  })

  // Save to database
  try {
    await serverApiClient.patch(`/api/roadmaps/${roadmapId}`, {
      user_notes: updatedNotes
    })
  } catch (error) {
    console.error('[NOTES] Error bulk upserting notes:', error)
    throw new Error('Failed to bulk save notes')
  }
}
