import { NextRequest, NextResponse } from 'next/server'
import type { Roadmap } from '@/lib/types'
import { createRoadmap } from '@/lib/db/roadmaps'

// Simple validation function
function validateRoadmap(data: any): data is Roadmap {
  if (!data || typeof data !== 'object') return false

  // Check required top-level fields
  const requiredFields = ['title', 'goal', 'phases']
  for (const field of requiredFields) {
    if (!(field in data)) {
      return false
    }
  }

  // Check phases array
  if (!Array.isArray(data.phases) || data.phases.length === 0) {
    return false
  }

  // Check each phase has required fields
  for (const phase of data.phases) {
    if (!phase.phaseNumber || !phase.title || !Array.isArray(phase.weeks)) {
      return false
    }
  }

  return true
}

export async function POST(req: NextRequest) {
  try {
    // No authentication required
    const body = await req.json()
    const { roadmap } = body

    if (!roadmap) {
      return NextResponse.json(
        { error: 'Missing roadmap data' },
        { status: 400 }
      )
    }

    // Validate the roadmap structure
    if (!validateRoadmap(roadmap)) {
      return NextResponse.json(
        { error: 'Invalid roadmap format. Please ensure your JSON matches the required schema.' },
        { status: 400 }
      )
    }

    // Create the roadmap in the database
    const savedRoadmap = await createRoadmap({
      roadmap: roadmap,
      assessment: {}, // Empty for imported roadmaps
      gapAnalysis: {},
      selectedSkills: []
    })

    return NextResponse.json(
      {
        success: true,
        roadmapId: savedRoadmap.id,
        message: 'Roadmap imported successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Import roadmap error:', error)

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format. Please check your file.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to import roadmap. Please try again.' },
      { status: 500 }
    )
  }
}
