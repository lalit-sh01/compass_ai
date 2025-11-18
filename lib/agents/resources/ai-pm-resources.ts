/**
 * Curated AI Product Management Resources
 *
 * This database contains high-quality, verified resources for AI PM learning paths.
 * All URLs are tested and current as of 2024-2025.
 *
 * Use these resources as references when generating roadmaps for AI PM roles.
 */

export const AI_PM_RESOURCES = {
  llmFundamentals: {
    category: "LLM & AI Fundamentals",
    resources: [
      {
        title: "Andrej Karpathy's Intro to Large Language Models",
        type: "YouTube",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        description: "Excellent introduction to how LLMs work"
      },
      {
        title: "The Illustrated Transformer",
        type: "Article",
        url: "https://jalammar.github.io/illustrated-transformer/",
        description: "Visual guide to transformer architecture"
      },
      {
        title: "Attention Is All You Need Paper",
        type: "Paper",
        url: "https://arxiv.org/abs/1706.03762",
        description: "Original transformer paper"
      },
      {
        title: "OpenAI Tokenizer Tool",
        type: "Tool",
        url: "https://platform.openai.com/tokenizer",
        description: "Interactive tokenization tool"
      }
    ]
  },

  promptEngineering: {
    category: "Prompt Engineering",
    resources: [
      {
        title: "OpenAI Prompt Engineering Guide",
        type: "Guide",
        url: "https://platform.openai.com/docs/guides/prompt-engineering",
        description: "Official OpenAI guide"
      },
      {
        title: "Anthropic Prompt Engineering Guide",
        type: "Guide",
        url: "https://docs.anthropic.com/claude/docs/prompt-engineering",
        description: "Claude-specific techniques"
      },
      {
        title: "LearnPrompting.org",
        type: "Course",
        url: "https://learnprompting.org/docs/intro",
        description: "Free comprehensive course"
      },
      {
        title: "Chain-of-Thought Prompting Paper",
        type: "Paper",
        url: "https://arxiv.org/abs/2201.11903",
        description: "Research on CoT prompting"
      }
    ]
  },

  systemDesign: {
    category: "System Design & MLOps",
    resources: [
      {
        title: "Designing Machine Learning Systems by Chip Huyen",
        type: "Book",
        url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
        description: "Comprehensive ML systems design"
      },
      {
        title: "Grokking the System Design Interview",
        type: "Course",
        url: "https://www.educative.io/courses/grokking-the-system-design-interview",
        description: "System design fundamentals"
      },
      {
        title: "MLOps.org Community Resources",
        type: "Article",
        url: "https://ml-ops.org/",
        description: "MLOps best practices"
      },
      {
        title: "AWS SageMaker Documentation",
        type: "Documentation",
        url: "https://docs.aws.amazon.com/sagemaker/",
        description: "Cloud ML platform"
      },
      {
        title: "Google Cloud Vertex AI Docs",
        type: "Documentation",
        url: "https://cloud.google.com/vertex-ai/docs",
        description: "Google's ML platform"
      }
    ]
  },

  ragAndFineTuning: {
    category: "RAG & Fine-tuning",
    resources: [
      {
        title: "LangChain RAG Documentation",
        type: "Documentation",
        url: "https://python.langchain.com/docs/use_cases/question_answering/",
        description: "Building RAG systems"
      },
      {
        title: "LlamaIndex RAG Guide",
        type: "Guide",
        url: "https://docs.llamaindex.ai/en/stable/",
        description: "Alternative RAG framework"
      },
      {
        title: "Pinecone Vector Database Guide",
        type: "Guide",
        url: "https://www.pinecone.io/learn/",
        description: "Vector DB for RAG"
      },
      {
        title: "Fine-tuning vs RAG: When to Use Each",
        type: "Article",
        url: "https://www.pinecone.io/learn/fine-tuning-vs-rag/",
        description: "Trade-offs and use cases"
      }
    ]
  },

  productManagement: {
    category: "Product Management Fundamentals",
    resources: [
      {
        title: "Lenny's Newsletter",
        type: "Blog",
        url: "https://www.lennysnewsletter.com/",
        description: "Top PM newsletter"
      },
      {
        title: "The Mom Test by Rob Fitzpatrick",
        type: "Book",
        url: "https://www.momtestbook.com/",
        description: "Customer interview guide"
      },
      {
        title: "Inspired by Marty Cagan",
        type: "Book",
        url: "https://www.svpg.com/books/inspired/",
        description: "Product discovery"
      },
      {
        title: "Google's People + AI Guidebook",
        type: "Guide",
        url: "https://pair.withgoogle.com/",
        description: "AI UX principles"
      }
    ]
  },

  interviewPrep: {
    category: "Interview Preparation",
    resources: [
      {
        title: "Exponent PM Interview Prep",
        type: "Platform",
        url: "https://www.tryexponent.com/",
        description: "Mock interviews & courses"
      },
      {
        title: "IGotAnOffer AI PM Course",
        type: "Course",
        url: "https://igotanoffer.com/blogs/product-manager",
        description: "Comprehensive prep"
      },
      {
        title: "Pramp - Free Mock Interviews",
        type: "Platform",
        url: "https://www.pramp.com/",
        description: "Peer practice platform"
      },
      {
        title: "Cracking the PM Interview",
        type: "Book",
        url: "https://www.crackingthepminterview.com/",
        description: "Classic interview prep book"
      }
    ]
  },

  dataAndAnalytics: {
    category: "Data & Analytics",
    resources: [
      {
        title: "Mode Analytics SQL Tutorial",
        type: "Tutorial",
        url: "https://mode.com/sql-tutorial/",
        description: "Interactive SQL learning"
      },
      {
        title: "Statsig Blog - AI A/B Testing",
        type: "Blog",
        url: "https://www.statsig.com/blog",
        description: "Experimentation for AI"
      },
      {
        title: "PostHog Documentation",
        type: "Documentation",
        url: "https://posthog.com/docs",
        description: "Product analytics platform"
      },
      {
        title: "Mixpanel Product Analytics Guide",
        type: "Guide",
        url: "https://mixpanel.com/blog/",
        description: "Analytics best practices"
      }
    ]
  },

  ethicsAndResponsibleAI: {
    category: "AI Ethics & Responsible AI",
    resources: [
      {
        title: "Google AI Principles",
        type: "Guide",
        url: "https://ai.google/principles/",
        description: "Ethical AI guidelines"
      },
      {
        title: "Model Cards for Model Reporting",
        type: "Paper",
        url: "https://arxiv.org/abs/1810.03993",
        description: "Transparency in ML"
      },
      {
        title: "Google Responsible AI Practices",
        type: "Guide",
        url: "https://ai.google/responsibilities/responsible-ai-practices/",
        description: "Practical implementation"
      }
    ]
  }
}

/**
 * Gets relevant resources for a specific topic area
 */
export function getResourcesForTopic(topic: string): any[] {
  const lowerTopic = topic.toLowerCase()

  if (lowerTopic.includes('llm') || lowerTopic.includes('transformer') || lowerTopic.includes('language model')) {
    return AI_PM_RESOURCES.llmFundamentals.resources
  }

  if (lowerTopic.includes('prompt') || lowerTopic.includes('prompting')) {
    return AI_PM_RESOURCES.promptEngineering.resources
  }

  if (lowerTopic.includes('system design') || lowerTopic.includes('mlops') || lowerTopic.includes('architecture')) {
    return AI_PM_RESOURCES.systemDesign.resources
  }

  if (lowerTopic.includes('rag') || lowerTopic.includes('fine-tun') || lowerTopic.includes('vector')) {
    return AI_PM_RESOURCES.ragAndFineTuning.resources
  }

  if (lowerTopic.includes('interview') || lowerTopic.includes('prep')) {
    return AI_PM_RESOURCES.interviewPrep.resources
  }

  if (lowerTopic.includes('sql') || lowerTopic.includes('analytics') || lowerTopic.includes('data') || lowerTopic.includes('metric')) {
    return AI_PM_RESOURCES.dataAndAnalytics.resources
  }

  if (lowerTopic.includes('ethic') || lowerTopic.includes('responsible') || lowerTopic.includes('bias')) {
    return AI_PM_RESOURCES.ethicsAndResponsibleAI.resources
  }

  // Default: return product management resources
  return AI_PM_RESOURCES.productManagement.resources
}

/**
 * Formats resources as a string for inclusion in prompts
 */
export function formatResourceDatabase(): string {
  let output = "\n## CURATED RESOURCE DATABASE\n\n"
  output += "Use these specific resources when they match the user's learning path:\n\n"

  Object.values(AI_PM_RESOURCES).forEach(category => {
    output += `**${category.category}:**\n`
    category.resources.forEach(resource => {
      output += `- "${resource.title}" (${resource.type}): ${resource.url}\n`
    })
    output += "\n"
  })

  return output
}
