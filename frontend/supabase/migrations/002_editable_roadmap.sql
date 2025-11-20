-- Migration: 002_editable_roadmap.sql
-- Purpose: Add columns for editable roadmap features (Phase 5)
-- Created: November 16, 2025

-- Add new columns to roadmaps table for editing features
ALTER TABLE roadmaps
ADD COLUMN IF NOT EXISTS user_notes JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS skipped_weeks INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN IF NOT EXISTS hidden_weeks INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN IF NOT EXISTS progress_state JSONB DEFAULT '{
  "deliverables": {},
  "topics": {},
  "weeks": {},
  "phases": {},
  "overall": 0
}'::jsonb;

-- Create GIN indexes for JSONB columns for better query performance
CREATE INDEX IF NOT EXISTS idx_roadmaps_user_notes ON roadmaps USING GIN (user_notes);
CREATE INDEX IF NOT EXISTS idx_roadmaps_progress_state ON roadmaps USING GIN (progress_state);
CREATE INDEX IF NOT EXISTS idx_roadmaps_customizations ON roadmaps USING GIN (customizations);
CREATE INDEX IF NOT EXISTS idx_roadmaps_edit_history ON roadmaps USING GIN (edit_history);

-- Create index for skipped/hidden weeks arrays
CREATE INDEX IF NOT EXISTS idx_roadmaps_skipped_weeks ON roadmaps USING GIN (skipped_weeks);
CREATE INDEX IF NOT EXISTS idx_roadmaps_hidden_weeks ON roadmaps USING GIN (hidden_weeks);

-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to roadmaps table to auto-update updated_at
DROP TRIGGER IF EXISTS update_roadmaps_updated_at ON roadmaps;
CREATE TRIGGER update_roadmaps_updated_at
    BEFORE UPDATE ON roadmaps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add trigger to roadmap_progress table to auto-update updated_at
DROP TRIGGER IF EXISTS update_roadmap_progress_updated_at ON roadmap_progress;
CREATE TRIGGER update_roadmap_progress_updated_at
    BEFORE UPDATE ON roadmap_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraint: edit_history max 50 items (for performance)
-- Note: This is a soft constraint - we'll enforce in application code
-- since array_length can be expensive on large JSONB arrays

-- Add comments for documentation
COMMENT ON COLUMN roadmaps.user_notes IS 'User notes keyed by entity (e.g., "w1": "Week 1 notes", "w1-t1": "Topic 1 notes")';
COMMENT ON COLUMN roadmaps.skipped_weeks IS 'Array of week numbers that user marked as skipped';
COMMENT ON COLUMN roadmaps.hidden_weeks IS 'Array of week numbers that user chose to hide from view';
COMMENT ON COLUMN roadmaps.progress_state IS 'Cached aggregate progress state for performance';
COMMENT ON COLUMN roadmaps.edit_history IS 'Last 50 edits for undo/redo functionality';
COMMENT ON COLUMN roadmaps.customizations IS 'Tracks what user has customized vs AI-generated baseline';
