import { createClient } from '@/lib/supabase/server';
import { ProgressItem } from '@/lib/progress/tracker';

export async function getRoadmapProgress(roadmapId: string): Promise<ProgressItem[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('roadmap_progress')
        .select('*')
        .eq('roadmap_id', roadmapId);

    if (error) {
        console.error('Error fetching progress:', error);
        return [];
    }

    return data.map((item: any) => ({
        id: item.deliverable_path, // mapping path to id
        roadmapId: item.roadmap_id,
        entityType: item.section_type === 'research' && item.deliverable_path.includes('t') ? 'topic' : 'deliverable',
        isCompleted: item.is_completed,
        completedAt: item.completed_at,
        notes: item.user_note,
        rating: item.effectiveness_rating
    }));
}

export async function toggleProgressItem(
    roadmapId: string,
    itemId: string,
    isCompleted: boolean,
    entityType: string,
    section?: string
): Promise<boolean> {
    const supabase = await createClient();

    // Upsert the progress record
    const { error } = await supabase
        .from('roadmap_progress')
        .upsert({
            roadmap_id: roadmapId,
            deliverable_path: itemId,
            is_completed: isCompleted,
            section_type: section || 'build', // Default or derive from ID
            completed_at: isCompleted ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'roadmap_id, deliverable_path'
        });

    if (error) {
        console.error('Error toggling progress:', error);
        return false;
    }

    return true;
}

export async function updateProgressNote(
    roadmapId: string,
    itemId: string,
    note: string
): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase
        .from('roadmap_progress')
        .update({
            user_note: note,
            updated_at: new Date().toISOString()
        })
        .eq('roadmap_id', roadmapId)
        .eq('deliverable_path', itemId);

    if (error) {
        console.error('Error updating note:', error);
        return false;
    }

    return true;
}
