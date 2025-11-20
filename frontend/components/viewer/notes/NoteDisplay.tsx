'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Clock } from 'lucide-react';
import { MarkdownPreview } from './MarkdownPreview';
import { NoteEditor } from './NoteEditor';
import { EntityType } from '@/lib/notes/note-types';
import { formatTimestamp, isNoteEmpty } from '@/lib/notes/note-utils';

interface NoteDisplayProps {
    entityType: EntityType;
    entityId: string;
    content?: string;
    lastUpdated?: string;
    onSave: (content: string) => Promise<void>;
    title?: string;
}

export function NoteDisplay({
    entityType,
    entityId,
    content = '',
    lastUpdated,
    onSave,
    title = 'Notes',
}: NoteDisplayProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const hasContent = !isNoteEmpty(content);

    const handleSave = async (newContent: string) => {
        await onSave(newContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsExpanded(true);
        setIsEditing(true);
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {/* Header - Always visible */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
                    {hasContent && !isExpanded && (
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                            ({content.substring(0, 50)}{content.length > 50 ? '...' : ''})
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {lastUpdated && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(lastUpdated)}</span>
                        </div>
                    )}
                    {!isEditing && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit();
                            }}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Edit note"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </button>

            {/* Content - Shown when expanded */}
            {isExpanded && (
                <div className="p-4 bg-white dark:bg-gray-900">
                    {isEditing ? (
                        <NoteEditor
                            entityType={entityType}
                            entityId={entityId}
                            initialContent={content}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            autoFocus
                        />
                    ) : hasContent ? (
                        <MarkdownPreview content={content} />
                    ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-500 italic">
                            No notes yet. Click the edit button to add notes.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
