'use client';

import { useDroppable } from '@dnd-kit/core';

interface DropZoneProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export function DropZone({ id, children, className = '' }: DropZoneProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`transition-colors ${isOver ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800 rounded-lg' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
}
