'use client';

import { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { DEFAULT_CONTENT_GUARDRAILS } from '@/lib/validation/guardrails';

interface AddDeliverableButtonProps {
    weekNumber: number;
    section: 'build' | 'research' | 'share';
    currentCount: number;
    onAdd: (description: string) => Promise<void>;
}

export function AddDeliverableButton({
    weekNumber,
    section,
    currentCount,
    onAdd
}: AddDeliverableButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxDeliverables = DEFAULT_CONTENT_GUARDRAILS.deliverables.maxPerWeek;
    const canAdd = currentCount < maxDeliverables;

    const handleAdd = () => {
        setIsAdding(true);
        setDescription('');
        setErrors([]);
        setWarnings([]);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setDescription('');
        setErrors([]);
        setWarnings([]);
    };

    const handleSave = async () => {
        // Validate description
        const errors: string[] = [];
        const warnings: string[] = [];

        if (!description || description.trim() === '') {
            errors.push('Deliverable description is required.');
        } else if (description.length < 10) {
            warnings.push('Description is very short. Consider being more specific about what needs to be delivered.');
        }

        // Check for vague terms
        const vagueTerms = ['complete', 'finish', 'do', 'work on', 'project'];
        const lowerDesc = description.toLowerCase();
        const hasVagueTerm = vagueTerms.some(term =>
            lowerDesc.includes(term) && lowerDesc.split(' ').length < 5
        );

        if (hasVagueTerm) {
            warnings.push('Description seems vague. Be specific about what will be delivered (e.g., "Deploy to Vercel with public URL").');
        }

        if (errors.length > 0) {
            setErrors(errors);
            setWarnings(warnings);
            return;
        }

        setWarnings(warnings);

        try {
            setIsSubmitting(true);
            await onAdd(description);
            setIsAdding(false);
            setDescription('');
            setErrors([]);
            setWarnings([]);
        } catch (error) {
            setErrors(['Failed to add deliverable. Please try again.']);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!canAdd) {
        return (
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                Maximum {maxDeliverables} deliverables reached
            </div>
        );
    }

    if (isAdding) {
        return (
            <div className="p-[var(--space-3)] border-2 border-dashed border-primary/30 rounded-md bg-primary/5 space-y-[var(--space-3)]">
                <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                        New Deliverable
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g., Deploy working prototype to Vercel with public URL"
                        className={`w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary ${errors.length > 0 ? 'border-red-500' : ''
                            }`}
                        rows={2}
                        autoFocus
                        disabled={isSubmitting}
                    />
                </div>

                {/* Errors */}
                {errors.length > 0 && (
                    <div className="space-y-1">
                        {errors.map((error, idx) => (
                            <p key={idx} className="text-xs text-red-600">
                                ❌ {error}
                            </p>
                        ))}
                    </div>
                )}

                {/* Warnings */}
                {warnings.length > 0 && (
                    <div className="space-y-1">
                        {warnings.map((warning, idx) => (
                            <p key={idx} className="text-xs text-yellow-600">
                                ⚠️ {warning}
                            </p>
                        ))}
                    </div>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting || !description.trim()}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Save className="w-3 h-3" />
                        {isSubmitting ? 'Adding...' : 'Add'}
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary bg-transparent rounded-sm hover:bg-bg-secondary hover:text-text-primary disabled:opacity-50 transition-colors"
                    >
                        <X className="w-3 h-3" />
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 text-xs font-medium text-text-tertiary hover:text-primary transition-colors py-1"
        >
            <Plus className="w-3.5 h-3.5" />
            Add deliverable
        </button>
    );
}
