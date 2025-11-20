/**
 * Guardrails System
 *
 * Three-tier guardrail system for roadmap editing:
 * - Tier 1: Structural (cannot override - hard constraints)
 * - Tier 2: Content (can edit with validation)
 * - Tier 3: Quality (warnings only, not blockers)
 */

import type { Roadmap } from '../types'

// ============================================================================
// Tier 1: Structural Guardrails (CANNOT OVERRIDE)
// ============================================================================

export interface StructuralGuardrails {
  totalDurationWeeks: number
  phaseCount: number
  weekNumbers: number[]

  phaseWeekDistribution: {
    min: number // Phase must have ≥ this many weeks
    max: number // Phase must have ≤ this many weeks
  }

  hoursPerWeek: {
    min: number // Must be ≥ this many hours
    max: number // Must be ≤ this many hours
  }
}

export const DEFAULT_STRUCTURAL_GUARDRAILS: StructuralGuardrails = {
  totalDurationWeeks: 0, // Set from original roadmap
  phaseCount: 0, // Set from original roadmap
  weekNumbers: [], // Set from original roadmap

  phaseWeekDistribution: {
    min: 2, // Phases must have at least 2 weeks
    max: 8, // Phases cannot have more than 8 weeks
  },

  hoursPerWeek: {
    min: 5, // Minimum 5 hours per week
    max: 40, // Maximum 40 hours per week
  },
}

/**
 * Extracts structural guardrails from original roadmap
 */
export function extractStructuralGuardrails(
  roadmap: Roadmap
): StructuralGuardrails {
  const weekNumbers: number[] = []

  roadmap.phases?.forEach(phase => {
    phase.weeks?.forEach(week => {
      weekNumbers.push(week.weekNumber)
    })
  })

  return {
    totalDurationWeeks: roadmap.totalDurationWeeks || 0,
    phaseCount: roadmap.phases?.length || 0,
    weekNumbers,
    phaseWeekDistribution: DEFAULT_STRUCTURAL_GUARDRAILS.phaseWeekDistribution,
    hoursPerWeek: DEFAULT_STRUCTURAL_GUARDRAILS.hoursPerWeek,
  }
}

// ============================================================================
// Tier 2: Content Guardrails (CAN EDIT WITH VALIDATION)
// ============================================================================

export interface ContentGuardrails {
  deliverables: {
    minPerWeek: number
    maxPerWeek: number
    requiredFields: string[]
    maxDescriptionLength: number
  }

  resources: {
    minPerTopic: number
    maxPerTopic: number
    urlValidation: boolean
    requiredFields: string[]
  }

  notes: {
    maxLength: number
    allowMarkdown: boolean
  }

  timeAllocation: {
    buildPercentage: { min: number; max: number }
    researchPercentage: { min: number; max: number }
    sharePercentage: { min: number; max: number }
  }

  weekFields: {
    titleMaxLength: number
    themeMaxLength: number
    descriptionMaxLength: number
  }
}

export const DEFAULT_CONTENT_GUARDRAILS: ContentGuardrails = {
  deliverables: {
    minPerWeek: 1, // At least 1 deliverable per week
    maxPerWeek: 10, // Max 10 deliverables per week
    requiredFields: ['description'],
    maxDescriptionLength: 500,
  },

  resources: {
    minPerTopic: 0, // Can remove all (but will get warning)
    maxPerTopic: 20, // Max 20 resources per topic
    urlValidation: true,
    requiredFields: ['title', 'type'],
  },

  notes: {
    maxLength: 5000, // 5000 character limit
    allowMarkdown: true,
  },

  timeAllocation: {
    buildPercentage: { min: 40, max: 80 }, // 40-80% on build
    researchPercentage: { min: 10, max: 40 }, // 10-40% on research
    sharePercentage: { min: 5, max: 25 }, // 5-25% on share
  },

  weekFields: {
    titleMaxLength: 100,
    themeMaxLength: 100,
    descriptionMaxLength: 1000,
  },
}

// ============================================================================
// Tier 3: Quality Guardrails (WARNINGS, NOT BLOCKERS)
// ============================================================================

export interface QualityWarning {
  code: string
  severity: 'warning' | 'info'
  message: string
  suggestion?: string
  location?: {
    phaseNumber?: number
    weekNumber?: number
  }
}

export interface QualityGuardrails {
  warnings: {
    noResources: string
    fewDeliverables: string
    vagueTitles: string
    noSubtasks: string
    skippedWeeks: string
    lowResourceQuality: string
    missingUrls: string
  }

  suggestions: {
    aiEnhancement: boolean
    resourceRecommendations: boolean
    deliverableSuggestions: boolean
  }
}

export const DEFAULT_QUALITY_GUARDRAILS: QualityGuardrails = {
  warnings: {
    noResources: 'Week has no resources - consider adding some',
    fewDeliverables: 'Only 1 deliverable - consider adding 2-3 more for better granularity',
    vagueTitles: 'Title is too generic - be more specific about what you\'ll build',
    noSubtasks: 'Topic has no subtasks - consider breaking it down into smaller steps',
    skippedWeeks: 'You have skipped 3+ weeks - is this intentional?',
    lowResourceQuality: 'Some resources are missing URLs or descriptions',
    missingUrls: 'Resource is missing a URL - add a link for easy access',
  },

  suggestions: {
    aiEnhancement: true,
    resourceRecommendations: true,
    deliverableSuggestions: true,
  },
}

// ============================================================================
// Validation Result Types
// ============================================================================

export interface ValidationError {
  code: string
  severity: 'error' | 'warning' | 'info'
  message: string
  field?: string
  location?: {
    phaseNumber?: number
    weekNumber?: number
    deliverableIndex?: number
    topicIndex?: number
    resourceIndex?: number
  }
  suggestion?: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: QualityWarning[]
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates structural constraints (Tier 1)
 */
export function validateStructuralConstraints(
  roadmap: Roadmap,
  guardrails: StructuralGuardrails
): ValidationError[] {
  const errors: ValidationError[] = []

  // Check total duration hasn't changed
  if (roadmap.totalDurationWeeks !== guardrails.totalDurationWeeks) {
    errors.push({
      code: 'DURATION_CHANGED',
      severity: 'error',
      message: `Total duration cannot be changed. Expected ${guardrails.totalDurationWeeks} weeks.`,
      field: 'totalDurationWeeks',
    })
  }

  // Check phase count hasn't changed
  if (roadmap.phases?.length !== guardrails.phaseCount) {
    errors.push({
      code: 'PHASE_COUNT_CHANGED',
      severity: 'error',
      message: `Phase count cannot be changed. Expected ${guardrails.phaseCount} phases.`,
      field: 'phases',
    })
  }

  // Check week numbers are intact
  const currentWeekNumbers: number[] = []
  roadmap.phases?.forEach(phase => {
    phase.weeks?.forEach(week => {
      currentWeekNumbers.push(week.weekNumber)
    })
  })

  const missingWeeks = guardrails.weekNumbers.filter(
    n => !currentWeekNumbers.includes(n)
  )
  if (missingWeeks.length > 0) {
    errors.push({
      code: 'WEEKS_MISSING',
      severity: 'error',
      message: `Weeks cannot be deleted: ${missingWeeks.join(', ')}`,
      field: 'weeks',
    })
  }

  // Validate hours per week
  roadmap.phases?.forEach((phase, phaseIndex) => {
    phase.weeks?.forEach((week, weekIndex) => {
      if (week.totalHours < guardrails.hoursPerWeek.min) {
        errors.push({
          code: 'HOURS_TOO_LOW',
          severity: 'error',
          message: `Week ${week.weekNumber} has ${week.totalHours} hours. Minimum is ${guardrails.hoursPerWeek.min}.`,
          field: 'totalHours',
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }

      if (week.totalHours > guardrails.hoursPerWeek.max) {
        errors.push({
          code: 'HOURS_TOO_HIGH',
          severity: 'error',
          message: `Week ${week.weekNumber} has ${week.totalHours} hours. Maximum is ${guardrails.hoursPerWeek.max}.`,
          field: 'totalHours',
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }
    })
  })

  return errors
}

/**
 * Validates content constraints (Tier 2)
 */
export function validateContentConstraints(
  roadmap: Roadmap,
  guardrails: ContentGuardrails
): ValidationError[] {
  const errors: ValidationError[] = []

  roadmap.phases?.forEach(phase => {
    phase.weeks?.forEach(week => {
      // Validate deliverables
      const deliverableCount = week.buildSection?.deliverables?.length || 0

      if (deliverableCount < guardrails.deliverables.minPerWeek) {
        errors.push({
          code: 'TOO_FEW_DELIVERABLES',
          severity: 'error',
          message: `Week ${week.weekNumber} has ${deliverableCount} deliverable(s). Minimum is ${guardrails.deliverables.minPerWeek}.`,
          field: 'deliverables',
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }

      if (deliverableCount > guardrails.deliverables.maxPerWeek) {
        errors.push({
          code: 'TOO_MANY_DELIVERABLES',
          severity: 'error',
          message: `Week ${week.weekNumber} has ${deliverableCount} deliverables. Maximum is ${guardrails.deliverables.maxPerWeek}.`,
          field: 'deliverables',
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }

      // Validate each deliverable
      week.buildSection?.deliverables?.forEach((deliverable, index) => {
        if (!deliverable.description || deliverable.description.trim() === '') {
          errors.push({
            code: 'DELIVERABLE_NO_DESCRIPTION',
            severity: 'error',
            message: `Deliverable ${index + 1} in Week ${week.weekNumber} has no description.`,
            field: 'deliverables.description',
            location: {
              phaseNumber: phase.phaseNumber,
              weekNumber: week.weekNumber,
              deliverableIndex: index,
            },
          })
        }

        if (deliverable.description?.length > guardrails.deliverables.maxDescriptionLength) {
          errors.push({
            code: 'DELIVERABLE_DESCRIPTION_TOO_LONG',
            severity: 'error',
            message: `Deliverable description in Week ${week.weekNumber} is too long. Maximum is ${guardrails.deliverables.maxDescriptionLength} characters.`,
            field: 'deliverables.description',
            location: {
              phaseNumber: phase.phaseNumber,
              weekNumber: week.weekNumber,
              deliverableIndex: index,
            },
          })
        }
      })

      // Validate resources
      week.researchSection?.deepDiveTopics?.forEach((topic, topicIndex) => {
        const resourceCount = topic.suggestedResources?.length || 0

        if (resourceCount > guardrails.resources.maxPerTopic) {
          errors.push({
            code: 'TOO_MANY_RESOURCES',
            severity: 'error',
            message: `Topic ${topicIndex + 1} in Week ${week.weekNumber} has ${resourceCount} resources. Maximum is ${guardrails.resources.maxPerTopic}.`,
            field: 'resources',
            location: {
              phaseNumber: phase.phaseNumber,
              weekNumber: week.weekNumber,
              topicIndex,
            },
          })
        }

        // Validate each resource
        topic.suggestedResources?.forEach((resource, resourceIndex) => {
          if (!resource.title || resource.title.trim() === '') {
            errors.push({
              code: 'RESOURCE_NO_TITLE',
              severity: 'error',
              message: `Resource ${resourceIndex + 1} in Week ${week.weekNumber} has no title.`,
              field: 'resources.title',
              location: {
                phaseNumber: phase.phaseNumber,
                weekNumber: week.weekNumber,
                topicIndex,
                resourceIndex,
              },
            })
          }

          if (guardrails.resources.urlValidation && resource.url) {
            if (!isValidUrl(resource.url)) {
              errors.push({
                code: 'RESOURCE_INVALID_URL',
                severity: 'error',
                message: `Resource "${resource.title}" has an invalid URL.`,
                field: 'resources.url',
                location: {
                  phaseNumber: phase.phaseNumber,
                  weekNumber: week.weekNumber,
                  topicIndex,
                  resourceIndex,
                },
                suggestion: 'Ensure URL starts with http:// or https://',
              })
            }
          }
        })
      })

      // Validate week fields
      if (week.title && week.title.length > guardrails.weekFields.titleMaxLength) {
        errors.push({
          code: 'WEEK_TITLE_TOO_LONG',
          severity: 'error',
          message: `Week ${week.weekNumber} title is too long. Maximum is ${guardrails.weekFields.titleMaxLength} characters.`,
          field: 'title',
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }
    })
  })

  return errors
}

/**
 * Generates quality warnings (Tier 3)
 */
export function generateQualityWarnings(
  roadmap: Roadmap,
  guardrails: QualityGuardrails
): QualityWarning[] {
  const warnings: QualityWarning[] = []

  roadmap.phases?.forEach(phase => {
    phase.weeks?.forEach(week => {
      // Check for no resources
      const hasResources = week.researchSection?.deepDiveTopics?.some(
        topic => topic.suggestedResources && topic.suggestedResources.length > 0
      )

      if (!hasResources) {
        warnings.push({
          code: 'NO_RESOURCES',
          severity: 'warning',
          message: guardrails.warnings.noResources,
          suggestion: guardrails.suggestions.resourceRecommendations
            ? 'Use AI to suggest resources for this week'
            : undefined,
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }

      // Check for few deliverables
      const deliverableCount = week.buildSection?.deliverables?.length || 0
      if (deliverableCount === 1) {
        warnings.push({
          code: 'FEW_DELIVERABLES',
          severity: 'info',
          message: guardrails.warnings.fewDeliverables,
          suggestion: guardrails.suggestions.deliverableSuggestions
            ? 'Use AI to suggest more deliverables'
            : undefined,
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }

      // Check for vague titles
      if (week.title && isVagueTitle(week.title)) {
        warnings.push({
          code: 'VAGUE_TITLE',
          severity: 'info',
          message: guardrails.warnings.vagueTitles,
          suggestion: 'Be specific about technologies and outcomes',
          location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
        })
      }

      // Check for missing URLs
      week.researchSection?.deepDiveTopics?.forEach(topic => {
        topic.suggestedResources?.forEach(resource => {
          if (!resource.url || resource.url.trim() === '') {
            warnings.push({
              code: 'MISSING_URL',
              severity: 'warning',
              message: `"${resource.title}": ${guardrails.warnings.missingUrls}`,
              location: { phaseNumber: phase.phaseNumber, weekNumber: week.weekNumber },
            })
          }
        })
      })
    })
  })

  return warnings
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validates if a string is a valid URL
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Checks if a title is too vague
 */
function isVagueTitle(title: string): boolean {
  const vagueWords = [
    'learn',
    'study',
    'basics',
    'introduction',
    'overview',
    'fundamentals',
    'getting started',
  ]

  const lowerTitle = title.toLowerCase()
  return vagueWords.some(word => lowerTitle.includes(word)) && title.split(' ').length < 5
}
