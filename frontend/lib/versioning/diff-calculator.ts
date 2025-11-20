/**
 * Diff Calculator
 *
 * Calculates differences between two roadmap states.
 * Used for displaying what changed in edit history.
 */

import type { Roadmap } from '../types'

export type DiffType = 'added' | 'removed' | 'modified' | 'unchanged'

export interface Diff {
  type: DiffType
  path: string // JSON path to the changed field (e.g., "phases[0].weeks[0].title")
  before: any
  after: any
  description: string
}

export interface RoadmapDiff {
  hasChanges: boolean
  diffs: Diff[]
  summary: {
    added: number
    removed: number
    modified: number
  }
}

/**
 * Calculates diff between two roadmaps
 */
export function calculateRoadmapDiff(
  before: Roadmap,
  after: Roadmap
): RoadmapDiff {
  const diffs: Diff[] = []

  // Compare top-level fields
  if (before.title !== after.title) {
    diffs.push({
      type: 'modified',
      path: 'title',
      before: before.title,
      after: after.title,
      description: `Title changed from "${before.title}" to "${after.title}"`,
    })
  }

  if (before.goal !== after.goal) {
    diffs.push({
      type: 'modified',
      path: 'goal',
      before: before.goal,
      after: after.goal,
      description: 'Goal updated',
    })
  }

  // Compare phases and weeks
  before.phases?.forEach((beforePhase, phaseIndex) => {
    const afterPhase = after.phases?.[phaseIndex]
    if (!afterPhase) return

    beforePhase.weeks?.forEach((beforeWeek, weekIndex) => {
      const afterWeek = afterPhase.weeks?.[weekIndex]
      if (!afterWeek) return

      const weekPath = `phases[${phaseIndex}].weeks[${weekIndex}]`

      // Compare week title
      if (beforeWeek.title !== afterWeek.title) {
        diffs.push({
          type: 'modified',
          path: `${weekPath}.title`,
          before: beforeWeek.title,
          after: afterWeek.title,
          description: `Week ${beforeWeek.weekNumber} title changed`,
        })
      }

      // Compare theme
      if (beforeWeek.theme !== afterWeek.theme) {
        diffs.push({
          type: 'modified',
          path: `${weekPath}.theme`,
          before: beforeWeek.theme,
          after: afterWeek.theme,
          description: `Week ${beforeWeek.weekNumber} theme changed`,
        })
      }

      // Compare hours
      if (beforeWeek.totalHours !== afterWeek.totalHours) {
        diffs.push({
          type: 'modified',
          path: `${weekPath}.totalHours`,
          before: beforeWeek.totalHours,
          after: afterWeek.totalHours,
          description: `Week ${beforeWeek.weekNumber} hours changed from ${beforeWeek.totalHours} to ${afterWeek.totalHours}`,
        })
      }

      // Compare deliverables
      const deliverableDiffs = compareDeliverables(
        beforeWeek.buildSection?.deliverables || [],
        afterWeek.buildSection?.deliverables || [],
        `${weekPath}.buildSection.deliverables`,
        beforeWeek.weekNumber
      )
      diffs.push(...deliverableDiffs)

      // Compare resources
      const resourceDiffs = compareResources(
        beforeWeek.researchSection?.deepDiveTopics || [],
        afterWeek.researchSection?.deepDiveTopics || [],
        `${weekPath}.researchSection.deepDiveTopics`,
        beforeWeek.weekNumber
      )
      diffs.push(...resourceDiffs)
    })
  })

  const summary = {
    added: diffs.filter(d => d.type === 'added').length,
    removed: diffs.filter(d => d.type === 'removed').length,
    modified: diffs.filter(d => d.type === 'modified').length,
  }

  return {
    hasChanges: diffs.length > 0,
    diffs,
    summary,
  }
}

/**
 * Compares two arrays of deliverables
 */
function compareDeliverables(
  before: any[],
  after: any[],
  basePath: string,
  weekNumber: number
): Diff[] {
  const diffs: Diff[] = []

  // Find added deliverables
  after.forEach((afterItem, index) => {
    const beforeItem = before[index]

    if (!beforeItem) {
      diffs.push({
        type: 'added',
        path: `${basePath}[${index}]`,
        before: null,
        after: afterItem,
        description: `Added deliverable in Week ${weekNumber}: "${afterItem.description}"`,
      })
    } else if (afterItem.description !== beforeItem.description) {
      diffs.push({
        type: 'modified',
        path: `${basePath}[${index}].description`,
        before: beforeItem.description,
        after: afterItem.description,
        description: `Modified deliverable in Week ${weekNumber}`,
      })
    } else if (afterItem.isCompleted !== beforeItem.isCompleted) {
      diffs.push({
        type: 'modified',
        path: `${basePath}[${index}].isCompleted`,
        before: beforeItem.isCompleted,
        after: afterItem.isCompleted,
        description: `Toggled completion for deliverable in Week ${weekNumber}`,
      })
    }
  })

  // Find removed deliverables
  before.forEach((beforeItem, index) => {
    if (index >= after.length) {
      diffs.push({
        type: 'removed',
        path: `${basePath}[${index}]`,
        before: beforeItem,
        after: null,
        description: `Removed deliverable from Week ${weekNumber}: "${beforeItem.description}"`,
      })
    }
  })

  return diffs
}

/**
 * Compares deep dive topics and their resources
 */
function compareResources(
  before: any[],
  after: any[],
  basePath: string,
  weekNumber: number
): Diff[] {
  const diffs: Diff[] = []

  after.forEach((afterTopic, topicIndex) => {
    const beforeTopic = before[topicIndex]

    if (!beforeTopic) {
      diffs.push({
        type: 'added',
        path: `${basePath}[${topicIndex}]`,
        before: null,
        after: afterTopic,
        description: `Added topic in Week ${weekNumber}`,
      })
      return
    }

    // Compare topic description
    if (afterTopic.description !== beforeTopic.description) {
      diffs.push({
        type: 'modified',
        path: `${basePath}[${topicIndex}].description`,
        before: beforeTopic.description,
        after: afterTopic.description,
        description: `Modified topic description in Week ${weekNumber}`,
      })
    }

    // Compare resources
    const afterResources = afterTopic.suggestedResources || []
    const beforeResources = beforeTopic.suggestedResources || []

    afterResources.forEach((afterRes: any, resIndex: number) => {
      const beforeRes = beforeResources[resIndex]

      if (!beforeRes) {
        diffs.push({
          type: 'added',
          path: `${basePath}[${topicIndex}].suggestedResources[${resIndex}]`,
          before: null,
          after: afterRes,
          description: `Added resource in Week ${weekNumber}: "${afterRes.title}"`,
        })
      } else if (
        afterRes.title !== beforeRes.title ||
        afterRes.url !== beforeRes.url
      ) {
        diffs.push({
          type: 'modified',
          path: `${basePath}[${topicIndex}].suggestedResources[${resIndex}]`,
          before: beforeRes,
          after: afterRes,
          description: `Modified resource in Week ${weekNumber}`,
        })
      }
    })

    // Find removed resources
    beforeResources.forEach((beforeRes: any, resIndex: number) => {
      if (resIndex >= afterResources.length) {
        diffs.push({
          type: 'removed',
          path: `${basePath}[${topicIndex}].suggestedResources[${resIndex}]`,
          before: beforeRes,
          after: null,
          description: `Removed resource from Week ${weekNumber}: "${beforeRes.title}"`,
        })
      }
    })
  })

  // Find removed topics
  before.forEach((beforeTopic, topicIndex) => {
    if (topicIndex >= after.length) {
      diffs.push({
        type: 'removed',
        path: `${basePath}[${topicIndex}]`,
        before: beforeTopic,
        after: null,
        description: `Removed topic from Week ${weekNumber}`,
      })
    }
  })

  return diffs
}

/**
 * Creates a summary text from diffs
 */
export function summarizeDiff(diff: RoadmapDiff): string {
  if (!diff.hasChanges) {
    return 'No changes'
  }

  const parts = []
  if (diff.summary.added > 0) {
    parts.push(`${diff.summary.added} added`)
  }
  if (diff.summary.modified > 0) {
    parts.push(`${diff.summary.modified} modified`)
  }
  if (diff.summary.removed > 0) {
    parts.push(`${diff.summary.removed} removed`)
  }

  return parts.join(', ')
}

/**
 * Formats a diff for display
 */
export function formatDiff(diff: Diff): string {
  switch (diff.type) {
    case 'added':
      return `+ ${diff.description}`
    case 'removed':
      return `- ${diff.description}`
    case 'modified':
      return `~ ${diff.description}`
    default:
      return diff.description
  }
}
