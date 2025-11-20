'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SelectionContextType {
    selectedIds: Set<string>;
    toggleSelection: (id: string) => void;
    clearSelection: () => void;
    selectAll: (ids: string[]) => void;
    isSelected: (id: string) => boolean;
    hasSelection: boolean;
    selectionCount: number;
    isSelectionMode: boolean;
    toggleSelectionMode: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSelectionMode, setIsSelectionMode] = useState(false);

    const toggleSelection = useCallback((id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedIds(new Set());
        setIsSelectionMode(false);
    }, []);

    const selectAll = useCallback((ids: string[]) => {
        setSelectedIds(new Set(ids));
    }, []);

    const isSelected = useCallback((id: string) => {
        return selectedIds.has(id);
    }, [selectedIds]);

    const toggleSelectionMode = useCallback(() => {
        setIsSelectionMode(prev => {
            if (prev) {
                // Exiting selection mode, clear selection
                setSelectedIds(new Set());
            }
            return !prev;
        });
    }, []);

    return (
        <SelectionContext.Provider value={{
            selectedIds,
            toggleSelection,
            clearSelection,
            selectAll,
            isSelected,
            hasSelection: selectedIds.size > 0,
            selectionCount: selectedIds.size,
            isSelectionMode: isSelectionMode || selectedIds.size > 0, // Auto-enable if items are selected
            toggleSelectionMode
        }}>
            {children}
        </SelectionContext.Provider>
    );
}

export function useSelection() {
    const context = useContext(SelectionContext);
    if (context === undefined) {
        throw new Error('useSelection must be used within a SelectionProvider');
    }
    return context;
}
