/**
 * Note types and interfaces for the notes system
 */

export interface Note {
    content: string;
    lastUpdated: string;
    createdAt: string;
}

export type EntityType = 'week' | 'deliverable' | 'topic' | 'resource';

export interface NoteMetadata {
    entityType: EntityType;
    entityId: string;
    weekNumber?: number;
    section?: 'build' | 'research' | 'share';
    index?: number;
}
