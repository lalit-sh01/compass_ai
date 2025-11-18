import { NextRequest, NextResponse } from 'next/server'
import { runRoadmapGeneratorAgent, validateRoadmap } from '@/lib/agents/roadmap-generator-agent'
import { validateAssessment } from '@/lib/agents/assessment-agent'
import { validateGapAnalysis } from '@/lib/agents/gap-analysis-agent'
import { validateRoadmapAgainstSchema } from '@/lib/schema-validator'

export async function POST(req: NextRequest) {
  try {
    const { assessment, gapAnalysis, selectedSkills } = await req.json()

    // Validate inputs
    if (!assessment || !validateAssessment(assessment)) {
      return NextResponse.json(
        { error: 'Invalid assessment data' },
        { status: 400 }
      )
    }

    if (!gapAnalysis || !validateGapAnalysis(gapAnalysis)) {
      return NextResponse.json(
        { error: 'Invalid gap analysis data' },
        { status: 400 }
      )
    }

    if (!selectedSkills || !Array.isArray(selectedSkills) || selectedSkills.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one skill' },
        { status: 400 }
      )
    }

    // Run the roadmap generation agent
    const roadmap = await runRoadmapGeneratorAgent(assessment, gapAnalysis, selectedSkills)

    // Basic validation
    if (!validateRoadmap(roadmap)) {
      throw new Error('Generated roadmap failed basic validation')
    }

    // Schema validation (optional but recommended)
    try {
      const { valid, errors } = await validateRoadmapAgainstSchema(roadmap)
      if (!valid) {
        console.error('Schema validation errors:', errors)
        // Don't fail - just log the errors
        console.warn('Roadmap has schema validation issues but will be returned anyway')
      }
    } catch (schemaError) {
      console.error('Schema validation error:', schemaError)
      // Don't fail - schema validation is a nice-to-have
    }

    return NextResponse.json({ roadmap }, { status: 200 })
  } catch (error) {
    console.error('Roadmap generation error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to generate roadmap' },
      { status: 500 }
    )
  }
}
