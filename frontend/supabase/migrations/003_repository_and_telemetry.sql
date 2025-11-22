-- Repository Schema for Context-Aware Agentic Roadmap Generation

-- ============================================================================
-- LAYER 1/2/3: Resource Repository
-- ============================================================================

CREATE TABLE repository_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Basic metadata
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('Video', 'Article', 'Course', 'Paper', 'Tool')),

    -- Classification
    goal_domain TEXT NOT NULL,  -- e.g., "Product Management"
    topic TEXT,  -- e.g., "User Research"
    learning_style TEXT CHECK (learning_style IN ('Visual', 'Text_Based', 'Project_First', 'Academic')),

    -- Efficacy Layer
    efficacy_layer INT DEFAULT 3 CHECK (efficacy_layer IN (1, 2, 3)),
    -- Layer 1: Contextual (high-precision, fully metadata-enriched)
    -- Layer 2: Proven (validated, 50+ users, no errors)
    -- Layer 3: Staging (fresh from web, unproven)

    -- Layer 1 Metadata (Contextual - the "Moat")
    success_rate_visual_learners FLOAT,  -- 0.0-1.0
    success_rate_text_learners FLOAT,
    success_rate_project_first FLOAT,
    success_rate_academic FLOAT,
    avg_completion_time_beginner INT,  -- minutes
    avg_completion_time_intermediate INT,
    avg_completion_time_advanced INT,
    preferred_for_short_burst_focus BOOLEAN DEFAULT FALSE,  -- ADHD-friendly
    preferred_for_structured_milestones BOOLEAN DEFAULT FALSE,  -- Anxiety-friendly

    -- Quality tracking
    uses_count INT DEFAULT 0,  -- How many roadmaps include this?
    error_reports INT DEFAULT 0,  -- Broken links, outdated content, etc
    avg_user_rating FLOAT,  -- 1-5 scale
    last_verified_at TIMESTAMP,

    -- Blacklist mechanism
    is_blacklisted BOOLEAN DEFAULT FALSE,
    blacklist_reason TEXT,  -- e.g., "Content farm", "Broken link", "Spam"

    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_repository_resources_goal_domain ON repository_resources(goal_domain);
CREATE INDEX idx_repository_resources_topic ON repository_resources(topic);
CREATE INDEX idx_repository_resources_efficacy_layer ON repository_resources(efficacy_layer);
CREATE INDEX idx_repository_resources_learning_style ON repository_resources(learning_style);
CREATE INDEX idx_repository_resources_is_blacklisted ON repository_resources(is_blacklisted);
CREATE INDEX idx_repository_resources_url ON repository_resources(url);

-- ============================================================================
-- Blueprints (Templates for different goal_domains)
-- ============================================================================

CREATE TABLE blueprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    goal_domain TEXT UNIQUE NOT NULL,  -- e.g., "Product Management"
    name TEXT NOT NULL,  -- e.g., "FAANG PM Standard"
    description TEXT,

    -- Metadata
    min_weeks INT DEFAULT 12,
    max_weeks INT DEFAULT 16,
    recommended_weeks INT DEFAULT 14,

    -- Blueprint structure (JSON)
    week_skeletons JSONB NOT NULL,  -- List[WeekSkeleton]
    phase_structure JSONB NOT NULL,  -- Phase templates

    -- Versioning
    version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_blueprints_goal_domain ON blueprints(goal_domain);
CREATE INDEX idx_blueprints_is_active ON blueprints(is_active);

-- ============================================================================
-- Telemetry: Feedback Loop for Improving Layer 1
-- ============================================================================

CREATE TABLE resource_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    resource_id UUID REFERENCES repository_resources(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,

    -- Actual outcome
    actual_completion_time INT,  -- minutes taken (null if not completed)
    was_completed BOOLEAN,
    effectiveness_rating INT CHECK (effectiveness_rating BETWEEN 1 AND 5),
    user_notes TEXT,  -- Optional feedback

    -- User context (for ML training)
    user_learning_style_actual TEXT,  -- What worked for them?
    user_neuro_type_actual TEXT,  -- How did they really learn?

    -- Timestamps
    recorded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_resource_telemetry_resource_id ON resource_telemetry(resource_id);
CREATE INDEX idx_resource_telemetry_user_id ON resource_telemetry(user_id);
CREATE INDEX idx_resource_telemetry_roadmap_id ON resource_telemetry(roadmap_id);

-- ============================================================================
-- Domain Blacklist (Centralized)
-- ============================================================================

CREATE TABLE domain_blacklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    domain TEXT UNIQUE NOT NULL,
    reason TEXT,

    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO domain_blacklist (domain, reason) VALUES
    ('w3schools.com', 'Often too shallow for PM content'),
    ('geeksforgeeks.org', 'Variable quality, not curated'),
    ('linkedin.com/posts', 'Social media, not persistent'),
    ('medium.com/random', 'Unvetted creator content')
ON CONFLICT (domain) DO NOTHING;

-- ============================================================================
-- Extended Assessments: Store both technical and friendly cognitive profiles
-- ============================================================================

ALTER TABLE assessments ADD COLUMN IF NOT EXISTS cognitive_profile_technical JSONB;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS cognitive_profile_friendly JSONB;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS profiler_reasoning TEXT;

CREATE INDEX idx_assessments_cognitive_profile ON assessments USING GIN (cognitive_profile_technical);

-- ============================================================================
-- Agent Logs (Optional: for debugging and telemetry)
-- ============================================================================

CREATE TABLE agent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Agent node that generated this log
    node_name TEXT NOT NULL,  -- 'profiler', 'architect', 'adapter', etc

    -- Input/Output for debugging
    input_data JSONB,
    output_data JSONB,
    error_message TEXT,

    -- Performance
    execution_time_ms INT,
    tokens_used INT,  -- For LLM calls

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agent_logs_roadmap_id ON agent_logs(roadmap_id);
CREATE INDEX idx_agent_logs_user_id ON agent_logs(user_id);
CREATE INDEX idx_agent_logs_node_name ON agent_logs(node_name);
CREATE INDEX idx_agent_logs_created_at ON agent_logs(created_at);

-- ============================================================================
-- Enable Row Level Security on new tables
-- ============================================================================

ALTER TABLE repository_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;

-- Repository resources are public (all users can see)
CREATE POLICY "Repository resources are public" ON repository_resources FOR SELECT USING (true);

-- Blueprints are public
CREATE POLICY "Blueprints are public" ON blueprints FOR SELECT USING (true);

-- Users can only see their own telemetry
CREATE POLICY "Users can view own telemetry" ON resource_telemetry FOR SELECT
    USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));

-- Domain blacklist is public (informational)
CREATE POLICY "Domain blacklist is public" ON domain_blacklist FOR SELECT USING (true);

-- Users can only see their own agent logs
CREATE POLICY "Users can view own agent logs" ON agent_logs FOR SELECT
    USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
