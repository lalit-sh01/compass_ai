import json

from app.agents.prompts.gold_standard_examples import (
    GOLD_STANDARD_WEEK_1,
    QUALITY_MARKERS,
)


# Placeholder for resource database formatting - can be implemented later or simplified
def format_resource_database():
    return "Use your knowledge of high-quality, current (2023-2025) resources."

ROADMAP_GENERATION_SYSTEM_PROMPT = f"""You are an expert learning roadmap architect. Your role is to create comprehensive, week-by-week learning roadmaps that help users achieve their goals.

## GOLD STANDARD EXAMPLE

Here is an example of EXCELLENT week that demonstrates the quality expected:

{json.dumps(GOLD_STANDARD_WEEK_1, indent=2)}

{QUALITY_MARKERS}

## YOUR OUTPUT MUST MATCH OR EXCEED THIS QUALITY

You MUST generate a roadmap that strictly conforms to the provided JSON schema. The roadmap should follow the "Build → Research → Share" methodology:
- **Build**: Hands-on projects and practical application (60-70% of time)
- **Research**: Deep dives into concepts with comprehensive resources (20-30% of time)
- **Share**: Sharing knowledge, writing, and demonstrating expertise (10-15% of time)

## CRITICAL QUALITY REQUIREMENTS:

**Resources (NON-NEGOTIABLE):**
- EVERY deep dive topic: 2-5 specific resources
- 100% of resources MUST include working URLs (https://...)
- Resource types: Mix of Article (30%), Video/YouTube (20%), Documentation (20%), Course/Tutorial (15%), Book/Paper (10%), Tool/Platform (5%)
- URLs must be real, current (2023-2025), and accessible
- Examples:
  ✓ GOOD: "OpenAI Prompt Engineering Guide" (https://platform.openai.com/docs/guides/prompt-engineering)
  ✗ BAD: "Prompt engineering guide" (no URL)

**Depth (REQUIRED):**
- Each week: 3-5 deep dive topics
- Each topic: 2-4 subtasks (with their own resources)
- **Build section: MINIMUM 3-5 concrete, measurable deliverables per week**
  - Example deliverables: "Working product with public URL", "GitHub repo with README", "1-Page Product Brief"
  - NOT just "Complete project" - be specific!
- Result: 8-15 total resources per week

**Specificity (CRITICAL):**
- Technical stacks: "Frontend: Next.js 14 + Tailwind + Shadcn UI" NOT "Modern web stack"
- Deliverables: "Deploy to Vercel with public URL and analytics" NOT "Complete project"
- Projects: "ChatGPT-style interface for legal document review" NOT "Build an AI chatbot"

**Supplemental Sections (REQUIRED):**
- interviewBank: 20-30 questions across 4-6 categories
- successMetrics: 4+ metric categories
- masterResources: 5-7 categories
- weeklyRituals, redFlagsAndAdjustments, competitiveAdvantages
- finalMotivation (2-3 inspiring paragraphs)

## Key Principles:
1. **Project-Based Learning**: Each week has a concrete, specific project
2. **Progressive Complexity**: Start simple, gradually increase difficulty
3. **Comprehensive Resources**: 2-5 resources per topic, ALL with URLs
4. **Time-Boxed**: Respect user's available hours per week
5. **Career-Focused**: Include interview prep and portfolio building in later weeks

## Important:
- Total weeks must match the user's timeframe
- Hours per week must match the user's availability
- Technical difficulty should match the user's current skill level
- Resources should fit the user's budget (prioritize free resources)
- All JSON fields must be included as per schema
- deliverables, resources, and subtasks should have isCompleted: false by default

Output ONLY valid JSON that conforms exactly to the schema. No additional text or explanations."""

def build_roadmap_generation_prompt(
  assessment: dict,
  gap_analysis: dict,
  selected_skills: list
) -> str:
    skills_list = ", ".join(selected_skills)
    
    # Safely extract nested data
    goal = assessment.get('goal', {})
    current_skills = assessment.get('currentSkills', {})
    learning_preferences = assessment.get('learningPreferences', {})
    constraints = assessment.get('constraints', {})
    
    technical_skills = current_skills.get('technical', [])
    technical_skills_str = ", ".join(technical_skills) if isinstance(technical_skills, list) else str(technical_skills)
    
    roles = current_skills.get('experience', {}).get('roles', [])
    roles_str = ", ".join(roles) if isinstance(roles, list) else str(roles)
    
    preferred_resources = learning_preferences.get('preferredResources', [])
    preferred_resources_str = ", ".join(preferred_resources) if isinstance(preferred_resources, list) else str(preferred_resources)

    # Gap Analysis extraction
    target_role = gap_analysis.get('targetRole', {})
    required_skills = target_role.get('requiredSkills', {})
    essential = required_skills.get('essential', [])
    recommended = required_skills.get('recommended', [])
    
    essential_str = ", ".join([s.get('skill', '') for s in essential])
    recommended_str = ", ".join([s.get('skill', '') for s in recommended])
    
    learning_path = gap_analysis.get('learningPath', {})
    phase1 = learning_path.get('phase1', {})
    phase2 = learning_path.get('phase2', {})
    phase3 = learning_path.get('phase3', {})
    
    recommendations = gap_analysis.get('recommendations', {})
    strengths = recommendations.get('strengths', [])
    strengths_str = ", ".join(strengths) if isinstance(strengths, list) else str(strengths)
    
    quick_wins = recommendations.get('quickWins', [])
    quick_wins_str = ", ".join(quick_wins) if isinstance(quick_wins, list) else str(quick_wins)

    return f"""Generate a comprehensive learning roadmap with the following requirements:

## User Profile:
- **Goal**: {goal.get('title', '')}
- **Timeframe**: {goal.get('timeframe', '')} weeks
- **Current Skills**: {technical_skills_str}
- **Experience**: {current_skills.get('experience', {}).get('years', '')} years ({roles_str})
- **Learning Style**: {learning_preferences.get('style', '')}
- **Hours per Week**: {learning_preferences.get('hoursPerWeek', '')} hours
- **Budget**: {constraints.get('budget', '')}
- **Preferred Resources**: {preferred_resources_str}

## Skills to Focus On (Selected by User):
{skills_list}

## Gap Analysis Summary:
**Essential Skills**: {essential_str}
**Recommended Skills**: {recommended_str}

**Learning Path Phases**:
1. {phase1.get('title', '')} ({phase1.get('duration', '')} weeks): {", ".join(phase1.get('focus', []))}
2. {phase2.get('title', '')} ({phase2.get('duration', '')} weeks): {", ".join(phase2.get('focus', []))}
3. {phase3.get('title', '')} ({phase3.get('duration', '')} weeks): {", ".join(phase3.get('focus', []))}

**Strengths to Leverage**: {strengths_str}
**Quick Wins**: {quick_wins_str}

{format_resource_database()}

## Requirements:
1. Create exactly {goal.get('timeframe', '')} weeks of content
2. Each week should have {learning_preferences.get('hoursPerWeek', '')} hours total
3. Follow the "Build → Research → Share" structure:
   - Build: 60-70% of time (hands-on projects)
   - Research: 20-30% of time (learning and deep dives)
   - Share: 10-15% of time (writing, documenting, sharing)

4. **CRITICAL: Each week's buildSection MUST have 3-5 specific, measurable deliverables**
   - Example: "Working product with public URL", "GitHub repo with README", "1-Page Product Brief"
   - NOT vague: "Complete project", "Finish implementation"
5. Provide real resources with URLs (articles, videos, documentation, courses) - 2-5 per topic
6. Technical stack should match the user's current skill level
7. Projects should progressively build on each other
8. Include interview preparation in the final 2-3 weeks
9. Add a comprehensive interview question bank (20-30 questions across 4-6 categories)

10. The roadmap must conform EXACTLY to this JSON structure:
{{
  "title": "string - Descriptive title",
  "goal": "string - User's goal",
  "startDate": "ISO date string",
  "targetEndDate": "ISO date string",
  "totalDurationWeeks": number,
  "timeCommitmentPerWeek": "string - e.g., '{learning_preferences.get('hoursPerWeek', '')} hours/week'",
  "profile": {{
    "description": "string - User background",
    "experience": "string - Years of experience"
  }},
  "learningStyle": "Build → Research → Share",
  "coreSkills": [
    {{
      "skill": "string",
      "description": "string",
      "relevantWeeks": "string - e.g., 'Weeks 1-3'"
    }}
  ],
  "phases": [
    {{
      "phaseNumber": number,
      "title": "string",
      "summary": "string",
      "weekRange": "string - e.g., 'Weeks 1-4'",
      "weeks": [
        {{
          "weekNumber": number,
          "title": "string",
          "theme": "string",
          "totalHours": number,
          "status": "PLANNED",
          "timeBreakdown": {{
            "build": number,
            "research": number,
            "share": number
          }},
          "buildSection": {{
            "hours": number,
            "projectTitle": "string",
            "description": "string",
            "technicalStack": ["string - Optional: e.g., 'Frontend: Next.js + Tailwind'"],
            "components": ["string - Optional: Alternative to technicalStack, e.g., 'Load balancing & API gateway'"],
            "deliverables": [
              {{
                "description": "string - Specific, measurable deliverable",
                "isCompleted": false,
                "subtasks": [
                  {{
                    "description": "string - Optional nested subtask",
                    "isCompleted": false
                  }}
                ]
              }}
            ]
          }},
          "researchSection": {{
            "hours": number,
            "deepDiveTopics": [
              {{
                "description": "string (include time estimate in hours)",
                "isCompleted": false,
                "suggestedResources": [
                  {{
                    "title": "string",
                    "type": "Article | YouTube | Video | Documentation | Course | Book | Paper | Tool | Guide | Tutorial | Platform | Blog | Framework | Podcast | Gallery | Community | Networking | Template",
                    "url": "string - MUST include real, working URL (https://...)"
                  }}
                ],
                "subtasks": [
                  {{
                    "description": "string",
                    "isCompleted": false,
                    "suggestedResources": [
                      {{
                        "title": "string",
                        "type": "Article | YouTube | Video | Documentation | Course | Book | Paper | Tool | Guide | Tutorial | Platform | Blog | Framework | Podcast | Gallery | Community | Networking | Template",
                        "url": "string - MUST include real, working URL (https://...)"
                      }}
                    ]
                  }}
                ]
              }}
            ],
            "resources": [
              {{
                "title": "string - High-level resource summary (optional field)",
                "type": "Article | YouTube | Video | Documentation | Course | Book | Paper | Tool | Guide | Tutorial | Platform | Blog | Framework | Podcast"
              }}
            ]
          }},
          "shareSection": {{
            "hours": number,
            "artifactTitle": "string - e.g., 'LinkedIn Post', 'Medium Article', 'Twitter Thread'",
            "artifactDescription": "string - What to create and share",
            "details": ["string - Specific elements to include (optional)"],
            "tags": ["string - Hashtags or keywords (optional)"],
            "deliverables": [
              {{
                "description": "string - Specific deliverable (optional)",
                "isCompleted": false
              }}
            ]
          }}
        }}
      ]
    }}
  ],
  "supplementalSections": {{
    "weeklyTimeAllocationTemplate": {{
      "monTue": "string - e.g., 'BUILD Days: 8-10 hours'",
      "wedThu": "string - e.g., 'RESEARCH Days: 6-8 hours'",
      "friSat": "string - e.g., 'SHARE Days: 4-6 hours'",
      "sun": "string - e.g., 'REFLECT Day: 2-3 hours'"
    }},
    "successMetrics": [
      {{
        "category": "string - e.g., 'Build Metrics', 'Research Metrics', 'Share Metrics', 'Career Metrics'",
        "metrics": [
          {{
            "description": "string - Specific metric to track",
            "isCompleted": false
          }}
        ]
      }}
    ],
    "masterResources": [
      {{
        "category": "string - e.g., 'Essential Tools - Development', 'Reading List - Core PM'",
        "items": [
          {{
            "name": "string - Tool/resource name",
            "description": "string - What it's for"
          }}
        ]
      }}
    ],
    "interviewBank": [
      {{
        "category": "string - e.g., 'Product Sense', 'Technical & System Design', 'Behavioral'",
        "weight": "string - Optional: e.g., '30% of interviews'",
        "framework": "string - Optional: e.g., 'CIRCLES', 'STAR'",
        "notes": "string - Optional: Key focus areas",
        "questions": [
          "string - Interview question"
        ]
      }}
    ],
    "demonstrationMoments": [
      {{
        "category": "string - e.g., 'Portfolio Projects', 'Core PM Artifacts'",
        "items": [
          "string - Specific achievement or artifact"
        ]
      }}
    ],
    "weeklyRituals": {{
      "daily": "string - Daily habits and routines",
      "weekly": "string - Weekly planning and review",
      "biWeekly": "string - Bi-weekly check-ins"
    }},
    "redFlagsAndAdjustments": [
      {{
        "checkpoint": "string - e.g., 'Week 4 Checkpoint', 'Week 9 Checkpoint'",
        "items": [
          "string - Question to ask (e.g., 'Have you built 3 projects?')"
        ],
        "adjustment": "string - What to do if answer is no"
      }}
    ],
    "competitiveAdvantages": [
      {{
        "advantage": "string - e.g., 'Technical Credibility', 'PM Experience'",
        "description": "string - Why this is an advantage",
        "leverage": {{
          "inInterviews": "string - Optional: How to use in interviews",
          "inNetworking": "string - Optional: How to use in networking",
          "inApplications": "string - Optional: How to use in applications"
        }}
      }}
    ],
    "finalMotivation": "string - Inspiring closing message (2-3 paragraphs)",
    "nextSteps": [
      "string - Immediate action item (e.g., 'Today: Review this roadmap')",
      "string - This week action",
      "string - Ongoing action",
      "string - End goal celebration"
    ]
  }}
}}

Generate the complete roadmap now. Output ONLY the JSON, no other text."""
