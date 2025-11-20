/**
 * Utility functions for note operations
 */

import { Note } from './note-types';

/**
 * Format a timestamp for display
 */
export function formatTimestamp(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

/**
 * Truncate note content for preview
 */
export function truncateNote(content: string, maxLength: number = 100): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
}

/**
 * Basic markdown sanitization (remove potentially dangerous content)
 */
export function sanitizeMarkdown(content: string): string {
    // Remove script tags and event handlers
    let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    return sanitized;
}

/**
 * Check if a note is empty or whitespace only
 */
export function isNoteEmpty(content: string | undefined | null): boolean {
    return !content || content.trim().length === 0;
}

/**
 * Get character count for display
 */
export function getCharacterCount(content: string): number {
    return content.length;
}

/**
 * Check if content exceeds max length
 */
export function exceedsMaxLength(content: string, maxLength: number): boolean {
    return content.length > maxLength;
}
