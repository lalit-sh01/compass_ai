'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { EditableResource } from '../editable/EditableResource';
import { Resource } from '@/lib/types';

interface DraggableResourceProps {
    id: string;
    resource: Resource;
    weekNumber?: number;
    topicIndex?: number;
    index?: number;
    onSave?: (newResource: Resource) => void;
    onDelete?: () => void;
}

export function DraggableResource({
    id,
    resource,
    weekNumber,
    topicIndex,
    index,
    onSave,
    onDelete,
}: DraggableResourceProps) {
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
        <div ref={setNodeRef} style={style} className="flex items-center gap-2 group/drag">
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 opacity-0 group-hover/drag:opacity-100 transition-opacity"
            >
                <GripVertical className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <EditableResource
                    resource={resource}
                    weekNumber={weekNumber}
                    topicIndex={topicIndex}
                    index={index}
                    onSave={onSave}
                    onDelete={onDelete}
                />
            </div>
        </div>
    );
}
