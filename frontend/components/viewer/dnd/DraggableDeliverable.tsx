'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { EditableDeliverable } from '../editable/EditableDeliverable';
import { Deliverable } from '@/lib/types';

interface DraggableDeliverableProps {
    id: string;
    deliverable: Deliverable;
    weekNumber: number;
    index: number;
    section: 'build' | 'research' | 'share';
    roadmapId: string;
    isCompleted: boolean;
    onToggle: (id: string, checked: boolean) => void;
    onSave?: (id: string, newDescription: string) => void;
    onRemove?: (id: string) => void;
}

export function DraggableDeliverable({
    id,
    deliverable,
    weekNumber,
    index,
    section,
    roadmapId,
    isCompleted,
    onToggle,
    onSave,
    onRemove,
}: DraggableDeliverableProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-start gap-2 group/drag">
            <div
                {...attributes}
                {...listeners}
                className="mt-3 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 opacity-0 group-hover/drag:opacity-100 transition-opacity"
            >
                <GripVertical className="w-4 h-4" />
            </div>
            <div className="flex-1">
                <EditableDeliverable
                    deliverable={deliverable}
                    weekNumber={weekNumber}
                    index={index}
                    section={section}
                    roadmapId={roadmapId}
                    isCompleted={isCompleted}
                    onToggle={onToggle}
                    onSave={onSave}
                    onRemove={onRemove}
                />
            </div>
        </div>
    );
}
