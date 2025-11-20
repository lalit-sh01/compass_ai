GAP_ANALYSIS_SYSTEM_PROMPT = """You are an expert skill gap analyst. Your role is to identify the gaps between a user's current skills and their target goal, then recommend the specific skills and knowledge areas they need to develop.

You must output a valid JSON object with the following structure:

{
  "targetRole": {
    "title": "The target role/goal",
    "requiredSkills": {
      "essential": [
        {
          "skill": "Skill name",
          "description": "What this skill entails",
          "currentLevel": "none | beginner | intermediate | advanced",
          "targetLevel": "intermediate | advanced | expert",
          "priority": "high | medium | low",
          "estimatedWeeks": "Number of weeks needed to learn"
        }
      ],
      "recommended": [
        {
          "skill": "Skill name",
          "description": "What this skill entails",
          "currentLevel": "none | beginner | intermediate | advanced",
          "targetLevel": "intermediate | advanced | expert",
          "priority": "high | medium | low",
          "estimatedWeeks": "Number of weeks needed to learn"
        }
      ],
      "optional": [
        {
          "skill": "Skill name",
          "description": "What this skill entails and why it's beneficial",
          "currentLevel": "none | beginner | intermediate | advanced",
          "targetLevel": "intermediate | advanced | expert",
          "priority": "low",
          "estimatedWeeks": "Number of weeks needed to learn"
        }
      ]
    }
  },
  "learningPath": {
    "phase1": {
      "title": "Foundation Phase",
      "focus": ["Skill areas to focus on"],
      "duration": "Number of weeks"
    },
    "phase2": {
      "title": "Intermediate Phase",
      "focus": ["Skill areas to focus on"],
      "duration": "Number of weeks"
    },
    "phase3": {
      "title": "Advanced Phase",
      "focus": ["Skill areas to focus on"],
      "duration": "Number of weeks"
    }
  },
  "recommendations": {
    "strengths": ["Current strengths to leverage"],
    "quickWins": ["Skills that can be learned quickly"],
    "challenges": ["Areas that may need extra focus"],
    "resources": ["Recommended types of resources"]
  }
}

Be realistic about skill levels, prioritize based on the user's goal and timeframe, and ensure the gap analysis is actionable and achievable."""

def build_gap_analysis_prompt(assessment: dict) -> str:
    # Safely access nested fields
    goal = assessment.get('goal', {})
    current_skills = assessment.get('currentSkills', {})
    learning_preferences = assessment.get('learningPreferences', {})
    constraints = assessment.get('constraints', {})
    
    technical_skills = current_skills.get('technical', [])
    if isinstance(technical_skills, list):
        technical_skills_str = ", ".join(technical_skills)
    else:
        technical_skills_str = str(technical_skills)
        
    roles = current_skills.get('experience', {}).get('roles', [])
    if isinstance(roles, list):
        roles_str = ", ".join(roles)
    else:
        roles_str = str(roles)

    return f"""Based on the following user assessment, perform a comprehensive gap analysis:

**Goal**: {goal.get('title', '')}
**Timeframe**: {goal.get('timeframe', '')} weeks
**Current Technical Skills**: {technical_skills_str}
**Years of Experience**: {current_skills.get('experience', {}).get('years', '')} years
**Previous Roles**: {roles_str}
**Learning Pace**: {learning_preferences.get('pace', '')}
**Hours per Week**: {learning_preferences.get('hoursPerWeek', '')} hours
**Budget**: {constraints.get('budget', '')}

Analyze the gap between the user's current skills and their target goal of "{goal.get('title', '')}".

Identify:
1. **Essential skills** - Must-have skills for the role (prioritize these)
2. **Recommended skills** - Strongly recommended but not absolutely required
3. **Optional skills** - Nice-to-have skills that provide additional value

For each skill, determine:
- The user's current level (based on their stated skills and experience)
- The target level needed for the goal
- Priority (high/medium/low)
- Estimated weeks needed to learn (be realistic based on hours available)

Also provide:
- A high-level learning path broken into 3 phases
- Recommendations on strengths, quick wins, challenges, and resource types

Ensure the total estimated weeks across all skills fits within the user's {goal.get('timeframe', '')}-week timeframe, accounting for {learning_preferences.get('hoursPerWeek', '')} hours per week.

Output as a valid JSON object following the specified schema."""
