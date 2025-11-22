'use client';

import { useEffect, Suspense, use } from 'react';
import { useRouter } from 'next/navigation';
import { useRoadmap } from '@/context/RoadmapContext';
import ProgressiveRoadmap from '@/components/experiments/ProgressiveRoadmap';
import { NewFormatRoadmapOverview } from '@/components/viewer/NewFormatRoadmapOverview';
import { Roadmap, LegacyRoadmap } from '@/lib/types';

interface ViewerPageProps {
    params: Promise<{
        roadmapId: string;
    }>;
}

function ViewerContent({ roadmapId }: { roadmapId: string }) {
    const router = useRouter();
    const { roadmap, loadRoadmapById, loading, error, isNewFormat } = useRoadmap();

    useEffect(() => {
        console.log('[ViewerContent] roadmapId:', roadmapId);
        // Load roadmap if not already loaded or if ID doesn't match
        if ((!roadmap || roadmap.id !== roadmapId) && !loading) {
            loadRoadmapById(roadmapId);
        }
    }, [roadmapId, roadmap?.id]); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-gray-600">Loading roadmap...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <svg className="h-12 w-12 text-red-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Roadmap Not Found</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!roadmap || roadmap.id !== roadmapId) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-gray-600">Roadmap not found</p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Conditionally render based on format
    if (isNewFormat) {
        return <NewFormatRoadmapOverview roadmap={roadmap as Roadmap} />;
    }

    // Legacy format
    return <ProgressiveRoadmap roadmap={roadmap as LegacyRoadmap} />;
}

export default function ViewerPage({ params }: ViewerPageProps) {
    // In Next.js 15+, params is a Promise that needs to be unwrapped
    const resolvedParams = use(params);

    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            </div>
        }>
            <ViewerContent roadmapId={resolvedParams.roadmapId} />
        </Suspense>
    );
}
