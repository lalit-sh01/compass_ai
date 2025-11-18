/**
 * Gold Standard Examples for Roadmap Generation
 *
 * These are curated examples extracted from high-quality, manually-crafted roadmaps.
 * They demonstrate the level of detail, resource quality, and structure expected from AI generation.
 */

export const GOLD_STANDARD_WEEK_1 = {
  weekNumber: 1,
  title: "AI Fundamentals & First Product Build",
  theme: "\"Build to Learn\" - Create your first AI product while learning fundamentals",
  totalHours: 20,
  status: "PLANNED",
  timeBreakdown: {
    build: 14,
    research: 4,
    share: 2
  },
  buildSection: {
    hours: 14,
    projectTitle: "AI-Powered Product Assistant",
    description: "Build a ChatGPT-style interface for a specific domain. Implement conversation memory. Deploy to Vercel.",
    technicalStack: [
      "Frontend: Next.js + Tailwind",
      "Backend: Python FastAPI or Node.js",
      "LLM: OpenAI GPT-4 or Claude 3.5 Sonnet",
      "Database: PostgreSQL for conversation history"
    ],
    deliverables: [
      {
        description: "Working product with public URL",
        isCompleted: false
      },
      {
        description: "GitHub repo with README",
        isCompleted: false
      },
      {
        description: "1-Page Product Brief for this idea (defining user, problem, and solution)",
        isCompleted: false
      }
    ]
  },
  researchSection: {
    hours: 4,
    deepDiveTopics: [
      {
        description: "LLM architecture & how transformers work (2h)",
        isCompleted: false,
        suggestedResources: [
          {
            title: "Andrej Karpathy's \"Intro to Large Language Models\" (YouTube)",
            type: "YouTube",
            url: "https://www.youtube.com/watch?v=zjkBMFhNj_g"
          },
          {
            title: "The Illustrated Transformer",
            type: "Article",
            url: "https://jalammar.github.io/illustrated-transformer/"
          }
        ],
        subtasks: [
          {
            description: "Read \"Attention Is All You Need\" paper summary",
            isCompleted: false,
            suggestedResources: [
              {
                title: "Attention Is All You Need - Paper",
                type: "Paper",
                url: "https://arxiv.org/abs/1706.03762"
              },
              {
                title: "The Transformer Family by Lilian Weng",
                type: "Article",
                url: "https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/"
              }
            ]
          },
          {
            description: "Understand tokenization, context windows, temperature",
            isCompleted: false,
            suggestedResources: [
              {
                title: "OpenAI Tokenizer Tool",
                type: "Tool",
                url: "https://platform.openai.com/tokenizer"
              },
              {
                title: "Temperature and Sampling in LLMs",
                type: "Article",
                url: "https://lukesalamone.github.io/posts/what-is-temperature/"
              }
            ]
          }
        ]
      },
      {
        description: "Prompt engineering best practices (2h)",
        isCompleted: false,
        suggestedResources: [
          {
            title: "OpenAI Prompt Engineering Guide",
            type: "Guide",
            url: "https://platform.openai.com/docs/guides/prompt-engineering"
          },
          {
            title: "Anthropic Prompt Engineering Guide",
            type: "Guide",
            url: "https://docs.anthropic.com/claude/docs/prompt-engineering"
          }
        ],
        subtasks: [
          {
            description: "Study OpenAI/Anthropic prompt guides",
            isCompleted: false,
            suggestedResources: [
              {
                title: "OpenAI Prompt Engineering Guide",
                type: "Guide",
                url: "https://platform.openai.com/docs/guides/prompt-engineering"
              },
              {
                title: "Anthropic Prompt Engineering Guide",
                type: "Guide",
                url: "https://docs.anthropic.com/claude/docs/prompt-engineering"
              }
            ]
          },
          {
            description: "Learn few-shot learning, chain-of-thought prompting",
            isCompleted: false,
            suggestedResources: [
              {
                title: "Chain-of-Thought Prompting Paper",
                type: "Paper",
                url: "https://arxiv.org/abs/2201.11903"
              },
              {
                title: "Prompt Engineering Guide - LearnPrompting.org",
                type: "Guide",
                url: "https://learnprompting.org/docs/intro"
              }
            ]
          }
        ]
      }
    ],
    resources: [
      {
        title: "Andrej Karpathy's \"Intro to Large Language Models\" (YouTube)",
        type: "YouTube"
      },
      {
        title: "OpenAI Prompt Engineering Guide",
        type: "Guide"
      }
    ]
  },
  shareSection: {
    hours: 2,
    artifactTitle: "LinkedIn Post",
    artifactDescription: "LinkedIn post: \"Built my first AI product assistant in 2 days - here's what I learned about LLMs\"",
    details: [
      "Include: Demo video, key insights, technical challenges"
    ],
    tags: [
      "#AIProducts",
      "#ProductManagement",
      "#BuildInPublic"
    ]
  }
}

/**
 * Key observations from this gold standard example:
 *
 * 1. RESOURCES: Each deep dive topic has 2-3 specific resources with REAL, working URLs
 * 2. DEPTH: Topics have 2-3 subtasks, each with their own resources (2-3 levels deep)
 * 3. URLS: 100% of resources include working URLs starting with https://
 * 4. SPECIFICITY: Technical stack is concrete ("Next.js + Tailwind" not "modern web stack")
 * 5. DELIVERABLES: 3 specific, measurable deliverables
 * 6. TIME ESTIMATES: Included in topic descriptions (2h per topic)
 * 7. RESOURCE TYPES: Mix of YouTube, Article, Paper, Guide, Tool
 * 8. SHAREABILITY: Clear artifact with platform, description, and hashtags
 */

export const QUALITY_MARKERS = `
KEY QUALITY MARKERS FROM GOLD STANDARD:

**Resource Depth:**
- 2-3 resources PER deep dive topic (not per week!)
- Each resource has: title, type, and REAL URL (https://...)
- Subtasks (2-3 per topic) ALSO have their own resources (1-2 each)
- Result: ~8-12 total resources per week

**URL Quality:**
- 100% of resources have working URLs
- URLs are real, current (2023-2025), accessible
- Good: "OpenAI Prompt Engineering Guide" (https://platform.openai.com/docs/guides/prompt-engineering)
- Bad: "Prompt engineering guide" (no URL)

**Technical Specificity:**
- Technical stack: "Frontend: Next.js + Tailwind" NOT "Modern web framework"
- Deliverables: "Working product with public URL" NOT "Complete project"
- Projects: "ChatGPT-style interface for specific domain" NOT "Build an AI app"

**Structure Depth:**
- 2-4 deep dive topics per week
- 2-3 subtasks per topic
- 3-5 deliverables in build section
- Concrete time estimates (2h, 14h, etc.)

**Resource Type Distribution:**
- Article/Blog: 30%
- Video/YouTube: 20%
- Documentation: 20%
- Course/Tutorial: 15%
- Book/Paper: 10%
- Tool/Platform: 5%
`

/**
 * Returns the appropriate gold standard example based on the domain/goal
 */
export function getGoldStandardExample(goal: string): any {
  // For now, return Week 1 as the universal example
  // Can expand to domain-specific examples later
  return GOLD_STANDARD_WEEK_1
}
