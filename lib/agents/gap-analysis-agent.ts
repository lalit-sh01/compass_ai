import { callOpenAIJSON, createOpenAIClient } from '../openai'
import {
  GAP_ANALYSIS_SYSTEM_PROMPT,
  buildGapAnalysisPrompt,
} from './prompts/gap-analysis'
import type { AssessmentData } from './assessment-agent'

export interface SkillGap {
  skill: string
  description: string
  currentLevel: 'none' | 'beginner' | 'intermediate' | 'advanced'
  targetLevel: 'intermediate' | 'advanced' | 'expert'
  priority: 'high' | 'medium' | 'low'
  estimatedWeeks: number
}

export interface GapAnalysisData {
  targetRole: {
    title: string
    requiredSkills: {
      essential: SkillGap[]
      recommended: SkillGap[]
      optional: SkillGap[]
    }
  }
  learningPath: {
    phase1: {
      title: string
      focus: string[]
      duration: number
    }
    phase2: {
      title: string
      focus: string[]
      duration: number
    }
    phase3: {
      title: string
      focus: string[]
      duration: number
    }
  }
  recommendations: {
    strengths: string[]
    quickWins: string[]
    challenges: string[]
    resources: string[]
  }
}

/**
 * Runs the gap analysis agent to identify skill gaps
 * @param assessment - The user's assessment data
 * @returns Gap analysis data with skill recommendations
 */
export async function runGapAnalysisAgent(
  assessment: AssessmentData
): Promise<GapAnalysisData> {
  const client = await createOpenAIClient()

  const userPrompt = buildGapAnalysisPrompt(assessment)

  const gapAnalysis = await callOpenAIJSON<GapAnalysisData>({
    client,
    systemPrompt: GAP_ANALYSIS_SYSTEM_PROMPT,
    userPrompt,
    model: 'gpt-4-turbo-preview',
    temperature: 0.7,
    maxTokens: 3000,
  })

  return gapAnalysis
}

/**
 * Extracts all skills from gap analysis for user selection
 */
export function extractAllSkills(gapAnalysis: GapAnalysisData): SkillGap[] {
  return [
    ...gapAnalysis.targetRole.requiredSkills.essential,
    ...gapAnalysis.targetRole.requiredSkills.recommended,
    ...gapAnalysis.targetRole.requiredSkills.optional,
  ]
}

/**
 * Validates gap analysis data structure
 */
export function validateGapAnalysis(data: any): data is GapAnalysisData {
  return (
    data &&
    typeof data === 'object' &&
    data.targetRole &&
    data.targetRole.requiredSkills &&
    Array.isArray(data.targetRole.requiredSkills.essential) &&
    Array.isArray(data.targetRole.requiredSkills.recommended) &&
    data.learningPath &&
    data.learningPath.phase1 &&
    data.learningPath.phase2 &&
    data.learningPath.phase3 &&
    data.recommendations
  )
}
