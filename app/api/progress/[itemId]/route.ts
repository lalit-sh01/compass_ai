import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { toggleProgressItem } from '@/lib/db/progress';

export async function POST(
    req: NextRequest,
    props: { params: Promise<{ itemId: string }> }
) {
    const params = await props.params;
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { roadmapId, isCompleted, entityType, section } = body;

        if (!roadmapId || isCompleted === undefined) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const success = await toggleProgressItem(
            roadmapId,
            params.itemId,
            isCompleted,
            entityType,
            section
        );

        if (!success) {
            return new NextResponse('Failed to update progress', { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating progress:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
