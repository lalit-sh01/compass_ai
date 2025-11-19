import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getRoadmapProgress } from '@/lib/db/progress';

export async function GET(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const roadmapId = searchParams.get('roadmapId');

    if (!roadmapId) {
        return new NextResponse('Missing roadmapId', { status: 400 });
    }

    try {
        const progress = await getRoadmapProgress(roadmapId);
        return NextResponse.json(progress);
    } catch (error) {
        console.error('Error fetching progress:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
