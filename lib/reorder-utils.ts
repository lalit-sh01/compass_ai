import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const reorder = <T>(
    list: T[],
    startIndex: number,
    endIndex: number
): T[] => {
    return arrayMove(list, startIndex, endIndex);
};

export const reorderMap = <T extends { id: UniqueIdentifier }>(
    map: Record<string, T[]>,
    sourceId: string,
    destinationId: string,
    startIndex: number,
    endIndex: number
): Record<string, T[]> => {
    const current = [...map[sourceId]];
    const next = [...map[destinationId]];
    const target = current[startIndex];

    // Moving to same list
    if (sourceId === destinationId) {
        const reordered = reorder(current, startIndex, endIndex);
        return {
            ...map,
            [sourceId]: reordered,
        };
    }

    // Moving to different list
    current.splice(startIndex, 1);
    next.splice(endIndex, 0, target);

    return {
        ...map,
        [sourceId]: current,
        [destinationId]: next,
    };
};
