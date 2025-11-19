'use client';

import { useState, useRef, useEffect } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface RemoveButtonProps {
    onRemove: () => void;
    itemName: string;
    disabled?: boolean;
    className?: string;
    iconSize?: number;
}

export function RemoveButton({
    onRemove,
    itemName,
    disabled = false,
    className = "",
    iconSize = 14
}: RemoveButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove();
        setIsOpen(false);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    const handleTrigger = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!disabled) {
            setIsOpen(true);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleTrigger}
                disabled={disabled}
                className={`p-1 text-text-tertiary hover:text-red-600 rounded-sm hover:bg-red-50 transition-colors ${className}`}
                title={`Remove ${itemName}`}
                aria-label={`Remove ${itemName}`}
            >
                <Trash2 size={iconSize} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 min-w-[280px] bg-surface rounded-md shadow-lg border border-border p-[var(--space-4)] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div ref={dialogRef} className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-100 rounded-full shrink-0">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-text-primary">
                                    Remove Item?
                                </h4>
                                <p className="text-xs text-text-secondary mt-1">
                                    Are you sure you want to remove this {itemName}? This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={handleCancel}
                                className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-transparent hover:bg-bg-secondary rounded-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-sm transition-colors flex items-center gap-1.5"
                            >
                                <Trash2 className="w-3 h-3" />
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
