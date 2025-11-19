'use client';

import { useState } from 'react';
import { Pencil, X, Save, ExternalLink } from 'lucide-react';
import { Resource } from '@/lib/types';
import { RemoveButton } from '../actions/RemoveButton';

import { useSelection } from '@/context/SelectionContext';
import { generateItemId } from '@/lib/progress/tracker';
import { NoteIcon } from '../notes/NoteIcon';
import { NoteEditor } from '../notes/NoteEditor';
import { useNotes } from '@/hooks/useNotes';

interface EditableResourceProps {
    resource: Resource;
    weekNumber?: number;
    topicIndex?: number;
    index?: number;
    onSave?: (newResource: Resource) => void;
    onDelete?: () => void;
}

export function EditableResource({
    resource,
    weekNumber,
    topicIndex,
    index,
    onSave,
    onDelete,
}: EditableResourceProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [editedResource, setEditedResource] = useState(resource);

    const { note, saveNote } = useNotes({
        entityType: 'resource',
        entityId: resource.url || resource.title || 'resource',
        weekNumber,
        topicIndex,
        resourceIndex: index
    });

    const { isSelected, toggleSelection, isSelectionMode } = useSelection();

    // Generate ID only if we have all necessary indices
    const itemId = (weekNumber !== undefined && topicIndex !== undefined && index !== undefined)
        ? generateItemId(weekNumber, 'resource', index, `topic-${topicIndex}`)
        : null;

    const selected = itemId ? isSelected(itemId) : false;
    const showSelectionCheckbox = isSelectionMode && itemId; // Only show when in selection mode

    const handleSave = () => {
        if (onSave) {
            onSave(editedResource);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedResource(resource);
        setIsEditing(false);
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'video': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
            case 'article': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            case 'course': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
            case 'book': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    if (isEditing) {
        return (
            <div className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                    <input
                        type="text"
                        value={editedResource.title}
                        onChange={(e) => setEditedResource({ ...editedResource, title: e.target.value })}
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">URL</label>
                    <input
                        type="text"
                        value={editedResource.url}
                        onChange={(e) => setEditedResource({ ...editedResource, url: e.target.value })}
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={editedResource.type}
                        onChange={(e) => setEditedResource({ ...editedResource, type: e.target.value as any })}
                        className="p-2 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="Article">Article</option>
                        <option value="Video">Video</option>
                        <option value="Course">Course</option>
                        <option value="Book">Book</option>
                        <option value="Tool">Tool</option>
                    </select>
                    <div className="flex-1 flex justify-end gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            <Save className="w-3 h-3" /> Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                        >
                            <X className="w-3 h-3" /> Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`group relative flex items-center gap-2 p-2 rounded transition-colors ${selected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}>
            {showSelectionCheckbox && itemId && (
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleSelection(itemId)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer flex-shrink-0"
                />
            )}

            <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 flex-1 min-w-0"
            >
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type}
                </span>
                <span className="text-sm text-blue-600 hover:underline truncate dark:text-blue-400">
                    {resource.title}
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <div className="flex items-center gap-1 transition-opacity ml-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded px-1 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(true);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    title="Edit resource"
                >
                    <Pencil className="w-3.5 h-3.5" />
                </button>
                <NoteIcon
                    content={note}
                    onClick={() => setIsNoteOpen(!isNoteOpen)}
                    className="p-1"
                />
                {onDelete && (
                    <RemoveButton
                        onRemove={onDelete}
                        itemName="resource"
                        iconSize={14}
                    />
                )}
            </div>

            {/* Inline Note Editor */}
            {isNoteOpen && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1">
                    <NoteEditor
                        entityType="resource"
                        entityId={itemId || resource.url || resource.title}
                        initialContent={note}
                        onSave={async (content) => {
                            await saveNote(content);
                            setIsNoteOpen(false);
                        }}
                        onCancel={() => setIsNoteOpen(false)}
                        autoFocus
                        placeholder="Add notes for this resource..."
                    />
                </div>
            )}
        </div>
    );
}
