import { callOpenAI, createOpenAIClient } from '../openai'
import {
  ROADMAP_GENERATION_SYSTEM_PROMPT,
  buildRoadmapGenerationPrompt,
} from './prompts/roadmap-generation'
import type { AssessmentData } from './assessment-agent'
import type { GapAnalysisData } from './gap-analysis-agent'
import type { Roadmap } from '../types'
import {
  validateRoadmapQuality,
  logQualityValidation,
} from './roadmap-quality-validator'

/**
 * Runs the roadmap generation agent to create a comprehensive learning roadmap
 * @param assessment - The user's assessment data
 * @param gapAnalysis - The gap analysis data
 * @param selectedSkills - Skills selected by the user from gap analysis
 * @returns Complete roadmap conforming to the schema
 */
export async function runRoadmapGeneratorAgent(
  assessment: AssessmentData,
  gapAnalysis: GapAnalysisData,
  selectedSkills: string[]
): Promise<Roadmap> {
  const client = await createOpenAIClient()

  const userPrompt = buildRoadmapGenerationPrompt(
    assessment,
    gapAnalysis,
    selectedSkills
  )

  // Use gpt-4o which has better JSON generation and higher token limits
  const response = await callOpenAI({
    client,
    systemPrompt: ROADMAP_GENERATION_SYSTEM_PROMPT,
    userPrompt,
    model: 'gpt-4o', // gpt-4o supports up to 16k output tokens
    temperature: 0.4, // Lower temperature for more consistent, structured output
    maxTokens: 16000, // gpt-4o can handle this
  })

  // Parse the JSON response
  let roadmap: Roadmap
  try {
    // Remove any markdown code blocks if present
    const cleanedResponse = response
      .replace(/```json\n/g, '')
      .replace(/```\n/g, '')
      .replace(/```/g, '')
      .trim()

    roadmap = JSON.parse(cleanedResponse)
  } catch (error) {
    console.error('Failed to parse roadmap JSON:', error)
    throw new Error('Failed to generate valid roadmap. Please try again.')
  }

  // Validate the roadmap structure
  if (!validateRoadmap(roadmap)) {
    throw new Error('Generated roadmap does not conform to schema')
  }

  // Validate and log quality metrics
  const qualityResult = validateRoadmapQuality(roadmap)
  logQualityValidation(qualityResult)

  // Log warning if quality is below threshold (but don't fail)
  if (qualityResult.score < 70) {
    console.warn(
      `⚠️  Roadmap quality score is ${qualityResult.score}/100. Consider implementing multi-pass refinement.`
    )
  }

  return roadmap
}

/**
 * Validates that the generated roadmap conforms to the schema
 */
export function validateRoadmap(data: any): data is Roadmap {
  try {
    if (!data || typeof data !== 'object') {
      console.error('[ROADMAP VALIDATION] Data is not an object')
      return false
    }

    if (typeof data.title !== 'string') {
      console.error('[ROADMAP VALIDATION] Missing or invalid title')
      return false
    }

    if (typeof data.goal !== 'string') {
      console.error('[ROADMAP VALIDATION] Missing or invalid goal')
      return false
    }

    if (typeof data.totalDurationWeeks !== 'number') {
      console.error('[ROADMAP VALIDATION] Missing or invalid totalDurationWeeks')
      return false
    }

    if (!Array.isArray(data.phases) || data.phases.length === 0) {
      console.error('[ROADMAP VALIDATION] Phases array is missing or empty')
      return false
    }

    for (const phase of data.phases) {
      if (typeof phase.phaseNumber !== 'number') {
        console.error(`[ROADMAP VALIDATION] Phase ${phase.phaseNumber}: Missing phaseNumber`)
        return false
      }

      if (typeof phase.title !== 'string') {
        console.error(`[ROADMAP VALIDATION] Phase ${phase.phaseNumber}: Missing title`)
        return false
      }

      if (!Array.isArray(phase.weeks)) {
        console.error(`[ROADMAP VALIDATION] Phase ${phase.phaseNumber}: Weeks array missing`)
        return false
      }

      for (const week of phase.weeks) {
        if (typeof week.weekNumber !== 'number') {
          console.error(`[ROADMAP VALIDATION] Week missing weekNumber`)
          return false
        }

        if (typeof week.title !== 'string') {
          console.error(`[ROADMAP VALIDATION] Week ${week.weekNumber}: Missing title`)
          return false
        }

        if (!week.buildSection) {
          console.error(`[ROADMAP VALIDATION] Week ${week.weekNumber}: Missing buildSection`)
          return false
        }

        if (typeof week.buildSection.projectTitle !== 'string') {
          console.error(`[ROADMAP VALIDATION] Week ${week.weekNumber}: Missing buildSection.projectTitle`)
          return false
        }

        if (!week.researchSection) {
          console.error(`[ROADMAP VALIDATION] Week ${week.weekNumber}: Missing researchSection`)
          return false
        }

        if (!Array.isArray(week.researchSection.deepDiveTopics)) {
          console.error(`[ROADMAP VALIDATION] Week ${week.weekNumber}: Missing researchSection.deepDiveTopics array`)
          return false
        }

        if (!week.shareSection) {
          console.error(`[ROADMAP VALIDATION] Week ${week.weekNumber}: Missing shareSection`)
          return false
        }

        if (typeof week.shareSection.artifactTitle !== 'string') {
          console.error(`[ROADMAP VALIDATION] Week ${week.weekNumber}: Missing shareSection.artifactTitle`)
          return false
        }
      }
    }

    console.log('[ROADMAP VALIDATION] ✓ Roadmap structure is valid')
    return true
  } catch (error) {
    console.error('[ROADMAP VALIDATION] Exception during validation:', error)
    return false
  }
}

/**
 * Refines an existing roadmap based on user feedback
 */
export async function refineRoadmap(
  currentRoadmap: Roadmap,
  refinementRequest: string
): Promise<Roadmap> {
  const client = await createOpenAIClient()

  const systemPrompt = `You are an expert learning roadmap architect. The user has an existing roadmap and wants to refine it based on their feedback.

Your task is to take the existing roadmap and make targeted improvements based on the user's request while maintaining the overall structure and schema compliance.

Output ONLY the updated roadmap as valid JSON. Make minimal changes - only what the user requested.`

  const userPrompt = `Here is the current roadmap:

${JSON.stringify(currentRoadmap, null, 2)}

User's refinement request:
"${refinementRequest}"

Please update the roadmap based on this feedback and output the complete updated roadmap as JSON.`

  const response = await callOpenAI({
    client,
    systemPrompt,
    userPrompt,
    model: 'gpt-4o', // gpt-4o supports up to 16k output tokens
    temperature: 0.4, // Lower temperature for consistent refinements
    maxTokens: 16000,
  })

  // Parse and validate
  const cleanedResponse = response
    .replace(/```json\n/g, '')
    .replace(/```\n/g, '')
    .replace(/```/g, '')
    .trim()

  const refinedRoadmap = JSON.parse(cleanedResponse)

  if (!validateRoadmap(refinedRoadmap)) {
    throw new Error('Refined roadmap does not conform to schema')
  }

  return refinedRoadmap
}
