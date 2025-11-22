# Cognitive Profile: Internal Tags vs. User-Friendly Messaging

## Problem
We need to infer and tag user cognitive patterns for personalized curriculum (internal technical tags), but communicate in positive, empowering language to users (never mentioning "ADHD", "anxiety", etc.)

---

## 1. Internal Tags → User-Friendly Messaging Mapping

### Learning Style

| Internal Tag | User-Facing Description | Example Message to User |
|--------------|-------------------------|------------------------|
| `Visual` | Visual Learner | "We'll include videos and visual diagrams to match how you learn best" |
| `Text_Based` | Reading-Focused Learner | "We'll emphasize written content and technical documentation" |
| `Project_First` | Hands-On Learner | "You'll learn best by building. We'll prioritize projects and real-world application" |
| `Academic` | Theory-First Learner | "We'll start with foundational concepts and frameworks before diving into practice" |

### Neuro Type (CRITICAL - NEVER LABEL USER)

| Internal Tag | User-Facing Profile Trait | Example Message to User |
|--------------|--------------------------|------------------------|
| `ADHD` | Thrives with **Short-Burst Focus** | "We'll break learning into focused 20-minute blocks with built-in breaks—perfect for maintaining high-energy momentum" |
| `High_Anxiety` | Prefers **Structured Milestones** | "We'll include clear checkpoints and progress markers throughout your journey so you always know exactly where you stand" |
| `Neurotypical` | Flexible Learner | "Your roadmap will flow naturally, adapting as needed" |

### Executive Function

| Internal Tag | User-Facing Trait | Example Message to User |
|--------------|------------------|------------------------|
| `High` | Self-Directed Learner | "You prefer working independently with clear high-level goals. We'll focus on strategic direction without micromanagement" |
| `Low` | Thrives with **Detailed Breakdown** | "We'll provide step-by-step guidance with micro-tasks and clear daily actions—you'll always know exactly what to do next" |

### Schedule Rigidity

| Internal Tag | User-Facing Preference | Example Message to User |
|--------------|----------------------|------------------------|
| `Strict_Calendar` | Prefers **Structured Schedule** | "We'll create a day-by-day breakdown so you can calendar everything and stay on track" |
| `Weekend_Warrior` | **Peak-Productivity Weekender** | "We're scheduling 70% of your work for Saturdays & Sundays when you're most energized. Weekdays stay light" |
| `Fluid` | Flexible Schedule | "You've got flexibility—we'll create a rhythm that adapts to your week" |

---

## 2. Data Model: Dual Storage

### Database Schema

```python
# backend/app/models/assessment.py

class CognitiveProfileTechnical(BaseModel):
    """Internal technical tags (never shown to user)"""
    learning_style: Literal["Visual", "Text_Based", "Project_First", "Academic"]
    neuro_type: Literal["Neurotypical", "ADHD", "High_Anxiety"]
    executive_function: Literal["High", "Low"]
    schedule_rigidity: Literal["Fluid", "Weekend_Warrior", "Strict_Calendar"]
    confidence_scores: Dict[str, float]  # How confident was the profiler in each tag?

class CognitiveProfileFriendly(BaseModel):
    """User-facing profile traits (what we tell the user)"""
    learning_approach: str  # e.g., "Hands-On Learner"
    focus_style: str  # e.g., "Thrives with Short-Burst Focus"
    guidance_preference: str  # e.g., "Detailed Breakdown"
    schedule_preference: str  # e.g., "Peak-Productivity Weekender"
    messages: List[str]  # Array of personalized messages to show user

class Assessment(SQLModel, table=True):
    __tablename__ = "assessments"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")

    # Raw input
    goal_domain: str
    target_role: str
    current_skill_level: str
    weekly_hours_cap: int
    deadline_weeks: int

    # Profile (dual storage)
    cognitive_profile_technical: Dict[str, Any] = Field(sa_column=Column(JSON))
    cognitive_profile_friendly: Dict[str, Any] = Field(sa_column=Column(JSON))

    # Profiler reasoning (for debugging)
    profiler_reasoning: str

    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### GraphState Update

```python
class GraphState(TypedDict):
    user_context: Dict[str, Any]  # Raw user input

    # INTERNAL: Technical tags
    cognitive_profile_technical: Dict[str, Any]

    # USER-FACING: Friendly description
    cognitive_profile_friendly: Dict[str, Any]

    blueprint: Dict[str, Any]
    # ... rest of state
```

---

## 3. Node A (Profiler) Implementation

### Updated Profiler Output

```python
# backend/app/agents/nodes/profiler.py

async def process(state: GraphState) -> dict:
    """
    Node A: The Profiler

    Infers technical cognitive tags, then translates to user-friendly traits.
    Only the friendly traits are shown to user.
    """

    user_context = state["user_context"]

    # STEP 1: LLM infers technical tags (internal only)
    system_prompt = """You are an expert learning science researcher. Based on the user's goals and constraints, infer their cognitive and learning patterns.

Output JSON with these technical tags (for internal ML use only—never shown to user):
{
  "learning_style": "Visual|Text_Based|Project_First|Academic",
  "neuro_type": "Neurotypical|ADHD|High_Anxiety",
  "executive_function": "High|Low",
  "schedule_rigidity": "Fluid|Weekend_Warrior|Strict_Calendar",
  "confidence_scores": {
    "learning_style": 0.85,
    "neuro_type": 0.72,
    ...
  },
  "reasoning": "Why you inferred each tag"
}"""

    user_prompt = f"""Goal: {user_context.get('goal_domain')}
Target Role: {user_context.get('target_role')}
Current Level: {user_context.get('current_skill_level')}
Weekly Hours: {user_context.get('weekly_hours_cap')}
Deadline: {user_context.get('deadline_weeks')} weeks
Additional: {user_context.get('additional_context', '')}"""

    # Stream + parse technical tags
    streamed_text = ""
    async for chunk in stream_openai_response(system_prompt, user_prompt, model="gpt-4o-mini"):
        streamed_text += chunk

    technical_profile = json.loads(streamed_text)

    # STEP 2: Translate technical tags to friendly descriptions (shown to user)
    friendly_profile = translate_to_user_friendly(technical_profile)

    return {
        "cognitive_profile_technical": technical_profile,
        "cognitive_profile_friendly": friendly_profile,
    }


def translate_to_user_friendly(technical: dict) -> dict:
    """Convert technical tags to positive, user-friendly descriptions."""

    mapping = {
        # Learning Style
        ("Visual",): "Visual Learner",
        ("Text_Based",): "Reading-Focused Learner",
        ("Project_First",): "Hands-On Learner",
        ("Academic",): "Theory-First Learner",

        # Neuro Type + Focus Style
        ("ADHD",): "Thrives with Short-Burst Focus",
        ("High_Anxiety",): "Prefers Structured Milestones",
        ("Neurotypical",): "Flexible Learner",

        # Executive Function
        ("High",): "Self-Directed Learner",
        ("Low",): "Thrives with Detailed Breakdown",

        # Schedule
        ("Strict_Calendar",): "Prefers Structured Schedule",
        ("Weekend_Warrior",): "Peak-Productivity Weekender",
        ("Fluid",): "Flexible Schedule",
    }

    learning_style = technical.get("learning_style", "Visual")
    neuro_type = technical.get("neuro_type", "Neurotypical")
    exec_func = technical.get("executive_function", "High")
    schedule = technical.get("schedule_rigidity", "Fluid")

    messages = {
        "learning_approach": get_learning_message(learning_style),
        "focus_style": get_neuro_message(neuro_type),
        "guidance_preference": get_exec_func_message(exec_func),
        "schedule_preference": get_schedule_message(schedule),
        "personalization_messages": [
            f"We'll customize your curriculum for {mapping[(learning_style,)]}",
            get_personalization_message(neuro_type, exec_func, schedule),
        ]
    }

    return messages


def get_learning_message(style: str) -> str:
    """Positive message about learning style."""
    messages = {
        "Visual": "You learn best through visual content like videos, diagrams, and visual workflows. We'll prioritize these.",
        "Text_Based": "You prefer written content and detailed explanations. Your roadmap emphasizes docs, articles, and comprehensive guides.",
        "Project_First": "You learn by doing. We've structured your roadmap around hands-on projects with real-world outcomes.",
        "Academic": "You like understanding the 'why' before diving in. We'll start with foundational concepts and frameworks.",
    }
    return messages.get(style, messages["Visual"])


def get_neuro_message(neuro_type: str) -> str:
    """Positive message about focus/attention patterns."""
    messages = {
        "ADHD": "We'll break learning into focused 20-minute blocks with built-in breaks—perfect for maintaining high-energy momentum.",
        "High_Anxiety": "We'll include clear checkpoints and progress milestones throughout your journey so you always know where you stand.",
        "Neurotypical": "Your roadmap flows naturally, adapting as needed based on your progress.",
    }
    return messages.get(neuro_type, messages["Neurotypical"])


def get_exec_func_message(exec_func: str) -> str:
    """Positive message about guidance preference."""
    messages = {
        "High": "You prefer working independently with clear high-level goals. We'll focus on strategic direction without micromanagement.",
        "Low": "We'll provide step-by-step guidance with micro-tasks and clear daily actions—you'll always know exactly what to do next.",
    }
    return messages.get(exec_func, messages["High"])


def get_schedule_message(schedule: str) -> str:
    """Positive message about schedule preferences."""
    messages = {
        "Strict_Calendar": "We'll create a day-by-day breakdown so you can calendar everything and maintain consistency.",
        "Weekend_Warrior": "We're scheduling ~70% of your work for Saturdays & Sundays when you're most energized. Weekdays stay light.",
        "Fluid": "You've got flexibility—we'll create a rhythm that adapts to your week.",
    }
    return messages.get(schedule, messages["Fluid"])


def get_personalization_message(neuro_type: str, exec_func: str, schedule: str) -> str:
    """Contextual personalization message combining multiple traits."""

    # Examples of contextual combinations
    if neuro_type == "ADHD" and exec_func == "Low" and schedule == "Weekend_Warrior":
        return "Your roadmap combines short focus bursts with weekend concentration—expect detailed daily breakdowns on Sat/Sun."
    elif neuro_type == "High_Anxiety" and schedule == "Strict_Calendar":
        return "Your roadmap includes daily milestones and a strict schedule to help you feel in control and on track."
    elif neuro_type == "ADHD" and schedule == "Fluid":
        return "Your roadmap is flexible—you can shift focus sessions around, but we'll build in structure to prevent overwhelm."
    elif exec_func == "High" and schedule == "Strict_Calendar":
        return "High-level strategic goals with a calendar you can follow precisely. You'll have autonomy with structure."

    return "Your roadmap is personalized to match how you learn and your available time."
```

---

## 4. Streaming Messages: User-Facing Only

### Updated Frontend Streaming

File: `frontend/components/onboarding/RoadmapGenerationStream.tsx`

```typescript
// SHOW TO USER (friendly version)
const userFacingMessages = {
  profiler_complete: {
    message: "✓ Your learning profile is set",
    details: [
      "Learning Approach: Hands-On Learner",
      "Focus Style: Thrives with Short-Burst Focus",
      "Guidance: Step-by-Step Guidance",
      "Schedule: Peak-Productivity Weekender"
    ],
    personalization: "We're customizing your curriculum with 20-minute focused blocks scheduled mostly for weekends."
  },
  // ... rest of messages
}

// DON'T SHOW (technical version - kept from state for later use)
const technicalTags = {
  learning_style: "Project_First",
  neuro_type: "ADHD",
  executive_function: "Low",
  schedule_rigidity: "Weekend_Warrior"
}
```

### Updated Streaming Endpoint

```python
# backend/app/api/routers/agents.py

def format_node_completion(node_name: str, output: dict) -> str:
    """Format node completion with USER-FRIENDLY messaging only."""

    if node_name == "profiler":
        # Show friendly traits, NOT technical tags
        friendly = output.get("cognitive_profile_friendly", {})
        messages = friendly.get("personalization_messages", [])

        return f"✓ Your learning profile is set\n" + "\n".join(f"  • {m}" for m in messages[:2])

    elif node_name == "pedagogy_architect":
        blueprint = output.get("blueprint", {})
        week_count = len(blueprint.get("week_skeletons", []))
        return f"✓ Blueprint created: {week_count}-week personalized curriculum planned"

    elif node_name == "cognitive_adapter":
        # DON'T say "Applied ADHD rules"
        # DO say "Personalizing for your learning style"
        return f"✓ Personalizing your curriculum based on your learning profile"

    # ... rest
```

---

## 5. Database Storage: Full Picture

### What Gets Saved

```python
# In assessments table:
{
  "id": "uuid-123",
  "user_id": "uuid-456",
  "goal_domain": "Product Management",
  "target_role": "AI PM at FAANG",

  # TECHNICAL (Internal use only - never shown in UI)
  "cognitive_profile_technical": {
    "learning_style": "Project_First",
    "neuro_type": "ADHD",
    "executive_function": "Low",
    "schedule_rigidity": "Weekend_Warrior",
    "confidence_scores": {
      "learning_style": 0.88,
      "neuro_type": 0.72,
      "executive_function": 0.81,
      "schedule_rigidity": 0.95
    }
  },

  # USER-FACING (What we show them)
  "cognitive_profile_friendly": {
    "learning_approach": "Hands-On Learner",
    "focus_style": "Thrives with Short-Burst Focus",
    "guidance_preference": "Thrives with Detailed Breakdown",
    "schedule_preference": "Peak-Productivity Weekender",
    "personalization_messages": [
      "We'll structure your roadmap with 20-minute focused blocks",
      "We're scheduling ~70% of your work for weekends",
      "You'll get detailed daily checklists"
    ]
  },

  "profiler_reasoning": "User mentioned 'I get distracted easily' and 'I work best on weekends'..."
}
```

---

## 6. User Dashboard: Show Friendly Traits

### Settings/Profile Page

```typescript
// frontend/app/(dashboard)/settings/page.tsx

export function CognitiveProfileSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Learning Profile</h3>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Learning Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">Hands-On Learner</p>
            <p className="text-xs text-gray-500 mt-2">
              You learn best by building. We prioritize projects and real-world application.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Focus Style</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">Thrives with Short-Burst Focus</p>
            <p className="text-xs text-gray-500 mt-2">
              Your curriculum uses focused 20-minute blocks with built-in breaks.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Guidance Preference</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">Step-by-Step Guidance</p>
            <p className="text-xs text-gray-500 mt-2">
              You'll always know exactly what to do next with detailed daily actions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">Peak-Productivity Weekender</p>
            <p className="text-xs text-gray-500 mt-2">
              ~70% of your work is scheduled for weekends when you're most energized.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Edit option */}
      <Button variant="outline">Update Profile</Button>
    </div>
  )
}
```

---

## 7. Internal APIs: Access Technical Tags (Backend Only)

### For Node B (Architect) & Other Downstream Nodes

```python
# backend/app/agents/nodes/pedagogy_architect.py

async def process(state: GraphState) -> dict:
    """
    Node B uses TECHNICAL tags internally for routing logic.
    But never exposes them to user.
    """

    # Access technical profile for routing
    technical = state["cognitive_profile_technical"]
    neuro_type = technical["neuro_type"]  # "ADHD" is fine here
    exec_func = technical["executive_function"]  # "Low" is fine here

    # Use for logic: "If ADHD, apply fragmentation rule"
    if neuro_type == "ADHD":
        blueprint["task_granularity"] = "20_minute_chunks"

    # But don't expose to user output
    return {...}  # Return friendly version to stream
```

---

## Summary: The Two-Layer Approach

| Layer | Internal (Database) | User-Facing (UI) |
|-------|-------------------|-----------------|
| **Learning Style** | "Project_First" | "Hands-On Learner" |
| **Attention Pattern** | "ADHD" | "Thrives with Short-Burst Focus" |
| **Executive Function** | "Low" | "Thrives with Detailed Breakdown" |
| **Schedule** | "Weekend_Warrior" | "Peak-Productivity Weekender" |
| **Usage** | Backend routing, telemetry, ML training | UI display, streaming messages, user dashboard |
| **Visible to User?** | ❌ NO | ✅ YES (positive, empowering language) |

