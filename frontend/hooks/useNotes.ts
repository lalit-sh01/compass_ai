/**
 * Hook for managing notes on roadmap entities
 */

import { useCallback } from 'react';
import { useRoadmap } from '@/context/RoadmapContext';
import { EntityType } from '@/lib/notes/note-types';

interface UseNotesOptions {
    entityType: EntityType;
    entityId: string;
    weekNumber?: number;
    section?: 'build' | 'research' | 'share';
    topicIndex?: number;
    deliverableIndex?: number;
    resourceIndex?: number;
}

export function useNotes(options: UseNotesOptions) {
    const { roadmap, setRoadmapDirect } = useRoadmap();
    const { entityType, weekNumber, section, topicIndex, deliverableIndex, resourceIndex } = options;

    // Get current note content
    const getCurrentNote = useCallback((): string | undefined => {
        if (!roadmap || weekNumber === undefined) return undefined;

        const phase = roadmap.phases.find(p => p.weeks.some(w => w.weekNumber === weekNumber));
        if (!phase) return undefined;

        const week = phase.weeks.find(w => w.weekNumber === weekNumber);
        if (!week) return undefined;

        switch (entityType) {
            case 'week':
                return week.notes;

            case 'deliverable':
                if (deliverableIndex === undefined || !section) return undefined;
                let deliverables;
                if (section === 'build') deliverables = week.buildSection?.deliverables;
                else if (section === 'research') deliverables = week.researchSection?.deliverables;
                else if (section === 'share') deliverables = week.shareSection?.deliverables;
                return deliverables?.[deliverableIndex]?.notes;

            case 'topic':
                if (topicIndex === undefined) return undefined;
                return week.researchSection?.deepDiveTopics?.[topicIndex]?.notes;

            case 'resource':
                if (resourceIndex === undefined || topicIndex === undefined) return undefined;
                return week.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources?.[resourceIndex]?.notes;

            default:
                return undefined;
        }
    }, [roadmap, weekNumber, entityType, section, topicIndex, deliverableIndex, resourceIndex]);

    // Save note
    const saveNote = useCallback(async (content: string) => {
        if (!roadmap || weekNumber === undefined) {
            throw new Error('No roadmap loaded or invalid week number');
        }

        const updatedRoadmap = { ...roadmap };
        const phase = updatedRoadmap.phases.find(p => p.weeks.some(w => w.weekNumber === weekNumber));
        if (!phase) throw new Error('Phase not found');

        const week = phase.weeks.find(w => w.weekNumber === weekNumber);
        if (!week) throw new Error('Week not found');

        const timestamp = new Date().toISOString();

        switch (entityType) {
            case 'week':
                week.notes = content;
                break;

            case 'deliverable':
                if (deliverableIndex === undefined || !section) throw new Error('Invalid deliverable reference');
                let deliverables;
                if (section === 'build') deliverables = week.buildSection?.deliverables;
                else if (section === 'research') deliverables = week.researchSection?.deliverables;
                else if (section === 'share') deliverables = week.shareSection?.deliverables;
                if (deliverables && deliverables[deliverableIndex]) {
                    deliverables[deliverableIndex].notes = content;
                }
                break;

            case 'topic':
                if (topicIndex === undefined) throw new Error('Invalid topic reference');
                const topic = week.researchSection?.deepDiveTopics?.[topicIndex];
                if (topic) {
                    topic.notes = content;
                }
                break;

            case 'resource':
                if (resourceIndex === undefined || topicIndex === undefined) throw new Error('Invalid resource reference');
                const resource = week.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources?.[resourceIndex];
                if (resource) {
                    resource.notes = content;
                }
                break;
        }

        setRoadmapDirect(updatedRoadmap);

        // TODO: Call API to persist changes
        // await fetch(`/api/notes`, {
        //   method: 'POST',
        //   body: JSON.stringify({ entityType, entityId, content, timestamp })
        // });
    }, [roadmap, weekNumber, entityType, section, topicIndex, deliverableIndex, resourceIndex, setRoadmapDirect]);

    const currentNote = getCurrentNote();

    return {
        note: currentNote,
        saveNote,
    };
}
