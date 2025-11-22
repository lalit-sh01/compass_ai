'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRoadmap } from '@/context/RoadmapContext';
import UnifiedSplitRoadmap from '@/components/experiments/UnifiedSplitRoadmap';
import roadmapData from '@/final_roadmap.json';
import { Roadmap } from '@/lib/types';

function UnifiedSplitExperimentContent() {
    const searchParams = useSearchParams();
    const { roadmap: contextRoadmap, loadRoadmapById, loading } = useRoadmap();
    const roadmapId = searchParams.get('roadmapId');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (roadmapId) {
            loadRoadmapById(roadmapId);
        }
    }, [roadmapId, loadRoadmapById]);

    if (!mounted) return null;

    // Use context roadmap if available and matches ID (if provided), otherwise use default
    const displayRoadmap = (roadmapId && contextRoadmap?.id === roadmapId)
        ? contextRoadmap
        : (roadmapData as unknown as Roadmap);

    return <UnifiedSplitRoadmap roadmap={displayRoadmap} />;
}

export default function UnifiedSplitExperimentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UnifiedSplitExperimentContent />
        </Suspense>
    );
}
