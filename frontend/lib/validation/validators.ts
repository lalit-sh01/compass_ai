/**
 * Validators
 *
 * High-level validation functions that combine guardrails
 * to provide comprehensive roadmap validation.
 */

import type { Roadmap } from '../types'
import {
  type StructuralGuardrails,
  type ContentGuardrails,
  type QualityGuardrails,
  type ValidationResult,
  type ValidationError,
  extractStructuralGuardrails,
  validateStructuralConstraints,
  validateContentConstraints,
  generateQualityWarnings,
  DEFAULT_CONTENT_GUARDRAILS,
  DEFAULT_QUALITY_GUARDRAILS,
} from './guardrails'

/**
 * Validates an entire roadmap against all guardrails
 */
export function validateRoadmap(
  roadmap: Roadmap,
  originalRoadmap: Roadmap,
  options?: {
    includeWarnings?: boolean
    strictMode?: boolean
  }
): ValidationResult {
  const includeWarnings = options?.includeWarnings ?? true
  const strictMode = options?.strictMode ?? false

  // Extract structural guardrails from original roadmap
  const structuralGuardrails = extractStructuralGuardrails(originalRoadmap)

  // Run all validations
  const structuralErrors = validateStructuralConstraints(roadmap, structuralGuardrails)
  const contentErrors = validateContentConstraints(roadmap, DEFAULT_CONTENT_GUARDRAILS)
  const qualityWarnings = includeWarnings
    ? generateQualityWarnings(roadmap, DEFAULT_QUALITY_GUARDRAILS)
    : []

  // Combine all errors
  const errors = [...structuralErrors, ...contentErrors]

  // In strict mode, treat warnings as errors
  if (strictMode) {
    qualityWarnings.forEach(warning => {
      errors.push({
        code: warning.code,
        severity: 'warning',
        message: warning.message,
        location: warning.location,
        suggestion: warning.suggestion,
      })
    })
  }

  return {
    valid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
    warnings: qualityWarnings,
  }
}

/**
 * Validates a single field edit before applying
 */
export function validateFieldEdit(
  field: string,
  value: any,
  context: {
    roadmap: Roadmap
    originalRoadmap: Roadmap
    phaseNumber?: number
    weekNumber?: number
  }
): ValidationResult {
  const errors: ValidationError[] = []

  switch (field) {
    case 'title':
      if (typeof value !== 'string' || value.trim() === '') {
        errors.push({
          code: 'TITLE_REQUIRED',
          severity: 'error',
          message: 'Title cannot be empty',
          field: 'title',
        })
      } else if (value.length > DEFAULT_CONTENT_GUARDRAILS.weekFields.titleMaxLength) {
        errors.push({
          code: 'TITLE_TOO_LONG',
          severity: 'error',
          message: `Title must be ${DEFAULT_CONTENT_GUARDRAILS.weekFields.titleMaxLength} characters or less`,
          field: 'title',
        })
      }
      break

    case 'theme':
      if (value && value.length > DEFAULT_CONTENT_GUARDRAILS.weekFields.themeMaxLength) {
        errors.push({
          code: 'THEME_TOO_LONG',
          severity: 'error',
          message: `Theme must be ${DEFAULT_CONTENT_GUARDRAILS.weekFields.themeMaxLength} characters or less`,
          field: 'theme',
        })
      }
      break

    case 'totalHours':
      const structuralGuardrails = extractStructuralGuardrails(context.originalRoadmap)
      if (typeof value !== 'number') {
        errors.push({
          code: 'HOURS_INVALID',
          severity: 'error',
          message: 'Hours must be a number',
          field: 'totalHours',
        })
      } else if (value < structuralGuardrails.hoursPerWeek.min) {
        errors.push({
          code: 'HOURS_TOO_LOW',
          severity: 'error',
          message: `Hours must be at least ${structuralGuardrails.hoursPerWeek.min}`,
          field: 'totalHours',
        })
      } else if (value > structuralGuardrails.hoursPerWeek.max) {
        errors.push({
          code: 'HOURS_TOO_HIGH',
          severity: 'error',
          message: `Hours cannot exceed ${structuralGuardrails.hoursPerWeek.max}`,
          field: 'totalHours',
        })
      }
      break

    case 'deliverable.description':
      if (typeof value !== 'string' || value.trim() === '') {
        errors.push({
          code: 'DELIVERABLE_DESCRIPTION_REQUIRED',
          severity: 'error',
          message: 'Deliverable description cannot be empty',
          field: 'deliverable.description',
        })
      } else if (value.length > DEFAULT_CONTENT_GUARDRAILS.deliverables.maxDescriptionLength) {
        errors.push({
          code: 'DELIVERABLE_DESCRIPTION_TOO_LONG',
          severity: 'error',
          message: `Description must be ${DEFAULT_CONTENT_GUARDRAILS.deliverables.maxDescriptionLength} characters or less`,
          field: 'deliverable.description',
        })
      }
      break

    case 'resource.title':
      if (typeof value !== 'string' || value.trim() === '') {
        errors.push({
          code: 'RESOURCE_TITLE_REQUIRED',
          severity: 'error',
          message: 'Resource title cannot be empty',
          field: 'resource.title',
        })
      }
      break

    case 'resource.url':
      if (value && typeof value === 'string') {
        try {
          const url = new URL(value)
          if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            errors.push({
              code: 'RESOURCE_URL_INVALID',
              severity: 'error',
              message: 'URL must start with http:// or https://',
              field: 'resource.url',
            })
          }
        } catch {
          errors.push({
            code: 'RESOURCE_URL_MALFORMED',
            severity: 'error',
            message: 'URL is not valid',
            field: 'resource.url',
            suggestion: 'Ensure URL is properly formatted (e.g., https://example.com)',
          })
        }
      }
      break

    case 'note':
      if (value && typeof value === 'string') {
        if (value.length > DEFAULT_CONTENT_GUARDRAILS.notes.maxLength) {
          errors.push({
            code: 'NOTE_TOO_LONG',
            severity: 'error',
            message: `Note must be ${DEFAULT_CONTENT_GUARDRAILS.notes.maxLength} characters or less`,
            field: 'note',
          })
        }
      }
      break

    default:
      // Unknown field - allow but warn
      errors.push({
        code: 'UNKNOWN_FIELD',
        severity: 'warning',
        message: `Editing field "${field}" - validation skipped`,
        field,
      })
  }

  return {
    valid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
    warnings: [],
  }
}

/**
 * Validates deliverables count for a week
 */
export function validateDeliverablesCount(
  count: number,
  guardrails: ContentGuardrails = DEFAULT_CONTENT_GUARDRAILS
): ValidationResult {
  const errors: ValidationError[] = []

  if (count < guardrails.deliverables.minPerWeek) {
    errors.push({
      code: 'TOO_FEW_DELIVERABLES',
      severity: 'error',
      message: `Must have at least ${guardrails.deliverables.minPerWeek} deliverable(s)`,
      field: 'deliverables',
    })
  }

  if (count > guardrails.deliverables.maxPerWeek) {
    errors.push({
      code: 'TOO_MANY_DELIVERABLES',
      severity: 'error',
      message: `Cannot have more than ${guardrails.deliverables.maxPerWeek} deliverables`,
      field: 'deliverables',
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: [],
  }
}

/**
 * Validates resources count for a topic
 */
export function validateResourcesCount(
  count: number,
  guardrails: ContentGuardrails = DEFAULT_CONTENT_GUARDRAILS
): ValidationResult {
  const errors: ValidationError[] = []

  if (count > guardrails.resources.maxPerTopic) {
    errors.push({
      code: 'TOO_MANY_RESOURCES',
      severity: 'error',
      message: `Cannot have more than ${guardrails.resources.maxPerTopic} resources`,
      field: 'resources',
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: [],
  }
}

/**
 * Validates time allocation for a week
 */
export function validateTimeAllocation(
  buildHours: number,
  researchHours: number,
  shareHours: number,
  totalHours: number,
  guardrails: ContentGuardrails = DEFAULT_CONTENT_GUARDRAILS
): ValidationResult {
  const errors: ValidationError[] = []

  // Check that hours add up
  const sum = buildHours + researchHours + shareHours
  if (Math.abs(sum - totalHours) > 0.1) {
    errors.push({
      code: 'HOURS_MISMATCH',
      severity: 'error',
      message: `Build + Research + Share hours (${sum}) must equal total hours (${totalHours})`,
      field: 'hours',
    })
  }

  // Check percentages
  const buildPct = (buildHours / totalHours) * 100
  const researchPct = (researchHours / totalHours) * 100
  const sharePct = (shareHours / totalHours) * 100

  if (buildPct < guardrails.timeAllocation.buildPercentage.min) {
    errors.push({
      code: 'BUILD_TIME_TOO_LOW',
      severity: 'warning',
      message: `Build time should be at least ${guardrails.timeAllocation.buildPercentage.min}% (currently ${buildPct.toFixed(0)}%)`,
      field: 'buildSection.hours',
    })
  }

  if (buildPct > guardrails.timeAllocation.buildPercentage.max) {
    errors.push({
      code: 'BUILD_TIME_TOO_HIGH',
      severity: 'warning',
      message: `Build time should be at most ${guardrails.timeAllocation.buildPercentage.max}% (currently ${buildPct.toFixed(0)}%)`,
      field: 'buildSection.hours',
    })
  }

  if (researchPct < guardrails.timeAllocation.researchPercentage.min) {
    errors.push({
      code: 'RESEARCH_TIME_TOO_LOW',
      severity: 'warning',
      message: `Research time should be at least ${guardrails.timeAllocation.researchPercentage.min}% (currently ${researchPct.toFixed(0)}%)`,
      field: 'researchSection.hours',
    })
  }

  if (researchPct > guardrails.timeAllocation.researchPercentage.max) {
    errors.push({
      code: 'RESEARCH_TIME_TOO_HIGH',
      severity: 'warning',
      message: `Research time should be at most ${guardrails.timeAllocation.researchPercentage.max}% (currently ${researchPct.toFixed(0)}%)`,
      field: 'researchSection.hours',
    })
  }

  return {
    valid: errors.filter(e => e.severity === 'error').length === 0,
    errors,
    warnings: [],
  }
}

/**
 * Checks if a roadmap can be saved (passes all critical validations)
 */
export function canSaveRoadmap(
  roadmap: Roadmap,
  originalRoadmap: Roadmap
): { canSave: boolean; blockers: ValidationError[] } {
  const result = validateRoadmap(roadmap, originalRoadmap, {
    includeWarnings: false,
    strictMode: false,
  })

  const blockers = result.errors.filter(e => e.severity === 'error')

  return {
    canSave: blockers.length === 0,
    blockers,
  }
}

/**
 * Formats validation errors for display
 */
export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) return 'No errors'

  return errors
    .map(error => {
      let message = `[${error.code}] ${error.message}`
      if (error.suggestion) {
        message += ` (Suggestion: ${error.suggestion})`
      }
      return message
    })
    .join('\n')
}
