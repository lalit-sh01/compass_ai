# Streaming & User Engagement Strategy for Agentic Roadmap Generation

## Problem Statement

Current UX: Users see blank screen for 30+ seconds during roadmap generation → high dropout rates.

**Goal**: Keep users engaged with real-time progress updates throughout the entire agentic workflow.

---

## 1. Streaming Architecture Overview

### 1.1 Two-Tier Streaming Approach

**Tier 1: Backend Streaming (Node → Node Updates)**
- Each LangGraph node emits updates as it completes
- Updates contain progress status, intermediate results, and user-friendly messages
- Streamed via Server-Sent Events (SSE) or WebSocket

**Tier 2: LLM Streaming (Token-by-Token)**
- Claude/GPT-4 streaming for cognitive profiler insights
- Shows user real-time "thinking" from Node A
- Creates conversational feel

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ RoadmapGenerationStream Component                      │  │
│  │ - Displays progress messages in real-time             │  │
│  │ - Shows partial results (skeleton, blueprints)        │  │
│  │ - Handles SSE connection                              │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                            ↓ SSE / WebSocket
┌──────────────────────────────────────────────────────────────┐
│                Backend (FastAPI)                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ /api/agents/generate-roadmap-stream                   │  │
│  │ - Manages SSE response                                │  │
│  │ - Listens to LangGraph event stream                   │  │
│  │ - Formats updates for frontend                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                            ↓
│  ┌────────────────────────────────────────────────────────┐  │
│  │ LangGraph (with event streaming)                       │  │
│  │ - Node A: Emit profiler insights (per inference)      │  │
│  │ - Node B: Emit blueprint chunks                       │  │
│  │ - Node B2: Emit personalization rules applied         │  │
│  │ - Nodes C1/C2/C3: Emit completion status             │  │
│  │ - Node D: Emit resource count, URLs found             │  │
│  │ - Node E: Emit validation results                     │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Implementation: Real-Time Progress UI

### 2.1 New Component: `RoadmapGenerationStream`

Located: `frontend/components/onboarding/RoadmapGenerationStream.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Zap } from 'lucide-react';

interface StreamUpdate {
  node: string;           // 'profiler' | 'architect' | 'adapter' | 'tech_lead' | 'career_coach' | 'meta_coach' | 'integrator' | 'validator'
  type: 'start' | 'progress' | 'complete' | 'error';
  message: string;        // User-friendly message
  progress: number;       // 0-100 overall
  data?: Record<string, any>;  // Partial data (insights, blueprints, etc)
}

export function RoadmapGenerationStream({
  userContext,
  onComplete,
  onError,
}: {
  userContext: any;
  onComplete: (roadmap: any) => void;
  onError: (error: string) => void;
}) {
  const [updates, setUpdates] = useState<StreamUpdate[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [partialRoadmap, setPartialRoadmap] = useState<any>(null);

  useEffect(() => {
    // Connect to SSE endpoint
    const eventSource = new EventSource('/api/agents/generate-roadmap-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Note: EventSource doesn't support POST with body in browser
    // Solution: Use fetch with Response.body as ReadableStream instead
    // OR: Use Server Actions with async generator

    connectToStreamingAPI(userContext);
  }, []);

  const connectToStreamingAPI = async (userContext: any) => {
    try {
      setIsConnected(true);
      const response = await fetch('/api/agents/generate-roadmap-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_context: userContext }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const update = JSON.parse(line.slice(6)) as StreamUpdate;

              setUpdates(prev => [...prev, update]);
              setCurrentProgress(update.progress);

              if (update.data) {
                setPartialRoadmap(prev => ({
                  ...prev,
                  ...update.data,
                }));
              }

              if (update.type === 'error') {
                onError(update.message);
                return;
              }
            } catch (e) {
              console.error('Failed to parse update:', e);
            }
          }
        }
      }

      // All updates received, return final roadmap
      if (partialRoadmap) {
        onComplete(partialRoadmap);
      }
    } catch (error) {
      onError(String(error));
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Generating your roadmap...</h3>
          <span className="text-sm text-gray-500">{currentProgress}%</span>
        </div>
        <Progress value={currentProgress} className="h-2" />
      </div>

      {/* Timeline of Updates */}
      <div className="space-y-3">
        {updates.map((update, idx) => (
          <div key={idx} className="flex gap-3">
            {/* Status Icon */}
            <div className="flex-shrink-0 mt-1">
              {update.type === 'complete' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {update.type === 'progress' && (
                <Zap className="w-5 h-5 text-blue-600 animate-pulse" />
              )}
              {update.type === 'error' && (
                <div className="w-5 h-5 rounded-full bg-red-600" />
              )}
              {update.type === 'start' && (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>

            {/* Message & Data */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {update.message}
              </p>

              {/* Show partial data if available */}
              {update.data && (
                <div className="mt-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  {JSON.stringify(update.data, null, 2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Show partial roadmap preview */}
      {partialRoadmap && Object.keys(partialRoadmap).length > 0 && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm">Preview Building...</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs overflow-auto max-h-48 text-gray-600 dark:text-gray-300">
              {JSON.stringify(partialRoadmap, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

### 2.2 Update Onboarding Flow

File: `frontend/app/(dashboard)/onboarding/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { RoadmapGenerationStream } from '@/components/onboarding/RoadmapGenerationStream'

type OnboardingStep = 'assessment' | 'generating' | 'preview'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('assessment')
  const [userContext, setUserContext] = useState(null)
  const [roadmap, setRoadmap] = useState(null)

  const handleAssessmentComplete = (context) => {
    // New simplified assessment just gathers goals
    setUserContext(context)
    setCurrentStep('generating')
  }

  const handleGenerationComplete = (roadmap) => {
    setRoadmap(roadmap)
    setCurrentStep('preview')
  }

  return (
    <div className="min-h-screen bg-bg-primary py-8">
      <div className="mx-auto max-w-3xl px-4">
        {currentStep === 'assessment' && (
          <SimpleAssessmentWizard onComplete={handleAssessmentComplete} />
        )}

        {currentStep === 'generating' && (
          <RoadmapGenerationStream
            userContext={userContext}
            onComplete={handleGenerationComplete}
            onError={(error) => {
              console.error(error)
              setCurrentStep('assessment')
            }}
          />
        )}

        {currentStep === 'preview' && (
          <RoadmapPreview roadmap={roadmap} onSave={() => {}} />
        )}
      </div>
    </div>
  )
}
```

---

## 3. Backend Implementation: Streaming Endpoints

### 3.1 SSE Endpoint with LangGraph Events

File: `backend/app/api/routers/agents.py`

```python
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import json
import asyncio
from typing import AsyncGenerator

router = APIRouter()

@router.post("/agents/generate-roadmap-stream")
async def generate_roadmap_stream(request: GenerateRoadmapV2Input):
    """
    Stream roadmap generation progress in real-time.
    Uses Server-Sent Events (SSE) format.
    """
    async def event_generator() -> AsyncGenerator[str, None]:
        try:
            # Build graph
            graph = build_roadmap_generation_graph()

            # Track progress
            progress_counter = 0
            total_nodes = 8  # A, B, B2, C1, C2, C3, D, E

            async for event in graph.astream_events(
                {
                    "user_context": request.user_context,
                    "error_log": []
                },
                config={"version": "v2"}
            ):
                # Parse LangGraph event
                event_type = event.get("event")
                node_name = event.get("name", "unknown")
                data = event.get("data", {})

                if event_type == "on_chain_start":
                    progress = int((progress_counter / total_nodes) * 100)
                    update = {
                        "node": node_name,
                        "type": "start",
                        "message": f"Starting {node_name}...",
                        "progress": progress,
                    }
                    progress_counter += 1
                    yield f"data: {json.dumps(update)}\n\n"

                elif event_type == "on_chain_stream":
                    # LLM is streaming output
                    output = data.get("chunk", "")
                    update = {
                        "node": node_name,
                        "type": "progress",
                        "message": output,
                        "progress": int((progress_counter / total_nodes) * 100),
                    }
                    yield f"data: {json.dumps(update)}\n\n"

                elif event_type == "on_chain_end":
                    # Node completed
                    output = data.get("output", {})
                    progress = int((progress_counter / total_nodes) * 100)

                    # Extract human-readable insights from node output
                    message = format_node_completion(node_name, output)

                    update = {
                        "node": node_name,
                        "type": "complete",
                        "message": message,
                        "progress": progress,
                        "data": extract_preview_data(node_name, output),
                    }
                    yield f"data: {json.dumps(update)}\n\n"

                await asyncio.sleep(0.01)  # Prevent hammering

            # Final update
            yield f"data: {json.dumps({
                'node': 'final',
                'type': 'complete',
                'message': 'Roadmap ready!',
                'progress': 100,
            })}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({
                'node': 'error',
                'type': 'error',
                'message': str(e),
                'progress': 0,
            })}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


def format_node_completion(node_name: str, output: dict) -> str:
    """Convert node output to user-friendly message."""
    mapping = {
        "profiler": f"✓ Analyzed your profile: {output.get('neuro_type', 'learning type')} learner",
        "pedagogy_architect": f"✓ Blueprint created: {len(output.get('week_skeletons', []))} weeks planned",
        "cognitive_adapter": f"✓ Personalized: Applied {output.get('rules_applied', 0)} adaptations",
        "tech_lead": f"✓ Built sections: {len(output.get('weeks', []))} weeks with build content",
        "career_coach": f"✓ Networking plan: {len(output.get('interview_questions', []))} interview prep items",
        "meta_coach": f"✓ Success framework: {len(output.get('weekly_rituals', {}))} rituals defined",
        "integrator": f"✓ Resources found: {output.get('resources_found', 0)} curated links added",
        "validator": f"✓ Quality verified: All {output.get('checks_passed', 0)} validation checks passed",
    }
    return mapping.get(node_name, f"✓ {node_name} completed")


def extract_preview_data(node_name: str, output: dict) -> dict:
    """Extract preview data to show user."""
    if node_name == "profiler":
        return {
            "learning_style": output.get("learning_style"),
            "neuro_type": output.get("neuro_type"),
            "executive_function": output.get("executive_function"),
        }
    elif node_name == "pedagogy_architect":
        return {
            "phases": [s.get("theme") for s in output.get("week_skeletons", [])],
            "total_weeks": len(output.get("week_skeletons", [])),
        }
    elif node_name == "integrator":
        return {
            "total_resources": output.get("total_resources"),
            "proven_resources": output.get("proven_resources"),
        }
    return {}
```

### 3.2 LangGraph Configuration for Event Streaming

File: `backend/app/agents/graph.py`

```python
from langgraph.graph import StateGraph
from app.agents.nodes import profiler, pedagogy_architect, cognitive_adapter
from app.agents.nodes import tech_lead, career_coach, meta_coach
from app.agents.nodes import integrator, validator

def build_roadmap_generation_graph():
    """Build the agentic workflow graph with event streaming enabled."""
    workflow = StateGraph(GraphState)

    # Add nodes
    workflow.add_node("profiler", profiler.process)
    workflow.add_node("pedagogy_architect", pedagogy_architect.process)
    workflow.add_node("cognitive_adapter", cognitive_adapter.process)
    workflow.add_node("tech_lead", tech_lead.process)
    workflow.add_node("career_coach", career_coach.process)
    workflow.add_node("meta_coach", meta_coach.process)
    workflow.add_node("integrator", integrator.process)
    workflow.add_node("validator", validator.process)

    # Set entry point
    workflow.set_entry_point("profiler")

    # Linear flow A → B → B2 → (C1 | C2 | C3) → D → E
    workflow.add_edge("profiler", "pedagogy_architect")
    workflow.add_edge("pedagogy_architect", "cognitive_adapter")

    # Parallel execution: all C nodes
    workflow.add_edge("cognitive_adapter", "tech_lead")
    workflow.add_edge("cognitive_adapter", "career_coach")
    workflow.add_edge("cognitive_adapter", "meta_coach")

    # Wait for all C nodes to finish, then integrate
    workflow.add_edge(["tech_lead", "career_coach", "meta_coach"], "integrator")
    workflow.add_edge("integrator", "validator")

    workflow.set_finish_point("validator")

    # Compile with streaming support
    graph = workflow.compile()

    # Enable event streaming in LangGraph
    # This makes astream_events() work
    return graph
```

---

## 4. Node A: Conversational Cognitive Profiler

### 4.1 Node A Implementation with LLM Streaming

File: `backend/app/agents/nodes/profiler.py`

```python
from app.core.llm import stream_openai_response
from app.agents.models import GraphState, CognitiveProfile
import json

async def process(state: GraphState) -> dict:
    """
    Node A: The Profiler (Conversational)

    Infers CognitiveProfile from user context through multi-turn reasoning.
    Streams insights back to user in real-time.
    """
    user_context = state["user_context"]

    system_prompt = """You are an expert Cognitive Profiler and Learning Coach. Your job is to deeply understand how the user's brain works based on their goal and constraints.

You will analyze their input and determine:
1. learning_style: Visual, Text_Based, Project_First, or Academic
2. neuro_type: Neurotypical, ADHD, or High_Anxiety
3. executive_function: High or Low (determines task breakdown needs)
4. schedule_rigidity: Fluid, Weekend_Warrior, or Strict_Calendar

Base your inferences on their language patterns, goals, and constraints:
- "I procrastinate" / "I get distracted" → ADHD
- "I'm worried" / "What if I fail" → High_Anxiety
- "I like building" / "Show me code" → Project_First
- "I prefer videos" → Visual
- "I like reading" → Text_Based
- "I need a strict schedule" → Strict_Calendar
- "I work best weekends" → Weekend_Warrior

Output ONLY valid JSON matching the CognitiveProfile schema.
"""

    user_prompt = f"""Analyze this user profile and infer their cognitive characteristics:

Goal Domain: {user_context.get('goal_domain')}
Target Role: {user_context.get('target_role')}
Current Level: {user_context.get('current_skill_level')}
Weekly Hours: {user_context.get('weekly_hours_cap')}
Deadline: {user_context.get('deadline_weeks')} weeks

Additional context: {user_context.get('additional_context', '')}

Respond with a JSON object matching:
{{
  "learning_style": "Visual|Text_Based|Project_First|Academic",
  "neuro_type": "Neurotypical|ADHD|High_Anxiety",
  "executive_function": "High|Low",
  "schedule_rigidity": "Fluid|Weekend_Warrior|Strict_Calendar",
  "reasoning": "Brief explanation of your inferences"
}}
"""

    # Stream response from LLM
    streamed_text = ""
    async for chunk in stream_openai_response(
        system_prompt,
        user_prompt,
        model="gpt-4o-mini"  # Fast, good for profiling
    ):
        streamed_text += chunk
        # In production, emit to frontend in real-time
        yield {"type": "stream", "content": chunk}

    # Parse final result
    try:
        profile_data = json.loads(streamed_text)
        cognitive_profile = CognitiveProfile(**profile_data)
    except json.JSONDecodeError:
        raise ValueError(f"Failed to parse profiler output: {streamed_text}")

    return {
        "user_context": {
            **state["user_context"],
            "profile": cognitive_profile.model_dump()
        }
    }
```

### 4.2 LLM Streaming Utility

File: `backend/app/core/llm.py` (extend existing)

```python
from openai import AsyncOpenAI

async def stream_openai_response(
    system_prompt: str,
    user_prompt: str,
    model: str = "gpt-4o-mini",
    temperature: float = 0.7,
):
    """Stream response tokens in real-time."""
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    with client.messages.stream(
        model=model,
        max_tokens=1000,
        temperature=temperature,
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}],
    ) as stream:
        async for text in stream.text_stream:
            yield text
```

---

## 5. Engagement Metrics & UX Patterns

### 5.1 Progress Update Messaging

Each node should emit messages that feel human and informative:

```python
# Node A (Profiler)
"Analyzing your profile..."
"I see you value hands-on learning"
"Your tight timeline suggests we focus on essentials"

# Node B (Architect)
"Retrieving blueprint templates for Product Management..."
"Found: FAANG PM Standard (14-week baseline)"
"Planning 3-phase curriculum..."

# Node B2 (Adapter)
"Personalizing for your learning style..."
"Detected: ADHD pattern. Applying micro-task fragmentation."
"✓ Breaking every hour into 20-minute focused blocks"
"✓ Adding dopamine hits (quick wins) between deep work"

# Node C1 (Tech Lead)
"Building your project-based curriculum..."
"Week 1: User Research Framework (2h build, 1h research)"
"Week 2: Competitive Analysis Tool (3h build, 1h research)"

# Node C2 (Career Coach)
"Adding networking & interview prep..."
"✓ 5 mock interview scenarios created"
"✓ LinkedIn optimization tasks scheduled"

# Node C3 (Meta-Coach)
"Defining success framework..."
"✓ Weekly rituals: Monday goal setting, Friday review"
"✓ Red flags identified: Time creep (watch for 15h+ weeks)"

# Node D (Integrator)
"Curating resources..."
"✓ 8 proven resources from knowledge base"
"✓ Searching for 5 additional sources..."
"✓ Validating all links..."

# Node E (Validator)
"Final quality check..."
"✓ Time budget verified (10h/week ≤ 15h cap)"
"✓ All 47 deliverables present"
"✓ Pedagogy check: 100% of weeks have build + share"
"✓ Roadmap ready!"
```

### 5.2 Partial Data Preview (Keep Users Engaged)

Show emerging structure as nodes complete:

```typescript
// After Node B2 completes, show skeleton
{
  "phases": [
    "Phase 1: Foundations (4 weeks)",
    "Phase 2: Core Skills (6 weeks)",
    "Phase 3: Interview Prep (4 weeks)"
  ],
  "adaptations_applied": [
    "ADHD: 20-minute task breakdown",
    "Weekend focused: 70% Sat/Sun allocation"
  ]
}

// After Nodes C1-C3 complete, show section headers
{
  "week_1": {
    "title": "Understanding the PM Role",
    "build_section": "User Research Framework (3h)",
    "research_section": "Core PM Concepts (2h)",
    "share_section": "Networking: Meet 3 PMs (1h)"
  }
}

// After Node D completes, show resource counts
{
  "total_resources": 52,
  "proven_resources": 38,  // From Layer 1/2
  "researched_resources": 14  // Just found
}
```

---

## 6. Implementation Checklist

- [ ] Create `RoadmapGenerationStream.tsx` component with SSE listener
- [ ] Create `/api/agents/generate-roadmap-stream` endpoint with event streaming
- [ ] Update LangGraph to emit `astream_events()`
- [ ] Implement `format_node_completion()` and `extract_preview_data()`
- [ ] Create LLM streaming utility in `core/llm.py`
- [ ] Update Node A (Profiler) to use conversational inference
- [ ] Remove explicit cognitive profile UI (replaced by Node A inference)
- [ ] Simplify frontend assessment to just collect goal/context
- [ ] Add progress indicator styling (icons, animations)
- [ ] Test end-to-end with synthetic user contexts
- [ ] Monitor average time-to-completion for dropoff analysis

---

## 7. Expected Outcomes

### Before (Current)
- User sees blank screen for 30-60 seconds
- No feedback on what's happening
- High abandonment rate
- Users refresh, thinking it's broken

### After (Streaming)
- Immediate feedback: "Analyzing your profile..."
- Sees insights in real-time (cognitive profile emerging)
- Shows progress (3/8 nodes complete)
- Sees partial roadmap structure building
- Feels like collaborating with AI coach, not waiting on a machine
- **Result**: Much lower dropout, higher completion rates

