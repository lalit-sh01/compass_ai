import { NextRequest, NextResponse } from 'next/server'
import { runAssessmentAgent, validateAssessment } from '@/lib/agents/assessment-agent'

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json()

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid assessment answers' },
        { status: 400 }
      )
    }

    // Run the assessment agent
    const assessment = await runAssessmentAgent(answers)

    // Log the result for debugging
    console.log('[ASSESSMENT] OpenAI returned:', JSON.stringify(assessment, null, 2))

    // Validate the result
    if (!validateAssessment(assessment)) {
      console.error('[ASSESSMENT] Validation failed. Data:', JSON.stringify(assessment, null, 2))
      throw new Error('Invalid assessment data generated')
    }

    return NextResponse.json({ assessment }, { status: 200 })
  } catch (error) {
    console.error('Assessment agent error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to process assessment' },
      { status: 500 }
    )
  }
}
