import { NextRequest, NextResponse } from 'next/server'
import { createRoadmap, getUserRoadmaps } from '@/lib/db/roadmaps'

/**
 * GET /api/roadmaps
 * Gets all roadmaps for the current user
 */
export async function GET(req: NextRequest) {
  try {
    const roadmaps = await getUserRoadmaps()
    return NextResponse.json({ roadmaps }, { status: 200 })
  } catch (error) {
    console.error('Get roadmaps error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to get roadmaps' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/roadmaps
 * Creates a new roadmap
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { roadmap, assessment, gapAnalysis, selectedSkills } = body

    if (!roadmap) {
      return NextResponse.json(
        { error: 'Roadmap is required' },
        { status: 400 }
      )
    }

    const newRoadmap = await createRoadmap({
      roadmap,
      assessment,
      gapAnalysis,
      selectedSkills,
    })

    return NextResponse.json({ roadmap: newRoadmap }, { status: 201 })
  } catch (error) {
    console.error('Create roadmap error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to create roadmap' },
      { status: 500 }
    )
  }
}
