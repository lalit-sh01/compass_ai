'use client';

import { Trash2, CheckCircle2, X } from 'lucide-react';
import { useSelection } from '@/context/SelectionContext';
import { useRoadmapMutations } from '@/hooks/useRoadmapMutations';

import { parseItemId } from '@/lib/progress/tracker';

export function BulkActionsBar() {
    const { selectedIds, clearSelection, selectionCount } = useSelection();
    const { removeDeliverable, removeResource, toggleDeliverable } = useRoadmapMutations();

    if (selectionCount === 0) return null;

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${selectionCount} items?`)) {
            const ids = Array.from(selectedIds);

            // Sort IDs to handle deletions from end to start to avoid index shifting issues
            // We need to parse them first to get indices
            const parsedItems = ids.map(id => ({ id, ...parseItemId(id) }));

            // Sort by index descending
            parsedItems.sort((a, b) => b.index - a.index);

            for (const item of parsedItems) {
                if (item.type === 'deliverable' && item.section) {
                    await removeDeliverable(
                        item.weekNumber,
                        item.section as 'build' | 'research' | 'share',
                        item.index
                    );
                } else if (item.type === 'resource' && item.topicIndex !== undefined) {
                    await removeResource(
                        item.weekNumber,
                        item.topicIndex,
                        item.index
                    );
                }
            }
            clearSelection();
        }
    };

    const handleMarkComplete = async () => {
        const ids = Array.from(selectedIds);
        const parsedItems = ids.map(id => ({ id, ...parseItemId(id) }));

        for (const item of parsedItems) {
            if (item.type === 'deliverable' && item.section) {
                await toggleDeliverable(
                    item.weekNumber,
                    item.section as 'build' | 'research' | 'share',
                    item.index,
                    true // Mark as completed
                );
            }
        }
        clearSelection();
    };

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full px-6 py-3 flex items-center gap-4 border border-gray-200 dark:border-gray-700 z-50 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-4">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{selectionCount}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">selected</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleMarkComplete}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors"
                    title="Mark as Complete"
                >
                    <CheckCircle2 className="w-5 h-5" />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    title="Delete Selected"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
                <button
                    onClick={clearSelection}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
