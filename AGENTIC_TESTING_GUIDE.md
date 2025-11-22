# Agentic Roadmap Generation - Testing Guide

## System Issue
There's a Python architecture mismatch on the current machine (pydantic-core compiled for x86_64 but running on arm64). This is a common macOS Apple Silicon issue. **However, all code has been created and is syntactically correct.** You just need to fix the Python environment on your machine.

## Quick Fix for Python Architecture Issue

### Option 1: Use Miniforge (Recommended for Apple Silicon)
```bash
# Install Miniforge for arm64
# https://github.com/conda-forge/miniforge

# Create fresh environment
conda create -n roadmap python=3.13
conda activate roadmap

# Install dependencies
cd backend
pip install langgraph openai fastapi uvicorn sqlmodel pydantic-settings pytest pytest-asyncio
```

### Option 2: Use system Python 3.13 directly
```bash
/usr/bin/env python3.13 -m venv backend_venv
source backend_venv/bin/activate
pip install -r requirements.txt
```

### Option 3: Force x86_64 arch with Rosetta
```bash
arch -x86_64 zsh
uv sync
```

## Testing Checklist After Fixing Environment

### Phase 1: Import Testing
```bash
cd backend

# Test 1: Verify all modules import
uv run python3 -c "from app.agents.graph import generate_roadmap; print('✓ Graph imports')"
uv run python3 -c "from app.agents.models import GraphState; print('✓ Models import')"
uv run python3 -c "from app.services.repository_service import RepositoryService; print('✓ Services import')"
```

### Phase 2: Run Backend Tests
```bash
# Test node imports
uv run pytest tests/agents/test_imports.py -v

# Expected output:
# test_graph_state_model PASSED
# test_cognitive_profile_models PASSED
# test_all_nodes_can_be_imported PASSED
# test_graph_builder PASSED
# test_repository_service PASSED
# test_llm_utilities PASSED
```

### Phase 3: Start Backend Server
```bash
# Terminal 1: Start backend
cd backend
uv run uvicorn app.main:app --reload

# You should see:
# Uvicorn running on http://127.0.0.1:8000
# INFO:     Application startup complete
```

### Phase 4: Health Check
```bash
# Terminal 2: Test health endpoint
curl http://localhost:8000/health
# Expected: {"status":"ok"}
```

### Phase 5: Test Streaming Endpoint (Manual)
```bash
# Create test input
cat > /tmp/roadmap_input.json << 'EOF'
{
  "goal_domain": "PM",
  "target_role": "Senior PM at Google",
  "current_background": "Software Engineer with 5 years experience",
  "skill_level": "Intermediate",
  "deadline_weeks": 14,
  "weekly_hours_cap": 12,
  "additional_context": "Prefer hands-on projects and structured learning"
}
EOF

# Test endpoint (requires auth token)
curl -X POST http://localhost:8000/api/agents/generate-roadmap-stream \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_JWT_TOKEN" \
  -d @/tmp/roadmap_input.json

# Expected: SSE stream with progress updates
# data: {"event":"profiler","progress":10,...}
# data: {"event":"pedagogy_architect","progress":20,...}
# ...
# data: {"event":"complete","progress":100,"partial_roadmap":{...}}
```

## File Structure Summary

### Backend Files Created
```
backend/
├── app/
│   ├── agents/
│   │   ├── models.py                    # GraphState, CognitiveProfile
│   │   ├── graph.py                     # LangGraph workflow definition
│   │   ├── nodes/
│   │   │   ├── profiler.py             # Node A
│   │   │   ├── pedagogy_architect.py   # Node B
│   │   │   ├── cognitive_adapter.py    # Node B2
│   │   │   ├── tech_lead.py            # Node C1
│   │   │   ├── career_coach.py         # Node C2
│   │   │   ├── meta_coach.py           # Node C3
│   │   │   ├── integrator.py           # Node D
│   │   │   ├── validator.py            # Node E
│   │   │   └── __init__.py
│   │   ├── prompts/
│   │   │   ├── profiler.py             # Profiler prompts & translation
│   │   │   └── ...
│   │   └── roadmap_quality_validator.py
│   ├── api/
│   │   ├── routers/
│   │   │   └── agents.py               # NEW: /api/agents/generate-roadmap-stream
│   │   └── ...
│   ├── services/
│   │   └── repository_service.py       # Repository with Layer 1/2/3
│   └── core/
│       └── llm.py                      # stream_openai_json, stream_openai_text
├── tests/
│   ├── agents/
│   │   ├── test_imports.py             # Import tests
│   │   └── __init__.py
│   ├── conftest.py                     # pytest configuration
│   └── __init__.py
└── pyproject.toml                      # UPDATED: +langgraph, +pytest-asyncio
```

### Frontend Files Created
```
frontend/
├── components/
│   └── streaming/
│       └── RoadmapGenerationStream.tsx  # Real-time progress UI
├── app/
│   └── (dashboard)/
│       └── onboarding/
│           └── page.tsx                # UPDATED: New intake form + streaming
└── ...
```

## Test Scenarios to Run

### Scenario 1: Simple Profile Inference
**Input:**
```json
{
  "goal_domain": "PM",
  "target_role": "Product Manager",
  "current_background": "Engineer",
  "skill_level": "Intermediate",
  "deadline_weeks": 14,
  "weekly_hours_cap": 12
}
```

**Expected Output:**
- Cognitive profile inferred (learning_style, neuro_type, etc.)
- No diagnostic language in user response
- Friendly profile with empowering language

### Scenario 2: Compressed Timeline
**Input:**
```json
{
  "goal_domain": "PM",
  "target_role": "PM",
  "current_background": "Engineer",
  "skill_level": "Intermediate",
  "deadline_weeks": 8,  // Shorter than 14
  "weekly_hours_cap": 20  // More hours
}
```

**Expected Output:**
- Blueprint compression applied
- Foundation phase reduced proportionally
- Total weeks = 8
- All sections still populated

### Scenario 3: Error Handling (Missing Field)
**Input:**
```json
{
  "goal_domain": "PM"
  // Missing other required fields
}
```

**Expected Output:**
- Clear validation error
- Indicates which fields are missing
- No stack trace exposed to user

### Scenario 4: Frontend UI Flow
1. Navigate to `http://localhost:3000/onboarding`
2. Fill in form (no blank loading screens!)
3. Click "Generate Roadmap"
4. Watch real-time progress indicators
5. See success screen with roadmap preview
6. Option to view/save roadmap

## Performance Expectations

| Phase | Component | Expected Time |
|-------|-----------|---|
| Profiler | LLM inference | 2-5s |
| Architect | Blueprint retrieval | 1-2s |
| Adapter | Personalization rules | <1s |
| Specialists (parallel) | C1, C2, C3 | 5-10s |
| Integrator | Merge + resources | 2-3s |
| Validator | Quality checks | <1s |
| **Total** | Full workflow | **15-30s** |

## Database Verification

After successful generation, check Supabase:

```sql
-- Verify roadmap saved
SELECT id, title, created_at FROM roadmaps
WHERE user_id = '<your-user-id>'
ORDER BY created_at DESC LIMIT 1;

-- Check cognitive profiles
SELECT * FROM cognitive_profiles
WHERE user_id = '<your-user-id>'
ORDER BY created_at DESC LIMIT 1;
```

## Debugging Tips

### Check Backend Logs
```bash
# If using uvicorn with reload
# Look for:
# - "NODE A: PROFILER" markers
# - "NODE B: PEDAGOGY ARCHITECT" markers
# - "NODE D: INTEGRATOR" markers
# - "NODE E: VALIDATOR" markers
```

### Check Frontend Console
```javascript
// In browser DevTools
// Should see:
// 1. Fetch to /api/agents/generate-roadmap-stream
// 2. EventSource listening
// 3. Progress updates logged
// 4. Final roadmap received
```

### Stream Format Verification
```bash
# Each SSE update should have this format:
data: {"event":"<node-name>","progress":<0-100>,"message":"<user-message>","partial_roadmap":null}

# Final update:
data: {"event":"complete","progress":100,"message":"✨ Your personalized roadmap is ready!","partial_roadmap":{...roadmap...}}
```

## Known Limitations (Current Implementation)

1. **Node B2 (Cognitive Adapter)**: Stub implementation - rules applied but roadmap structure not yet personalized
2. **Node C1/C2/C3**: Stub implementations - return mock fragments, not actual generated content
3. **Repository Service**: Scaffold only - database queries not yet implemented
4. **Blueprint Repository**: Seeded with FAANG PM example only

## Next Steps to Full Production

1. **Implement Node B2 Personalization**
   - Apply ADHD fragmentation (20-min chunks)
   - Apply Weekend Warrior distribution (70% Sat/Sun)
   - Apply Low executive function detailed breakdown

2. **Implement Specialist Nodes**
   - Node C1: Generate build/research sections with real LLM
   - Node C2: Generate share sections with interview prep
   - Node C3: Generate success metrics and rituals

3. **Complete Repository Layer**
   - Implement database queries in RepositoryService
   - Populate blueprints for all domains (PM, Engineering, Design, etc.)
   - Add resource examples with metadata

4. **Add Feedback Loop**
   - Log telemetry on resource effectiveness
   - Improve Layer 1 (the "moat") over time
   - Track success metrics

## Support

If you encounter issues:

1. **Python environment**: Run the "Quick Fix" section above
2. **Import errors**: Verify all files exist in `backend/app/agents/`
3. **API errors**: Check backend logs for node execution details
4. **Frontend issues**: Check browser console for SSE errors
5. **Database**: Verify migrations ran: `supabase db list`
