import { callOpenAIJSON, createOpenAIClient } from '../openai'
import {
  ASSESSMENT_SYSTEM_PROMPT,
  buildAssessmentPrompt,
} from './prompts/assessment'

export interface AssessmentData {
  goal: {
    title: string
    description: string
    timeframe: number
    motivation: string
  }
  currentSkills: {
    technical: string[]
    soft: string[]
    experience: {
      years: number
      roles: string[]
      projects: string[]
    }
  }
  learningPreferences: {
    pace: 'fast' | 'moderate' | 'slow'
    style: 'hands-on' | 'theoretical' | 'balanced'
    hoursPerWeek: number
    preferredResources: string[]
  }
  constraints: {
    availableTime: string
    budget: 'free' | 'low' | 'moderate' | 'high'
    prerequisites: string[]
    challenges: string[]
  }
}

/**
 * Runs the assessment agent to analyze user inputs
 * @param answers - User's answers from the assessment questionnaire
 * @returns Structured assessment data
 */
export async function runAssessmentAgent(
  answers: Record<string, string>
): Promise<AssessmentData> {
  const client = await createOpenAIClient()

  const userPrompt = buildAssessmentPrompt(answers)

  const assessment = await callOpenAIJSON<AssessmentData>({
    client,
    systemPrompt: ASSESSMENT_SYSTEM_PROMPT,
    userPrompt,
    model: 'gpt-4-turbo-preview',
    temperature: 0.7,
    maxTokens: 2000,
  })

  return assessment
}

/**
 * Validates assessment data structure
 */
export function validateAssessment(data: any): data is AssessmentData {
  // More flexible validation - check required fields exist
  try {
    if (!data || typeof data !== 'object') {
      console.error('[VALIDATION] Data is not an object')
      return false
    }

    if (!data.goal || typeof data.goal !== 'object') {
      console.error('[VALIDATION] Missing or invalid goal')
      return false
    }

    if (!data.goal.title || typeof data.goal.title !== 'string') {
      console.error('[VALIDATION] Missing goal.title')
      return false
    }

    // timeframe might be string or number - convert if needed
    if (data.goal.timeframe) {
      if (typeof data.goal.timeframe === 'string') {
        data.goal.timeframe = parseInt(data.goal.timeframe, 10)
      }
      if (typeof data.goal.timeframe !== 'number' || isNaN(data.goal.timeframe)) {
        console.error('[VALIDATION] Invalid goal.timeframe:', data.goal.timeframe)
        return false
      }
    }

    if (!data.currentSkills || typeof data.currentSkills !== 'object') {
      console.error('[VALIDATION] Missing or invalid currentSkills')
      return false
    }

    if (!Array.isArray(data.currentSkills.technical)) {
      console.error('[VALIDATION] currentSkills.technical is not an array')
      return false
    }

    if (!data.learningPreferences || typeof data.learningPreferences !== 'object') {
      console.error('[VALIDATION] Missing or invalid learningPreferences')
      return false
    }

    // hoursPerWeek might be string or number - convert if needed
    if (data.learningPreferences.hoursPerWeek) {
      if (typeof data.learningPreferences.hoursPerWeek === 'string') {
        data.learningPreferences.hoursPerWeek = parseFloat(data.learningPreferences.hoursPerWeek)
      }
      if (typeof data.learningPreferences.hoursPerWeek !== 'number' || isNaN(data.learningPreferences.hoursPerWeek)) {
        console.error('[VALIDATION] Invalid learningPreferences.hoursPerWeek:', data.learningPreferences.hoursPerWeek)
        return false
      }
    }

    if (!data.constraints || typeof data.constraints !== 'object') {
      console.error('[VALIDATION] Missing or invalid constraints')
      return false
    }

    if (!data.constraints.budget || typeof data.constraints.budget !== 'string') {
      console.error('[VALIDATION] Missing constraints.budget')
      return false
    }

    console.log('[VALIDATION] Assessment data is valid')
    return true
  } catch (error) {
    console.error('[VALIDATION] Exception during validation:', error)
    return false
  }
}
