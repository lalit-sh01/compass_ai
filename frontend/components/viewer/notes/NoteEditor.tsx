'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { FileText, Save, X, Clock } from 'lucide-react';
import { EntityType } from '@/lib/notes/note-types';
import { formatTimestamp, getCharacterCount, exceedsMaxLength } from '@/lib/notes/note-utils';

interface NoteEditorProps {
    entityType: EntityType;
    entityId: string;
    initialContent?: string;
    onSave: (content: string) => Promise<void>;
    onCancel?: () => void;
    placeholder?: string;
    maxLength?: number;
    autoFocus?: boolean;
}

export function NoteEditor({
    entityType,
    entityId,
    initialContent = '',
    onSave,
    onCancel,
    placeholder = 'Add your notes here... (Markdown supported)',
    maxLength = 2000,
    autoFocus = false,
}: NoteEditorProps) {
    const [content, setContent] = useState(initialContent);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const characterCount = getCharacterCount(content);
    const isOverLimit = exceedsMaxLength(content, maxLength);

    // Auto-focus if requested
    useEffect(() => {
        if (autoFocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [autoFocus]);

    // Auto-save logic
    const performSave = useCallback(async () => {
        if (!hasChanges || isSaving || isOverLimit) return;

        setIsSaving(true);
        try {
            await onSave(content);
            setLastSaved(new Date().toISOString());
            setHasChanges(false);
        } catch (error) {
            console.error('Failed to save note:', error);
        } finally {
            setIsSaving(false);
        }
    }, [content, hasChanges, isSaving, isOverLimit, onSave]);

    // Set up auto-save timer
    useEffect(() => {
        if (hasChanges && !isSaving) {
            // Clear existing timer
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }

            // Set new timer for 3 seconds
            autoSaveTimerRef.current = setTimeout(() => {
                performSave();
            }, 3000);
        }

        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [hasChanges, isSaving, performSave]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setHasChanges(true);
    };

    const handleManualSave = async () => {
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }
        await performSave();
    };

    const handleCancel = () => {
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }
        setContent(initialContent);
        setHasChanges(false);
        onCancel?.();
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">Note</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    {lastSaved && (
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Saved {formatTimestamp(lastSaved)}</span>
                        </div>
                    )}
                    {isSaving && <span className="text-blue-600 dark:text-blue-400">Saving...</span>}
                </div>
            </div>

            {/* Textarea */}
            <textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                placeholder={placeholder}
                className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y"
                maxLength={maxLength}
            />

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-gray-500 dark:text-gray-500">
                    <span className={isOverLimit ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                        {characterCount} / {maxLength}
                    </span>
                    {isOverLimit && <span className="ml-2 text-red-600 dark:text-red-400">Character limit exceeded</span>}
                </div>

                <div className="flex items-center gap-2">
                    {onCancel && (
                        <button
                            onClick={handleCancel}
                            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        >
                            <X className="w-4 h-4 inline mr-1" />
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={handleManualSave}
                        disabled={!hasChanges || isSaving || isOverLimit}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Markdown hint */}
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-600">
                Supports Markdown: **bold**, *italic*, [links](url), lists, etc.
            </div>
        </div>
    );
}
