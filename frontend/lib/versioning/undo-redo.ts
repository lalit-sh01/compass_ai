/**
 * Undo/Redo Logic
 *
 * Applies and reverses edits to roadmaps.
 * Works with edit history to implement undo/redo functionality.
 */

import type { Roadmap } from '../types'
import type { Edit, EditHistory, EditLocation } from './edit-history'
import { getUndoEdit, getRedoEdit, canUndo, canRedo } from './edit-history'

/**
 * Applies an edit to a roadmap (for redo)
 */
export function applyEdit(roadmap: Roadmap, edit: Edit): Roadmap {
  const newRoadmap = JSON.parse(JSON.stringify(roadmap)) // Deep clone

  switch (edit.type) {
    case 'update_deliverable':
      return updateDeliverableInRoadmap(newRoadmap, edit.location, edit.after)

    case 'add_deliverable':
      return addDeliverableToRoadmap(newRoadmap, edit.location, edit.after)

    case 'remove_deliverable':
      return removeDeliverableFromRoadmap(newRoadmap, edit.location)

    case 'update_resource':
      return updateResourceInRoadmap(newRoadmap, edit.location, edit.after)

    case 'add_resource':
      return addResourceToRoadmap(newRoadmap, edit.location, edit.after)

    case 'remove_resource':
      return removeResourceFromRoadmap(newRoadmap, edit.location)

    case 'update_week_title':
      return updateWeekField(newRoadmap, edit.location, 'title', edit.after)

    case 'update_week_theme':
      return updateWeekField(newRoadmap, edit.location, 'theme', edit.after)

    case 'update_hours':
      return updateWeekField(newRoadmap, edit.location, 'totalHours', edit.after)

    case 'toggle_progress':
      return toggleProgressInRoadmap(newRoadmap, edit.location, edit.after)

    case 'reorder_deliverables':
      return reorderDeliverablesInRoadmap(newRoadmap, edit.location, edit.after)

    case 'reorder_resources':
      return reorderResourcesInRoadmap(newRoadmap, edit.location, edit.after)

    default:
      console.warn(`Unknown edit type: ${edit.type}`)
      return roadmap
  }
}

/**
 * Reverses an edit (for undo)
 */
export function reverseEdit(roadmap: Roadmap, edit: Edit): Roadmap {
  const newRoadmap = JSON.parse(JSON.stringify(roadmap)) // Deep clone

  switch (edit.type) {
    case 'update_deliverable':
      return updateDeliverableInRoadmap(newRoadmap, edit.location, edit.before)

    case 'add_deliverable':
      return removeDeliverableFromRoadmap(newRoadmap, edit.location)

    case 'remove_deliverable':
      return addDeliverableToRoadmap(newRoadmap, edit.location, edit.before)

    case 'update_resource':
      return updateResourceInRoadmap(newRoadmap, edit.location, edit.before)

    case 'add_resource':
      return removeResourceFromRoadmap(newRoadmap, edit.location)

    case 'remove_resource':
      return addResourceToRoadmap(newRoadmap, edit.location, edit.before)

    case 'update_week_title':
      return updateWeekField(newRoadmap, edit.location, 'title', edit.before)

    case 'update_week_theme':
      return updateWeekField(newRoadmap, edit.location, 'theme', edit.before)

    case 'update_hours':
      return updateWeekField(newRoadmap, edit.location, 'totalHours', edit.before)

    case 'toggle_progress':
      return toggleProgressInRoadmap(newRoadmap, edit.location, edit.before)

    case 'reorder_deliverables':
      return reorderDeliverablesInRoadmap(newRoadmap, edit.location, edit.before)

    case 'reorder_resources':
      return reorderResourcesInRoadmap(newRoadmap, edit.location, edit.before)

    default:
      console.warn(`Unknown edit type: ${edit.type}`)
      return roadmap
  }
}

/**
 * Performs undo operation
 */
export function performUndo(
  roadmap: Roadmap,
  history: EditHistory
): Roadmap | null {
  if (!canUndo(history)) return null

  const edit = getUndoEdit(history)
  if (!edit) return null

  return reverseEdit(roadmap, edit)
}

/**
 * Performs redo operation
 */
export function performRedo(
  roadmap: Roadmap,
  history: EditHistory
): Roadmap | null {
  if (!canRedo(history)) return null

  const edit = getRedoEdit(history)
  if (!edit) return null

  return applyEdit(roadmap, edit)
}

// ============================================================================
// Helper Functions - Navigate and Update Roadmap
// ============================================================================

/**
 * Finds a week in the roadmap
 */
function findWeek(roadmap: Roadmap, location: EditLocation): any {
  const { phaseNumber, weekNumber } = location

  if (phaseNumber === undefined || weekNumber === undefined) {
    throw new Error('Phase and week number required')
  }

  const phase = roadmap.phases?.find(p => p.phaseNumber === phaseNumber)
  if (!phase) throw new Error(`Phase ${phaseNumber} not found`)

  const week = phase.weeks?.find(w => w.weekNumber === weekNumber)
  if (!week) throw new Error(`Week ${weekNumber} not found`)

  return week
}

/**
 * Updates a deliverable
 */
function updateDeliverableInRoadmap(
  roadmap: Roadmap,
  location: EditLocation,
  value: any
): Roadmap {
  const week = findWeek(roadmap, location)
  const { deliverableIndex } = location

  if (deliverableIndex === undefined) {
    throw new Error('Deliverable index required')
  }

  if (!week.buildSection?.deliverables) {
    throw new Error('Deliverables not found')
  }

  week.buildSection.deliverables[deliverableIndex] = value

  return roadmap
}

/**
 * Adds a deliverable
 */
function addDeliverableToRoadmap(
  roadmap: Roadmap,
  location: EditLocation,
  deliverable: any
): Roadmap {
  const week = findWeek(roadmap, location)

  if (!week.buildSection) {
    week.buildSection = { hours: 0, projectTitle: '', description: '', deliverables: [] }
  }

  if (!week.buildSection.deliverables) {
    week.buildSection.deliverables = []
  }

  const { deliverableIndex } = location
  if (deliverableIndex !== undefined) {
    week.buildSection.deliverables.splice(deliverableIndex, 0, deliverable)
  } else {
    week.buildSection.deliverables.push(deliverable)
  }

  return roadmap
}

/**
 * Removes a deliverable
 */
function removeDeliverableFromRoadmap(
  roadmap: Roadmap,
  location: EditLocation
): Roadmap {
  const week = findWeek(roadmap, location)
  const { deliverableIndex } = location

  if (deliverableIndex === undefined) {
    throw new Error('Deliverable index required')
  }

  if (!week.buildSection?.deliverables) {
    throw new Error('Deliverables not found')
  }

  week.buildSection.deliverables.splice(deliverableIndex, 1)

  return roadmap
}

/**
 * Updates a resource
 */
function updateResourceInRoadmap(
  roadmap: Roadmap,
  location: EditLocation,
  value: any
): Roadmap {
  const week = findWeek(roadmap, location)
  const { topicIndex, resourceIndex } = location

  if (topicIndex === undefined || resourceIndex === undefined) {
    throw new Error('Topic and resource index required')
  }

  if (!week.researchSection?.deepDiveTopics) {
    throw new Error('Topics not found')
  }

  const topic = week.researchSection.deepDiveTopics[topicIndex]
  if (!topic?.suggestedResources) {
    throw new Error('Resources not found')
  }

  topic.suggestedResources[resourceIndex] = value

  return roadmap
}

/**
 * Adds a resource
 */
function addResourceToRoadmap(
  roadmap: Roadmap,
  location: EditLocation,
  resource: any
): Roadmap {
  const week = findWeek(roadmap, location)
  const { topicIndex, resourceIndex } = location

  if (topicIndex === undefined) {
    throw new Error('Topic index required')
  }

  if (!week.researchSection?.deepDiveTopics) {
    throw new Error('Topics not found')
  }

  const topic = week.researchSection.deepDiveTopics[topicIndex]
  if (!topic) {
    throw new Error('Topic not found')
  }

  if (!topic.suggestedResources) {
    topic.suggestedResources = []
  }

  if (resourceIndex !== undefined) {
    topic.suggestedResources.splice(resourceIndex, 0, resource)
  } else {
    topic.suggestedResources.push(resource)
  }

  return roadmap
}

/**
 * Removes a resource
 */
function removeResourceFromRoadmap(
  roadmap: Roadmap,
  location: EditLocation
): Roadmap {
  const week = findWeek(roadmap, location)
  const { topicIndex, resourceIndex } = location

  if (topicIndex === undefined || resourceIndex === undefined) {
    throw new Error('Topic and resource index required')
  }

  if (!week.researchSection?.deepDiveTopics) {
    throw new Error('Topics not found')
  }

  const topic = week.researchSection.deepDiveTopics[topicIndex]
  if (!topic?.suggestedResources) {
    throw new Error('Resources not found')
  }

  topic.suggestedResources.splice(resourceIndex, 1)

  return roadmap
}

/**
 * Updates a week field (title, theme, hours, etc.)
 */
function updateWeekField(
  roadmap: Roadmap,
  location: EditLocation,
  field: string,
  value: any
): Roadmap {
  const week = findWeek(roadmap, location)
  ;(week as any)[field] = value
  return roadmap
}

/**
 * Toggles progress status
 */
function toggleProgressInRoadmap(
  roadmap: Roadmap,
  location: EditLocation,
  value: boolean
): Roadmap {
  const week = findWeek(roadmap, location)
  const { deliverableIndex } = location

  if (deliverableIndex === undefined) {
    throw new Error('Deliverable index required')
  }

  if (!week.buildSection?.deliverables) {
    throw new Error('Deliverables not found')
  }

  week.buildSection.deliverables[deliverableIndex].isCompleted = value

  return roadmap
}

/**
 * Reorders deliverables
 */
function reorderDeliverablesInRoadmap(
  roadmap: Roadmap,
  location: EditLocation,
  newOrder: any[]
): Roadmap {
  const week = findWeek(roadmap, location)

  if (!week.buildSection) {
    throw new Error('Build section not found')
  }

  week.buildSection.deliverables = newOrder

  return roadmap
}

/**
 * Reorders resources
 */
function reorderResourcesInRoadmap(
  roadmap: Roadmap,
  location: EditLocation,
  newOrder: any[]
): Roadmap {
  const week = findWeek(roadmap, location)
  const { topicIndex } = location

  if (topicIndex === undefined) {
    throw new Error('Topic index required')
  }

  if (!week.researchSection?.deepDiveTopics) {
    throw new Error('Topics not found')
  }

  const topic = week.researchSection.deepDiveTopics[topicIndex]
  if (!topic) {
    throw new Error('Topic not found')
  }

  topic.suggestedResources = newOrder

  return roadmap
}
