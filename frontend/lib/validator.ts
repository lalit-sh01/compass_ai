import Ajv, { ValidateFunction, ErrorObject } from 'ajv';
import type { Roadmap } from './types';

let ajvInstance: Ajv | null = null;
let validateFunction: ValidateFunction | null = null;

export interface ValidationResult {
  valid: boolean;
  errors?: ErrorObject[];
  errorMessage?: string;
}

/**
 * Initialize the AJV validator with the schema
 */
export async function initializeValidator(): Promise<void> {
  if (ajvInstance && validateFunction) {
    return; // Already initialized
  }

  try {
    // Load the schema from the public directory
    const response = await fetch('/json_schema_final.json');
    if (!response.ok) {
      throw new Error(`Failed to load schema: ${response.statusText}`);
    }

    const schema = await response.json();

    ajvInstance = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false, // Allow additional properties not in schema
    });

    validateFunction = ajvInstance.compile(schema);
  } catch (error) {
    console.error('Failed to initialize validator:', error);
    throw error;
  }
}

/**
 * Validate a roadmap JSON object against the schema
 */
export function validateRoadmap(data: unknown): ValidationResult {
  if (!validateFunction) {
    return {
      valid: false,
      errorMessage: 'Validator not initialized. Call initializeValidator() first.',
    };
  }

  const valid = validateFunction(data);

  if (!valid && validateFunction.errors) {
    const errors = validateFunction.errors;
    const errorMessage = formatValidationErrors(errors);

    return {
      valid: false,
      errors,
      errorMessage,
    };
  }

  return { valid: true };
}

/**
 * Format validation errors into a human-readable message
 */
function formatValidationErrors(errors: ErrorObject[]): string {
  if (!errors || errors.length === 0) {
    return 'Unknown validation error';
  }

  const messages = errors.map((error) => {
    const path = error.instancePath || 'root';
    const message = error.message || 'Invalid';

    if (error.keyword === 'required') {
      const missingProp = (error.params as { missingProperty?: string }).missingProperty;
      return `Missing required field: ${path}/${missingProp}`;
    }

    if (error.keyword === 'type') {
      const expectedType = (error.params as { type?: string }).type;
      return `${path}: expected type ${expectedType}`;
    }

    return `${path}: ${message}`;
  });

  return messages.slice(0, 5).join('\n') + (messages.length > 5 ? `\n... and ${messages.length - 5} more errors` : '');
}

/**
 * Validate and parse a JSON string
 */
export function validateRoadmapJSON(jsonString: string): ValidationResult & { data?: Roadmap } {
  try {
    const data = JSON.parse(jsonString);
    const result = validateRoadmap(data);

    if (result.valid) {
      return { ...result, data: data as Roadmap };
    }

    return result;
  } catch (error) {
    return {
      valid: false,
      errorMessage: `JSON Parse Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Load and validate a roadmap from a URL
 */
export async function loadRoadmapFromURL(url: string): Promise<ValidationResult & { data?: Roadmap }> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        valid: false,
        errorMessage: `Failed to load file: ${response.statusText}`,
      };
    }

    const jsonString = await response.text();
    return validateRoadmapJSON(jsonString);
  } catch (error) {
    return {
      valid: false,
      errorMessage: `Failed to load file: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
