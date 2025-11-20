/**
 * Sanitizers
 *
 * Clean and normalize user input before applying to roadmap.
 * Prevents XSS, trims whitespace, normalizes data.
 */

/**
 * Sanitizes a string (trim, remove dangerous characters)
 */
export function sanitizeString(value: string): string {
  if (typeof value !== 'string') return ''

  // Trim whitespace
  let sanitized = value.trim()

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '')

  // Normalize whitespace (replace multiple spaces with single space)
  sanitized = sanitized.replace(/\s+/g, ' ')

  return sanitized
}

/**
 * Sanitizes HTML (strip all HTML tags for security)
 */
export function sanitizeHtml(value: string): string {
  if (typeof value !== 'string') return ''

  // Strip all HTML tags
  let sanitized = value.replace(/<[^>]*>/g, '')

  // Decode HTML entities
  sanitized = decodeHtmlEntities(sanitized)

  return sanitizeString(sanitized)
}

/**
 * Sanitizes markdown (allow safe markdown, strip dangerous HTML)
 */
export function sanitizeMarkdown(value: string): string {
  if (typeof value !== 'string') return ''

  // Allow markdown but strip potentially dangerous HTML
  let sanitized = value

  // Remove script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '')

  return sanitized.trim()
}

/**
 * Sanitizes a URL
 */
export function sanitizeUrl(value: string): string {
  if (typeof value !== 'string') return ''

  const trimmed = value.trim()

  // Check if URL is valid
  try {
    const url = new URL(trimmed)

    // Only allow http and https protocols
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return ''
    }

    // Remove dangerous protocols
    if (url.protocol.includes('javascript') || url.protocol.includes('data')) {
      return ''
    }

    return url.toString()
  } catch {
    // If URL parsing fails, try adding https://
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      try {
        const urlWithProtocol = `https://${trimmed}`
        const url = new URL(urlWithProtocol)
        return url.toString()
      } catch {
        return ''
      }
    }

    return ''
  }
}

/**
 * Sanitizes a number (ensure it's a valid number within range)
 */
export function sanitizeNumber(
  value: any,
  options?: {
    min?: number
    max?: number
    integer?: boolean
  }
): number {
  let num = typeof value === 'number' ? value : parseFloat(value)

  if (isNaN(num)) {
    return options?.min ?? 0
  }

  if (options?.integer) {
    num = Math.round(num)
  }

  if (options?.min !== undefined && num < options.min) {
    num = options.min
  }

  if (options?.max !== undefined && num > options.max) {
    num = options.max
  }

  return num
}

/**
 * Sanitizes a deliverable object
 */
export function sanitizeDeliverable(deliverable: any): any {
  if (!deliverable || typeof deliverable !== 'object') {
    return {
      description: '',
      isCompleted: false,
      subtasks: [],
    }
  }

  return {
    description: sanitizeString(deliverable.description || ''),
    isCompleted: Boolean(deliverable.isCompleted),
    subtasks: Array.isArray(deliverable.subtasks)
      ? deliverable.subtasks.map(sanitizeSubtask)
      : [],
  }
}

/**
 * Sanitizes a subtask object
 */
export function sanitizeSubtask(subtask: any): any {
  if (!subtask || typeof subtask !== 'object') {
    return {
      description: '',
      isCompleted: false,
    }
  }

  return {
    description: sanitizeString(subtask.description || ''),
    isCompleted: Boolean(subtask.isCompleted),
    suggestedResources: Array.isArray(subtask.suggestedResources)
      ? subtask.suggestedResources.map(sanitizeResource)
      : undefined,
  }
}

/**
 * Sanitizes a resource object
 */
export function sanitizeResource(resource: any): any {
  if (!resource || typeof resource !== 'object') {
    return {
      title: '',
      type: 'Article',
      url: '',
    }
  }

  return {
    title: sanitizeString(resource.title || ''),
    type: sanitizeResourceType(resource.type),
    url: sanitizeUrl(resource.url || ''),
  }
}

/**
 * Sanitizes resource type (ensure it's a valid type)
 */
function sanitizeResourceType(type: any): string {
  const validTypes = [
    'Article',
    'YouTube',
    'Video',
    'Documentation',
    'Course',
    'Book',
    'Paper',
    'Tool',
    'Guide',
    'Tutorial',
    'Platform',
    'Blog',
    'Framework',
    'Podcast',
    'Gallery',
    'Community',
    'Networking',
    'Template',
  ]

  if (typeof type === 'string' && validTypes.includes(type)) {
    return type
  }

  return 'Article' // Default
}

/**
 * Sanitizes a note
 */
export function sanitizeNote(note: string, allowMarkdown: boolean = true): string {
  if (!note) return ''

  return allowMarkdown ? sanitizeMarkdown(note) : sanitizeHtml(note)
}

/**
 * Sanitizes week title
 */
export function sanitizeWeekTitle(title: string): string {
  return sanitizeString(title).slice(0, 100) // Max 100 chars
}

/**
 * Sanitizes week theme
 */
export function sanitizeWeekTheme(theme: string): string {
  return sanitizeString(theme).slice(0, 100) // Max 100 chars
}

/**
 * Sanitizes hours value
 */
export function sanitizeHours(hours: any): number {
  return sanitizeNumber(hours, {
    min: 0,
    max: 40,
    integer: false, // Allow decimals like 7.5 hours
  })
}

/**
 * Decodes HTML entities
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  }

  return text.replace(/&[#\w]+;/g, (match) => entities[match] || match)
}

/**
 * Sanitizes an entire roadmap (deep sanitization)
 */
export function sanitizeRoadmap(roadmap: any): any {
  if (!roadmap || typeof roadmap !== 'object') {
    throw new Error('Invalid roadmap object')
  }

  const sanitized = {
    ...roadmap,
    title: sanitizeString(roadmap.title || ''),
    goal: sanitizeString(roadmap.goal || ''),
    totalDurationWeeks: sanitizeNumber(roadmap.totalDurationWeeks, {
      min: 1,
      max: 52,
      integer: true,
    }),
  }

  // Sanitize phases and weeks
  if (Array.isArray(roadmap.phases)) {
    sanitized.phases = roadmap.phases.map((phase: any) => ({
      ...phase,
      title: sanitizeString(phase.title || ''),
      summary: sanitizeString(phase.summary || ''),
      weeks: Array.isArray(phase.weeks)
        ? phase.weeks.map((week: any) => sanitizeWeek(week))
        : [],
    }))
  }

  return sanitized
}

/**
 * Sanitizes a week object
 */
function sanitizeWeek(week: any): any {
  return {
    ...week,
    title: sanitizeWeekTitle(week.title || ''),
    theme: sanitizeWeekTheme(week.theme || ''),
    totalHours: sanitizeHours(week.totalHours),
    buildSection: week.buildSection
      ? {
          ...week.buildSection,
          hours: sanitizeHours(week.buildSection.hours),
          projectTitle: sanitizeString(week.buildSection.projectTitle || ''),
          description: sanitizeString(week.buildSection.description || ''),
          deliverables: Array.isArray(week.buildSection.deliverables)
            ? week.buildSection.deliverables.map(sanitizeDeliverable)
            : [],
        }
      : undefined,
    researchSection: week.researchSection
      ? {
          ...week.researchSection,
          hours: sanitizeHours(week.researchSection.hours),
          deepDiveTopics: Array.isArray(week.researchSection.deepDiveTopics)
            ? week.researchSection.deepDiveTopics.map((topic: any) => ({
                ...topic,
                description: sanitizeString(topic.description || ''),
                isCompleted: Boolean(topic.isCompleted),
                suggestedResources: Array.isArray(topic.suggestedResources)
                  ? topic.suggestedResources.map(sanitizeResource)
                  : [],
              }))
            : [],
        }
      : undefined,
    shareSection: week.shareSection
      ? {
          ...week.shareSection,
          hours: sanitizeHours(week.shareSection.hours),
          artifactTitle: sanitizeString(week.shareSection.artifactTitle || ''),
          artifactDescription: sanitizeString(week.shareSection.artifactDescription || ''),
        }
      : undefined,
  }
}
