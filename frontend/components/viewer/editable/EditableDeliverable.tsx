'use client';

import { useState } from 'react';
import { Check, Pencil, X, Save } from 'lucide-react';
import { Deliverable } from '@/lib/types';
import { generateItemId } from '@/lib/progress/tracker';
import { RemoveButton } from '../actions/RemoveButton';
import { useSelection } from '@/context/SelectionContext';
import { NoteIcon } from '../notes/NoteIcon';
import { NoteEditor } from '../notes/NoteEditor';
import { useNotes } from '@/hooks/useNotes';

interface EditableDeliverableProps {
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

export function EditableDeliverable({
    deliverable,
    weekNumber,
    index,
    section,
    roadmapId,
    isCompleted,
    onToggle,
    onSave,
    onRemove,
}: EditableDeliverableProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [description, setDescription] = useState(deliverable.description);
    const itemId = generateItemId(weekNumber, 'deliverable', index, section);

    const { note, saveNote } = useNotes({
        entityType: 'deliverable',
        entityId: itemId,
        weekNumber,
        section,
        deliverableIndex: index
    });

    const { isSelected, toggleSelection, isSelectionMode } = useSelection();
    const selected = isSelected(itemId);
    const showSelectionCheckbox = isSelectionMode; // Only show when in selection mode

    const handleSave = () => {
        if (onSave) {
            onSave(itemId, description);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDescription(deliverable.description);
        setIsEditing(false);
    };

    return (
        <div className={`group flex items-start gap-3 p-2 rounded-lg transition-colors ${selected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}>
            {/* Selection checkbox - only visible when in selection mode */}
            {showSelectionCheckbox && (
                <div className="mt-1 flex items-center">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelection(itemId)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                    />
                </div>
            )}

            {/* Completion checkbox - only visible when NOT in selection mode */}
            {!showSelectionCheckbox && (
                <div className="mt-1">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => onToggle(itemId, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                    />
                </div>
            )}

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            rows={2}
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                <Save className="w-3 h-3" /> Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                            >
                                <X className="w-3 h-3" /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="relative group/text pr-16">
                        <p className={`text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                            {description}
                        </p>
                        {/* Edit controls - always available on hover (desktop) or always visible (mobile) */}
                        <div className="absolute right-0 top-0 flex items-center gap-1 transition-opacity bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded px-1 opacity-100 md:opacity-0 md:group-hover/text:opacity-100">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Edit deliverable"
                            >
                                <Pencil className="w-3 h-3" />
                            </button>
                            <NoteIcon
                                content={note}
                                onClick={() => setIsNoteOpen(!isNoteOpen)}
                                className="p-1"
                            />
                            {onRemove && (
                                <RemoveButton
                                    onRemove={() => onRemove(itemId)}
                                    itemName="deliverable"
                                    iconSize={12}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Inline Note Editor */}
                {isNoteOpen && (
                    <div className="mt-2">
                        <NoteEditor
                            entityType="deliverable"
                            entityId={itemId}
                            initialContent={note}
                            onSave={async (content) => {
                                await saveNote(content);
                                setIsNoteOpen(false);
                            }}
                            onCancel={() => setIsNoteOpen(false)}
                            autoFocus
                            placeholder="Add notes for this deliverable..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
