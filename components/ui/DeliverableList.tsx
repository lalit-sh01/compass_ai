'use client';

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { EditableDeliverable } from '../viewer/editable/EditableDeliverable';
import { DraggableDeliverable } from '../viewer/dnd/DraggableDeliverable';
import { AddDeliverableButton } from '../viewer/actions/AddDeliverableButton';

import { useRoadmapMutations } from '@/hooks/useRoadmapMutations';
import { generateItemId } from '@/lib/progress/tracker';
import type { Deliverable, Subtask } from '@/lib/types';

interface DeliverableListProps {
  deliverables: Deliverable[] | Subtask[];
  title?: string;
  weekNumber?: number;
  section?: 'build' | 'research' | 'share';
  roadmapId?: string;
}

export default function DeliverableList({
  deliverables,
  title,
  weekNumber = 1,
  section = 'build',
  roadmapId = 'default'
}: DeliverableListProps) {

  const { addDeliverable, removeDeliverable, reorderDeliverables } = useRoadmapMutations();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = deliverables.findIndex((_, i) =>
        generateItemId(weekNumber, 'deliverable', i, section) === active.id
      );
      const newIndex = deliverables.findIndex((_, i) =>
        generateItemId(weekNumber, 'deliverable', i, section) === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        await reorderDeliverables(weekNumber, section, oldIndex, newIndex);
      }
    }
  };

  const handleToggle = (id: string, checked: boolean) => {
    // TODO: Call API to update progress
    console.log('Toggle', id, checked);
  };

  const handleSave = (id: string, newDescription: string) => {
    // TODO: Call API to update deliverable
    console.log('Save', id, newDescription);
  };

  const handleRemove = async (id: string) => {
    // Extract index from ID or find it
    // ID format: w{weekNumber}-deliverable-{index}-{section}
    // But generateItemId might produce something else.
    // Let's find the index by iterating.
    const index = deliverables.findIndex((_, i) =>
      generateItemId(weekNumber, 'deliverable', i, section) === id
    );

    if (index !== -1) {
      await removeDeliverable(weekNumber, section, index);
    }
  };

  const renderSubtasks = (subtasks: Subtask[] | undefined) => {
    if (!subtasks || subtasks.length === 0) return null;

    return (
      <ul className="ml-8 mt-2 space-y-2">
        {subtasks.map((subtask, idx) => (
          <li key={idx} className="flex items-start gap-2">
            {subtask.isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${subtask.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
              {subtask.description}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  if (!deliverables || deliverables.length === 0) {
    return (
      <div className="space-y-3">
        {title && <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h4>}
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">No deliverables yet</p>
        <AddDeliverableButton
          weekNumber={weekNumber}
          section={section}
          currentCount={0}
          onAdd={async (description) => {
            await addDeliverable(weekNumber, section, description);
          }}
        />
      </div>
    );
  }

  // Generate IDs for sortable items
  const items = deliverables.map((_, index) =>
    generateItemId(weekNumber, 'deliverable', index, section)
  );

  return (
    <div className="space-y-3">
      {title && <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h4>}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-3">
            {deliverables.map((item, index) => {
              const id = generateItemId(weekNumber, 'deliverable', index, section);
              return (
                <li key={id} className="space-y-2">
                  <DraggableDeliverable
                    id={id}
                    deliverable={item as Deliverable}
                    weekNumber={weekNumber}
                    index={index}
                    section={section}
                    roadmapId={roadmapId}
                    isCompleted={item.isCompleted}
                    onToggle={handleToggle}
                    onSave={handleSave}
                    onRemove={handleRemove}
                  />
                  {'subtasks' in item && renderSubtasks(item.subtasks)}
                </li>
              );
            })}
          </ul>
        </SortableContext>
      </DndContext>

      {/* Add button - always visible now */}
      <AddDeliverableButton
        weekNumber={weekNumber}
        section={section}
        currentCount={deliverables.length}
        onAdd={async (description) => {
          await addDeliverable(weekNumber, section, description);
        }}
      />
    </div>
  );
}
