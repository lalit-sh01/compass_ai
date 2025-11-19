'use client';

import { FileText } from 'lucide-react';
import { isNoteEmpty, truncateNote } from '@/lib/notes/note-utils';

interface NoteIconProps {
    content?: string;
    onClick?: () => void;
    className?: string;
}

export function NoteIcon({ content, onClick, className = '' }: NoteIconProps) {
    const hasNote = !isNoteEmpty(content);

    if (!hasNote && !onClick) {
        return null;
    }

    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={`p-1 rounded transition-colors ${hasNote
                        ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    } ${className}`}
                title={hasNote ? 'View note' : 'Add note'}
            >
                <FileText className="w-4 h-4" />
            </button>

            {/* Tooltip preview on hover */}
            {hasNote && content && (
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-10 w-64 p-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded shadow-lg">
                    {truncateNote(content, 150)}
                </div>
            )}
        </div>
    );
}
