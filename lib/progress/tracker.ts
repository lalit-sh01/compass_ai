import { Roadmap } from '@/lib/types';

export type EntityType = 'deliverable' | 'topic' | 'subtask' | 'week' | 'phase';

export interface ProgressItem {
    id: string; // Unique ID (e.g., "w1-d1", "w2-t3-s1")
    roadmapId: string;
    entityType: EntityType;
    isCompleted: boolean;
    completedAt?: string;
    notes?: string;
    rating?: number;
}

export interface ProgressState {
    overall: number; // 0-100
    phases: Record<number, number>; // phase number -> %
    weeks: Record<number, number>; // week number -> %
    items: Record<string, ProgressItem>; // itemId -> item
}

export function generateItemId(
    weekNumber: number,
    type: 'deliverable' | 'topic' | 'subtask' | 'resource',
    index: number,
    section?: string,
    parentIndex?: number
): string {
    if (type === 'subtask' && parentIndex !== undefined) {
        return `w${weekNumber}-t${parentIndex}-s${index}`;
    }
    if (type === 'resource') {
        // section can be used for topic ID or general section
        const sectionSuffix = section ? `-${section}` : '';
        return `w${weekNumber}-r${index}${sectionSuffix}`;
    }
    const prefix = type === 'deliverable' ? 'd' : 't';
    const sectionSuffix = section ? `-${section}` : '';
    return `w${weekNumber}-${prefix}${index}${sectionSuffix}`;
}

export function parseItemId(itemId: string): {
    weekNumber: number;
    type: 'deliverable' | 'topic' | 'subtask' | 'resource';
    index: number;
    section?: 'build' | 'research' | 'share' | string;
    parentIndex?: number;
    topicIndex?: number;
} {
    // Format: w1-d1-build, w1-t1, w1-t1-s1
    const parts = itemId.split('-');
    const weekNumber = parseInt(parts[0].substring(1));

    if (parts.length >= 3 && parts[1].startsWith('t') && parts[2].startsWith('s')) {
        // Subtask: w1-t1-s1
        const parentIndex = parseInt(parts[1].substring(1));
        const index = parseInt(parts[2].substring(1));
        return { weekNumber, type: 'subtask', index, parentIndex };
    }

    // Resource: w1-r0-topic-0 or w1-r0-research
    if (parts[1].startsWith('r')) {
        const index = parseInt(parts[1].substring(1));
        const sectionPart = parts.slice(2).join('-'); // topic-0 or research

        let topicIndex: number | undefined;
        if (sectionPart.startsWith('topic-')) {
            topicIndex = parseInt(sectionPart.split('-')[1]);
        }

        return {
            weekNumber,
            type: 'resource',
            index,
            section: sectionPart as any, // Keep original string for flexibility
            topicIndex
        };
    }

    const typeChar = parts[1].charAt(0);
    const index = parseInt(parts[1].substring(1));
    const type = typeChar === 'd' ? 'deliverable' : 'topic';

    let section: 'build' | 'research' | 'share' | undefined;
    if (parts.length > 2 && !parts[2].startsWith('s')) {
        section = parts[2] as 'build' | 'research' | 'share';
    }

    return { weekNumber, type, index, section };
}

export function calculateProgress(total: number, completed: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
}
