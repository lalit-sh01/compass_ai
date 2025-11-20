-- Fix edit_history column type mismatch
-- Change from JSONB[] (array) to JSONB (single object containing array)

ALTER TABLE roadmaps 
ALTER COLUMN edit_history TYPE JSONB USING edit_history::text::jsonb;

-- Set default to empty array as JSONB
ALTER TABLE roadmaps 
ALTER COLUMN edit_history SET DEFAULT '[]'::jsonb;
