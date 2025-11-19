'use client';

import { CheckSquare, X } from 'lucide-react';
import { useSelection } from '@/context/SelectionContext';

export function SelectionToggle() {
    const { isSelectionMode, toggleSelectionMode } = useSelection();

    return (
        <button
            onClick={toggleSelectionMode}
            className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
        ${isSelectionMode
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                }
      `}
            aria-label={isSelectionMode ? 'Cancel selection' : 'Select items'}
        >
            {isSelectionMode ? (
                <>
                    <X className="w-4 h-4" />
                    <span>Cancel Selection</span>
                </>
            ) : (
                <>
                    <CheckSquare className="w-4 h-4" />
                    <span>Select Items</span>
                </>
            )}
        </button>
    );
}
