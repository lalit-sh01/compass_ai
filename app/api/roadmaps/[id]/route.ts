import { NextRequest, NextResponse } from 'next/server'
import { getRoadmapById, updateRoadmap, deleteRoadmap } from '@/lib/db/roadmaps'

/**
 * GET /api/roadmaps/[id]
 * Gets a single roadmap by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const roadmap = await getRoadmapById(id)

    if (!roadmap) {
      return NextResponse.json(
        { error: 'Roadmap not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ roadmap }, { status: 200 })
  } catch (error) {
    console.error('Get roadmap error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to get roadmap' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/roadmaps/[id]
 * Updates a roadmap
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updates = await req.json()

    const roadmap = await updateRoadmap(id, updates)

    return NextResponse.json({ roadmap }, { status: 200 })
  } catch (error) {
    console.error('Update roadmap error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to update roadmap' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/roadmaps/[id]
 * Deletes a roadmap
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteRoadmap(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Delete roadmap error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to delete roadmap' },
      { status: 500 }
    )
  }
}
