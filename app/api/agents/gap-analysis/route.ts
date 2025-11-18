import { NextRequest, NextResponse } from 'next/server'
import { runGapAnalysisAgent, validateGapAnalysis } from '@/lib/agents/gap-analysis-agent'
import { validateAssessment } from '@/lib/agents/assessment-agent'

export async function POST(req: NextRequest) {
  try {
    const { assessment } = await req.json()

    if (!assessment || !validateAssessment(assessment)) {
      return NextResponse.json(
        { error: 'Invalid assessment data' },
        { status: 400 }
      )
    }

    // Run the gap analysis agent
    const gapAnalysis = await runGapAnalysisAgent(assessment)

    // Validate the result
    if (!validateGapAnalysis(gapAnalysis)) {
      throw new Error('Invalid gap analysis data generated')
    }

    return NextResponse.json({ gapAnalysis }, { status: 200 })
  } catch (error) {
    console.error('Gap analysis agent error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to generate gap analysis' },
      { status: 500 }
    )
  }
}
