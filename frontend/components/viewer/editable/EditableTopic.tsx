'use client';

import { useState } from 'react';
import { Pencil, X, Save, Trash2 } from 'lucide-react';
import { DeepDiveTopic } from '@/lib/types';
import { generateItemId } from '@/lib/progress/tracker';
import { useSelection } from '@/context/SelectionContext';
import { NoteIcon } from '../notes/NoteIcon';
import { NoteEditor } from '../notes/NoteEditor';
import { useNotes } from '@/hooks/useNotes';

interface EditableTopicProps {
    topic: DeepDiveTopic;
    weekNumber: number;
    index: number;
    isCompleted: boolean;
    onToggle: (id: string, checked: boolean) => void;
    onSave?: (id: string, newDescription: string) => void;
    onDelete?: () => void;
}

export function EditableTopic({
    topic,
    weekNumber,
    index,
    isCompleted,
    onToggle,
    onSave,
    onDelete
}: EditableTopicProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [description, setDescription] = useState(topic.description);

    const { isSelected, toggleSelection, isSelectionMode } = useSelection();
    const itemId = generateItemId(weekNumber, 'topic', index, 'research');
    const selected = isSelected(itemId);
    const showSelectionCheckbox = isSelectionMode;

    const { note, saveNote } = useNotes({
        entityType: 'topic',
        entityId: itemId,
        weekNumber,
        topicIndex: index
    });

    const handleSave = () => {
        if (onSave) {
            onSave(itemId, description);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDescription(topic.description);
        setIsEditing(false);
    };

    return (
        <div className={`group flex items-start gap-3 p-2 rounded-lg transition-colors ${selected ? 'bg-purple-50 dark:bg-purple-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
            <div className="mt-1 flex items-center gap-2">
                {showSelectionCheckbox ? (
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelection(itemId)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                    />
                ) : (
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => onToggle(itemId, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                    />
                )}
            </div>

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            rows={2}
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
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
                    <div className="relative group/text flex items-start justify-between gap-2">
                        <p className={`text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                            {description}
                        </p>

                        <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover/text:opacity-100 transition-opacity bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded px-1">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                                title="Edit topic"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <NoteIcon
                                content={note}
                                onClick={() => setIsNoteOpen(!isNoteOpen)}
                                className="p-1"
                            />
                            {onDelete && (
                                <button
                                    onClick={onDelete}
                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete topic"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Inline Note Editor */}
                {isNoteOpen && (
                    <div className="mt-2">
                        <NoteEditor
                            entityType="topic"
                            entityId={itemId}
                            initialContent={note}
                            onSave={async (content) => {
                                await saveNote(content);
                                setIsNoteOpen(false);
                            }}
                            onCancel={() => setIsNoteOpen(false)}
                            autoFocus
                            placeholder="Add notes for this topic..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
