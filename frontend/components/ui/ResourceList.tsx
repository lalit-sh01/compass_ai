'use client';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { EditableResource } from '../viewer/editable/EditableResource';
import { DraggableResource } from '../viewer/dnd/DraggableResource';
import { AddResourceButton } from '../viewer/actions/AddResourceButton';

import { useRoadmapMutations } from '@/hooks/useRoadmapMutations';
import { generateItemId } from '@/lib/progress/tracker';
import type { Resource } from '@/lib/types';

interface ResourceListProps {
    resources: Resource[];
    weekNumber: number;
    topicIndex: number;
    topicDescription?: string;
}

export default function ResourceList({
    resources,
    weekNumber,
    topicIndex,
    topicDescription = 'Topic'
}: ResourceListProps) {

    const { addResource, removeResource, reorderResources } = useRoadmapMutations();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = resources.findIndex((_, i) =>
                generateItemId(weekNumber, 'resource', i, `topic-${topicIndex}`) === active.id
            );
            const newIndex = resources.findIndex((_, i) =>
                generateItemId(weekNumber, 'resource', i, `topic-${topicIndex}`) === over.id
            );

            if (oldIndex !== -1 && newIndex !== -1) {
                await reorderResources(weekNumber, topicIndex, oldIndex, newIndex);
            }
        }
    };

    const handleSave = (newResource: Resource) => {
        // TODO: Implement update resource
        console.log('Save resource', newResource);
    };

    const handleRemove = async (index: number) => {
        await removeResource(weekNumber, topicIndex, index);
    };

    if (!resources || resources.length === 0) {
        return (
            <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Resources</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">No resources yet</p>
                <AddResourceButton
                    topicId={`w${weekNumber}-t${topicIndex}`}
                    topicDescription={topicDescription}
                    currentCount={0}
                    onAdd={async (resource) => {
                        await addResource(weekNumber, topicIndex, resource);
                    }}
                />
            </div>
        );
    }

    // Generate IDs for sortable items
    const items = resources.map((_, index) =>
        generateItemId(weekNumber, 'resource', index, `topic-${topicIndex}`)
    );

    return (
        <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Resources</div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-1">
                        {resources.map((resource, index) => {
                            const id = generateItemId(weekNumber, 'resource', index, `topic-${topicIndex}`);
                            return (
                                <DraggableResource
                                    key={id}
                                    id={id}
                                    resource={resource}
                                    weekNumber={weekNumber}
                                    topicIndex={topicIndex}
                                    index={index}
                                    onSave={handleSave}
                                    onDelete={() => handleRemove(index)}
                                />
                            );
                        })}
                    </div>
                </SortableContext>
            </DndContext>

            <AddResourceButton
                topicId={`w${weekNumber}-t${topicIndex}`}
                topicDescription={topicDescription}
                currentCount={resources.length}
                onAdd={async (resource) => {
                    await addResource(weekNumber, topicIndex, resource);
                }}
            />
        </div>
    );
}
