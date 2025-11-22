# Hardcoded Expectations Audit - Personalization Opportunities

**Date**: Nov 2025
**Purpose**: Identify all hardcoded categories/values that limit personalization

---

## 🎯 Executive Summary

The system currently has **7 major hardcoded constraints** that limit personalization:

1. ❌ **Skill Levels** (Current & Target) - Fixed 6 options
2. ❌ **Budget Tiers** - Fixed 3 options
3. ❌ **Learning Styles** - Fixed 3 options
4. ❌ **Goal Domains** - Described but enforced in 3 categories
5. ❌ **Task Types** - Fixed 3 types (LEARN, PRACTICE, BUILD)
6. ❌ **Task Distribution** - Hardcoded 50/30/20 split
7. ❌ **Quality Warnings** - Only 1 type (LOW_CONFIDENCE)

**Impact**: Users are forced into predefined boxes that may not match their actual context.

**Recommendation**: Replace Literal enums with open strings + AI-driven categorization for truly personalized roadmaps.

---

## 📋 Detailed Audit

### 1. ❌ **Skill Levels** - Beginner/Intermediate/Advanced → Competent/Proficient/Master

**Current Implementation**:
```python
# Backend: app/agents/models.py:29-34
current_skill_level: Literal["Beginner", "Intermediate", "Advanced"]
target_skill_level: Literal["Competent", "Proficient", "Master"]

# Frontend: frontend/lib/types.ts:16-17
current_skill_level: "Beginner" | "Intermediate" | "Advanced";
target_skill_level: "Competent" | "Proficient" | "Master";
```

**Where It's Used**:
- `app/agents/nodes/gap_analyst.py:66-82` - **Effort estimation matrix** (hardcoded hours for each combination)
- `app/agents/nodes/gap_analyst.py:13-28` - System prompt enforces these exact values
- `app/agents/nodes/inquisitor.py:31-32` - Interview must extract these specific values

**Problems**:
1. ❌ **Not all domains fit this model**:
   - Physical skills: "Never played" vs "Played casually" vs "Competed before"
   - Music: "Can't read sheet music" vs "Know basic chords" vs "Play in a band"
   - Business: "No startup experience" vs "Founded side project" vs "Serial entrepreneur"

2. ❌ **Target levels are vague and generic**:
   - What does "Competent" mean for table tennis vs React?
   - "Master" is not achievable in 12 weeks for most skills

3. ❌ **Gap Analyst effort matrix is rigid**:
   - Beginner→Competent = 300 hours (for ALL cognitive domains?)
   - Doesn't account for user's learning speed, prior knowledge transfer, or domain complexity

**Better Approach**:
```python
# Open-ended, AI interprets context
current_skill_description: str  # "I've built 2 React apps but never used hooks"
target_outcome: str             # "Build a production-ready SaaS with auth, payments, deployment"

# AI (Gap Analyst) uses LLM to estimate effort based on actual goal, not categories
```

---

### 2. ❌ **Budget Tiers** - Free_Only / Low_Budget / Premium

**Current Implementation**:
```python
# Backend: app/agents/models.py:47-49
budget_tier: Literal["Free_Only", "Low_Budget", "Premium"]

# Frontend: frontend/lib/types.ts:20
budget_tier: "Free_Only" | "Low_Budget" | "Premium";
```

**Where It's Used**:
- `app/agents/nodes/inquisitor.py:35` - Interview extracts this value
- Curator uses it to filter resource types (free YouTube vs paid courses)

**Problems**:
1. ❌ **"Low_Budget" is ambiguous**:
   - $20/month? $100/month? $500 one-time?
   - User in India vs USA has different budget scales

2. ❌ **Doesn't capture nuance**:
   - User might be willing to pay for specific high-value resources but wants free practice tools
   - User might have education credits, employer reimbursement, etc.

**Better Approach**:
```python
budget_constraint: str  # "Free resources only", "$50/month max", "Company pays for courses"
# OR
max_budget_usd: Optional[int]  # null = free only, 50 = $50 limit, 999999 = unlimited
```

---

### 3. ❌ **Learning Styles** - Visual_Video / Text_Documentation / Project_Based

**Current Implementation**:
```python
# Backend: app/agents/models.py:52-54
learning_style: Literal["Visual_Video", "Text_Documentation", "Project_Based"]

# Frontend: frontend/lib/types.ts:21
learning_style: "Visual_Video" | "Text_Documentation" | "Project_Based";
```

**Where It's Used**:
- `app/agents/nodes/inquisitor.py:36` - Interview extracts this
- Curator uses it to prioritize resource types (YouTube vs docs vs projects)

**Problems**:
1. ❌ **False dichotomy** - Most learners use a mix:
   - "I watch videos to understand concepts, then read docs for details, then build projects"
   - "I prefer podcasts for commute, articles for deep dives, interactive tutorials for practice"

2. ❌ **Missing many styles**:
   - Audio (podcasts, audiobooks)
   - Interactive (Codecademy, Duolingo-style)
   - Social (study groups, pair programming, bootcamps)
   - Kinesthetic (hands-on workshops, labs)

3. ❌ **Curator can't optimize** if user has nuanced preferences

**Better Approach**:
```python
# Open-ended preference
learning_preferences: str  # "Videos for concepts, docs for reference, prefer TypeScript examples"

# OR weighted preferences
learning_modalities: Dict[str, float]  # {"video": 0.6, "text": 0.3, "interactive": 0.1}
```

---

### 4. ❌ **Goal Domains** - Cognitive / Physical / Market

**Current Implementation**:
```python
# Backend: app/agents/models.py:21-23 (technically str, but described as 3 options)
goal_domain: str = Field(
    description="The broad category: Cognitive, Physical, or Market"
)

# Frontend: frontend/lib/types.ts:14
goal_domain: "Cognitive" | "Physical" | "Market";  # ← Enforced in TypeScript!
```

**Where It's Used**:
- `app/agents/nodes/gap_analyst.py:87-91` - Domain multiplier for effort estimation:
  - Cognitive: 1.0×
  - Physical: 1.2× (needs more practice time)
  - Market: 1.1× (complex, uncertain)

**Problems**:
1. ❌ **Many goals don't fit cleanly**:
   - "Launch a SaaS product" = Cognitive (coding) + Market (selling) + Physical (typing speed for speed)?
   - "Learn public speaking" = Physical (voice control) + Cognitive (structuring arguments)?
   - "Master sales" = Market + Cognitive (psychology) + Physical (energy, presence)?

2. ❌ **Multiplier is oversimplified**:
   - Why is "Learn piano" (Physical) assumed to be 1.2× harder than "Learn React" (Cognitive)?
   - "Break into VC" (Market) is way harder than 1.1× a cognitive skill

**Better Approach**:
```python
# Remove domain constraint entirely
# Let Gap Analyst (GPT-4o) estimate effort directly from goal description
specific_goal: str  # "Launch a B2B SaaS in 6 months with 100 paying customers"
# AI figures out complexity without needing a category
```

---

### 5. ❌ **Task Types** - LEARN / PRACTICE / BUILD

**Current Implementation**:
```python
# Backend: app/agents/models.py:108-110
task_type: Literal["LEARN", "PRACTICE", "BUILD"]

# Frontend: frontend/lib/types.ts:47
task_type: "LEARN" | "PRACTICE" | "BUILD";
```

**Where It's Used**:
- `app/agents/nodes/curator.py:45-47` - Enforces 50% LEARN, 30% PRACTICE, 20% BUILD
- Frontend viewer groups tasks by type
- Progress tracking by task type

**Problems**:
1. ❌ **Doesn't fit all domains**:
   - **Physical skills** (table tennis): Should be 10% LEARN, 70% PRACTICE, 20% MATCH_PLAY
   - **Market skills** (networking): Should be 20% LEARN, 30% PRACTICE, 50% REAL_CONVERSATIONS
   - **Creative skills** (writing): Should be 30% READ, 40% WRITE, 30% CRITIQUE

2. ❌ **Missing important categories**:
   - REVIEW (spaced repetition, flashcards)
   - REFLECT (journaling, self-assessment)
   - COLLABORATE (pair programming, study groups)
   - TEACH (best way to solidify knowledge)
   - SHIP (deploy, publish, share publicly)

3. ❌ **Some tasks are hybrid**:
   - "Build a todo app while watching tutorial" = LEARN + BUILD?
   - "Practice algorithm problems on LeetCode" = PRACTICE + LEARN (reading solutions)?

**Better Approach**:
```python
# Option A: Open tags
task_tags: List[str]  # ["learn", "practice", "peer-review", "build", "deploy"]

# Option B: AI-generated categories per roadmap
# Curator decides optimal task types for THIS SPECIFIC GOAL
# e.g., Tennis roadmap might use: "watch-demo", "drill", "play-match", "analyze-footage"
```

---

### 6. ❌ **Task Distribution** - Hardcoded 50/30/20 Split

**Current Implementation**:
```python
# app/agents/nodes/curator.py:44-47
3. Task Distribution:
   - LEARN tasks (50%): Absorb new knowledge
   - PRACTICE tasks (30%): Apply knowledge
   - BUILD tasks (20%): Create something tangible
```

**Where It's Enforced**:
- Curator system prompt: `app/agents/nodes/curator.py:172`
- Hardcoded in prompt sent to GPT-4o

**Problems**:
1. ❌ **One-size-fits-all doesn't work**:

   **Physical Skills** (Tennis, Piano, Dancing):
   - Optimal: 10% LEARN (watch demos), 70% PRACTICE (drills), 20% PERFORM (matches/recitals)
   - Current 50/30/20 = way too much passive learning

   **Market Skills** (Sales, Networking, Content Creation):
   - Optimal: 20% LEARN, 20% PRACTICE, 60% SHIP (real interactions, published content)
   - Current 50/30/20 = not enough real-world validation

   **Deep Cognitive Skills** (Math, Theory, Research):
   - Optimal: 60% LEARN (read papers), 30% PRACTICE (problem sets), 10% BUILD (proofs)
   - Current 50/30/20 = not enough foundational learning

2. ❌ **Distribution should evolve over time**:
   - **Week 1-2**: 70% LEARN, 20% PRACTICE, 10% BUILD (foundation phase)
   - **Week 3-8**: 40% LEARN, 40% PRACTICE, 20% BUILD (growth phase)
   - **Week 9-12**: 20% LEARN, 30% PRACTICE, 50% BUILD (mastery phase)

3. ❌ **User's available time affects optimal mix**:
   - 5 hrs/week → More LEARN (passive, can be consumed flexibly)
   - 40 hrs/week → More BUILD (active, focused blocks)

**Better Approach**:
```python
# Let Gap Analyst or Curator determine optimal distribution based on:
# 1. Goal domain (physical vs cognitive vs market)
# 2. Time constraints
# 3. User's learning style
# 4. Current skill level (beginners need more LEARN, advanced need more BUILD)

# In Curator prompt:
"""
Determine the optimal task distribution for this specific goal.
Consider:
- Domain type (physical skills need more practice than cognitive)
- User's skill level (beginners need more structured learning)
- Weekly capacity (low hours = more passive LEARN, high hours = more active BUILD)
- Learning style preferences

Example distributions:
- Physical skill, Beginner, 5h/week: 30% LEARN, 50% PRACTICE, 20% APPLY
- Cognitive skill, Intermediate, 20h/week: 30% LEARN, 30% PRACTICE, 40% BUILD
- Market skill, Advanced, 10h/week: 10% LEARN, 20% PRACTICE, 70% SHIP
"""
```

---

### 7. ❌ **Quality Warnings** - Only "LOW_CONFIDENCE"

**Current Implementation**:
```python
# Backend: app/agents/models.py:141-144
quality_warning: Optional[Literal["LOW_CONFIDENCE"]]

# Frontend: frontend/lib/types.ts:57
quality_warning?: "LOW_CONFIDENCE";
```

**Where It's Used**:
- Enricher sets if `quality_score < 30`
- Validator checks for LOW_CONFIDENCE warnings

**Problems**:
1. ❌ **Binary categorization** - Either LOW_CONFIDENCE or nothing
2. ❌ **Missing useful warnings**:
   - "OUTDATED" - Resource is >3 years old
   - "BEGINNER_ONLY" - Resource doesn't match target skill level
   - "PAID_REQUIRED" - Free tier insufficient
   - "DEPRECATED" - Tech/method no longer recommended
   - "LANGUAGE_BARRIER" - Not in user's preferred language

**Better Approach**:
```python
quality_warnings: Optional[List[str]]  # ["outdated", "low_engagement", "paid_paywall"]

# OR full metadata
resource_metadata: Optional[Dict[str, Any]]  # {
#   "publication_date": "2019-03-15",
#   "last_updated": "2021-06-20",
#   "skill_level": "beginner",
#   "cost": "free_with_ads",
#   "language": "en"
# }
```

---

## 🎯 Recommended Changes - Priority Order

### **Priority 1: High Impact, Low Effort**

#### 1.1 Remove Task Distribution Hardcoding (2 hours)
**Change**: Make Curator determine optimal LEARN/PRACTICE/BUILD split per roadmap
**Impact**: Physical skills get more practice, market skills get more real-world application
**Files**: `app/agents/nodes/curator.py:44-47, 172`

```python
# OLD (REMOVE):
3. Task distribution: 50% LEARN, 30% PRACTICE, 20% BUILD

# NEW (ADD):
3. Task distribution: Determine optimal mix based on:
   - Goal type (physical needs 70%+ practice, market needs 60%+ shipping)
   - Skill level (beginners 60% learn, advanced 60% build)
   - Weekly capacity (5h/week = more passive, 40h/week = more active)
   State your distribution choice in the roadmap_title description.
```

---

#### 1.2 Open-Ended Learning Preferences (3 hours)
**Change**: Replace 3 fixed styles with open text field
**Impact**: Users can specify "podcasts + interactive tutorials" or any mix
**Files**: `app/agents/models.py:52`, `frontend/lib/types.ts:21`, `app/agents/nodes/inquisitor.py`

```python
# OLD:
learning_style: Literal["Visual_Video", "Text_Documentation", "Project_Based"]

# NEW:
learning_preferences: str = Field(
    description="How you prefer to learn (e.g., 'Videos for concepts, docs for reference, interactive exercises')"
)
```

---

### **Priority 2: Medium Impact, Medium Effort**

#### 2.1 Flexible Budget Constraint (4 hours)
**Change**: Replace 3 tiers with open description or numeric limit
**Impact**: Better resource matching for global users
**Files**: `app/agents/models.py:47`, `frontend/lib/types.ts:20`

```python
# Option A: Open text
budget_constraint: str  # "Free only", "$100/month", "Company pays"

# Option B: Numeric
max_monthly_budget_usd: Optional[int]  # null=free, 50=$50 limit, None=unlimited
```

---

#### 2.2 AI-Determined Task Categories (6 hours)
**Change**: Let Curator create domain-specific task types
**Impact**: Tennis → "watch-demo", "drill", "match-play" instead of generic LEARN/PRACTICE/BUILD
**Files**: `app/agents/models.py:108`, `frontend/lib/types.ts:47`, viewer components

```python
# OLD:
task_type: Literal["LEARN", "PRACTICE", "BUILD"]

# NEW:
task_category: str  # AI picks: "learn", "practice", "build", "ship", "review", "drill", etc.
task_category_label: str  # Human-readable: "Watch Demo", "Practice Drill", "Match Play"
```

---

### **Priority 3: High Impact, High Effort**

#### 3.1 Replace Skill Level Enum with Descriptions (8 hours)
**Change**: Use open text for current/target state
**Impact**: Gap Analyst uses LLM to estimate effort, not hardcoded matrix
**Files**: `app/agents/models.py:29-34`, `gap_analyst.py:66-95`, all prompts

```python
# OLD:
current_skill_level: Literal["Beginner", "Intermediate", "Advanced"]
target_skill_level: Literal["Competent", "Proficient", "Master"]

# NEW:
current_state_description: str  # "Built 2 React apps, familiar with hooks and state"
desired_outcome: str            # "Ship a production SaaS with auth, payments, 100 users"

# Gap Analyst uses LLM to estimate effort, not matrix lookup
```

**Gap Analyst Changes**:
```python
# OLD: Hardcoded matrix
effort_matrix = {"Beginner": {"Competent": 300, ...}, ...}

# NEW: LLM-based estimation
"""
Given:
- Current state: {current_state_description}
- Desired outcome: {desired_outcome}
- Weekly capacity: {weekly_hours_cap}
- Deadline: {deadline_months} months

Estimate required_effort_hours by analyzing:
1. Skill gap complexity
2. Domain learning curves
3. Realistic progression rates
4. Account for setbacks/plateaus

Return JSON: {"required_effort_hours": int, "reasoning": str}
"""
```

---

#### 3.2 Remove Goal Domain Constraint (4 hours)
**Change**: Delete `goal_domain` field entirely
**Impact**: Gap Analyst estimates effort without artificial categories
**Files**: `app/agents/models.py:21-23`, `gap_analyst.py:86-91`

```python
# DELETE:
goal_domain: str = Field(...)
domain_multiplier = {"Cognitive": 1.0, "Physical": 1.2, "Market": 1.1}

# Gap Analyst estimates directly from specific_goal description
```

---

## 📊 Impact Summary

| Change | Effort | Impact | Users Affected |
|--------|--------|--------|----------------|
| Task distribution flexibility | 2h | High | Physical/Market skill learners |
| Open learning preferences | 3h | Medium | All users (better UX) |
| Flexible budget | 4h | Medium | International users, nuanced budgets |
| AI-determined task categories | 6h | High | Domain-specific learners |
| Remove goal domain | 4h | Medium | Cross-domain goals |
| Skill level → descriptions | 8h | Very High | All users (more accurate) |
| **Total** | **27h** | | **100% of users benefit** |

---

## 🚀 Migration Strategy

### Phase 1: Non-Breaking Additions (Keep old fields)
```python
class UserContext(BaseModel):
    # Keep old fields for backward compatibility
    learning_style: Optional[Literal["Visual_Video", "Text_Documentation", "Project_Based"]]

    # Add new flexible fields
    learning_preferences: Optional[str]  # If provided, overrides learning_style
```

### Phase 2: Dual Support (Accept both formats)
- Gap Analyst checks: If `current_state_description` exists, use LLM estimation. Else use matrix.
- Curator checks: If task distribution specified, use it. Else use 50/30/20.

### Phase 3: Deprecate Old Fields
- Remove Literal constraints after 90 days
- Keep fields as open strings for analytics

---

## 🎯 Quick Wins (Do First)

1. **Task Distribution** (2h) - Biggest impact, easiest change
2. **Learning Preferences** (3h) - Better UX immediately
3. **Budget Flexibility** (4h) - Helps global users

**Total: 9 hours for 80% of personalization improvement**

---

## 🔮 Future: Fully Adaptive System

Instead of predefined categories, use AI to:

1. **Interview dynamically** - Inquisitor asks follow-up questions based on user's actual context
2. **Infer structure** - Gap Analyst determines what dimensions matter for THIS goal
3. **Generate vocabulary** - Curator creates domain-specific task types
4. **Evolve over time** - Validator learns what works for this user and adapts

Example:
```
User: "I want to get good at table tennis"

Inquisitor: "Tell me about your current level."
User: "I can rally but my backhand sucks"

Inquisitor: "What's your goal?"
User: "Beat my friend who's been playing 2 years"

Gap Analyst: Estimates 120 hours based on skill gap (no categories needed)

Curator: Creates roadmap with task types:
- "watch-technique" (10%)
- "shadow-practice" (20%)
- "drill-with-robot" (40%)
- "match-play" (30%)

Validator: "This user learns best from analyzing match footage, adjust distribution"
```

**No hardcoding. Fully personalized.**
