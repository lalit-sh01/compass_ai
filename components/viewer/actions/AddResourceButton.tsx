'use client';

import { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { DEFAULT_CONTENT_GUARDRAILS } from '@/lib/validation/guardrails';
import type { Resource } from '@/lib/types';

interface AddResourceButtonProps {
    topicId: string;
    topicDescription: string;
    currentCount: number;
    onAdd: (resource: Omit<Resource, 'url'> & { url: string }) => Promise<void>;
}

export function AddResourceButton({
    topicId,
    topicDescription,
    currentCount,
    onAdd
}: AddResourceButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [type, setType] = useState<string>('Article');
    const [errors, setErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxResources = DEFAULT_CONTENT_GUARDRAILS.resources.maxPerTopic;
    const canAdd = currentCount < maxResources;

    const handleAdd = () => {
        setIsAdding(true);
        setTitle('');
        setUrl('');
        setType('Article');
        setErrors([]);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setTitle('');
        setUrl('');
        setType('Article');
        setErrors([]);
    };

    const validateUrl = (urlString: string): boolean => {
        if (!urlString || urlString.trim() === '') {
            return false;
        }

        try {
            const urlObj = new URL(urlString);
            return ['http:', 'https:'].includes(urlObj.protocol);
        } catch {
            return false;
        }
    };

    const handleSave = async () => {
        const validationErrors: string[] = [];

        // Validate title
        if (!title || title.trim() === '') {
            validationErrors.push('Resource title is required.');
        } else if (title.length < 3) {
            validationErrors.push('Title is too short. Use a descriptive title.');
        }

        // Validate URL
        if (!url || url.trim() === '') {
            validationErrors.push('URL is required.');
        } else if (!validateUrl(url)) {
            validationErrors.push('Invalid URL. Must start with http:// or https://');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            await onAdd({ title: title.trim(), url: url.trim(), type });
            setIsAdding(false);
            setTitle('');
            setUrl('');
            setType('Article');
            setErrors([]);
        } catch (error) {
            setErrors(['Failed to add resource. Please try again.']);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!canAdd) {
        return (
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                Maximum {maxResources} resources reached
            </div>
        );
    }

    if (isAdding) {
        return (
            <div className="p-[var(--space-3)] border-2 border-dashed border-primary/30 rounded-md bg-primary/5 space-y-[var(--space-3)]">
                <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                        Resource Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., React Hooks Complete Guide"
                        className={`w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary ${errors.some(e => e.includes('title')) ? 'border-red-500' : ''
                            }`}
                        autoFocus
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                        URL
                    </label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/resource"
                        className={`w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary ${errors.some(e => e.includes('URL')) ? 'border-red-500' : ''
                            }`}
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                        Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary"
                        disabled={isSubmitting}
                    >
                        <option value="Article">Article</option>
                        <option value="Video">Video</option>
                        <option value="Course">Course</option>
                        <option value="Book">Book</option>
                        <option value="Tool">Tool</option>
                        <option value="Documentation">Documentation</option>
                    </select>
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

                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting || !title.trim() || !url.trim()}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Save className="w-3 h-3" />
                        {isSubmitting ? 'Adding...' : 'Add Resource'}
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
            Add resource
        </button>
    );
}
