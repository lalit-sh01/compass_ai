-- Users table (synced from Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User API Keys (encrypted)
CREATE TABLE user_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'openai',
  encrypted_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roadmaps with versioning
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Metadata
  title TEXT NOT NULL,
  goal TEXT,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'paused', 'archived')),

  -- Roadmap Content (Versioning)
  original_roadmap JSONB NOT NULL,
  current_roadmap JSONB NOT NULL,
  customizations JSONB DEFAULT '{}'::jsonb,

  -- Version Control
  version INTEGER DEFAULT 1,
  edit_history JSONB[] DEFAULT ARRAY[]::JSONB[],

  -- Dates
  start_date TIMESTAMP WITH TIME ZONE,
  target_end_date TIMESTAMP WITH TIME ZONE,
  total_duration_weeks INTEGER,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_viewed_at TIMESTAMP WITH TIME ZONE,

  -- Flags
  is_archived BOOLEAN DEFAULT false
);

-- Progress Tracking
CREATE TABLE roadmap_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,

  -- Location
  phase_number INTEGER,
  week_number INTEGER,
  section_type TEXT CHECK (section_type IN ('build', 'research', 'share')),
  deliverable_path TEXT,

  -- Progress
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  user_note TEXT,
  effectiveness_rating INTEGER CHECK (effectiveness_rating BETWEEN 1 AND 5),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(roadmap_id, deliverable_path)
);

-- Assessments
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,

  assessment_data JSONB NOT NULL,
  gap_analysis JSONB NOT NULL,
  selected_skills JSONB,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX idx_roadmaps_status ON roadmaps(status);
CREATE INDEX idx_roadmaps_archived ON roadmaps(is_archived);
CREATE INDEX idx_progress_roadmap_id ON roadmap_progress(roadmap_id);
CREATE INDEX idx_progress_week ON roadmap_progress(roadmap_id, week_number);
CREATE INDEX idx_user_api_keys_user_id ON user_api_keys(user_id);
CREATE INDEX idx_assessments_user_id ON assessments(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (clerk_user_id = current_user);
CREATE POLICY "Users can view own API keys" ON user_api_keys FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
CREATE POLICY "Users can view own roadmaps" ON roadmaps FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
CREATE POLICY "Users can view own progress" ON roadmap_progress FOR ALL USING (roadmap_id IN (SELECT id FROM roadmaps WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user)));
CREATE POLICY "Users can view own assessments" ON assessments FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
