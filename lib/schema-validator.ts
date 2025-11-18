import Ajv from 'ajv'
import type { Roadmap } from './types'

let ajv: Ajv | null = null
let schema: any = null

/**
 * Initializes the AJV validator with the roadmap schema
 */
export async function initializeSchemaValidator(): Promise<void> {
  if (ajv && schema) return

  try {
    // Load schema from public folder
    const response = await fetch('/json_schema_final.json')
    schema = await response.json()

    ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false,
    })
  } catch (error) {
    console.error('Failed to initialize schema validator:', error)
    throw new Error('Failed to load roadmap schema')
  }
}

/**
 * Validates a roadmap against the JSON schema
 * @param roadmap - The roadmap to validate
 * @returns Validation result with errors if any
 */
export async function validateRoadmapAgainstSchema(roadmap: any): Promise<{
  valid: boolean
  errors: string[]
}> {
  if (!ajv || !schema) {
    await initializeSchemaValidator()
  }

  const validate = ajv!.compile(schema)
  const valid = validate(roadmap)

  if (!valid && validate.errors) {
    const errors = validate.errors.map((err) => {
      return `${err.instancePath || '/'}: ${err.message}`
    })
    return { valid: false, errors }
  }

  return { valid: true, errors: [] }
}

/**
 * Validates a roadmap and throws if invalid
 */
export async function validateOrThrow(roadmap: any): Promise<Roadmap> {
  const { valid, errors } = await validateRoadmapAgainstSchema(roadmap)

  if (!valid) {
    throw new Error(`Roadmap validation failed:\n${errors.join('\n')}`)
  }

  return roadmap as Roadmap
}

/**
 * Formats validation errors for display
 */
export function formatValidationErrors(errors: string[]): string {
  if (errors.length === 0) return ''

  return errors
    .map((err, index) => `${index + 1}. ${err}`)
    .join('\n')
}
