module.exports = [
"[project]/final_roadmap.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"title\":\"14-Week Comprehensive AI PM Roadmap\",\"goal\":\"Land a FAANG/Top-tier AI PM role by February 23, 2026\",\"startDate\":\"2025-11-18T00:00:00Z\",\"targetEndDate\":\"2026-02-23T00:00:00Z\",\"totalDurationWeeks\":14,\"timeCommitmentPerWeek\":\"20-25 hours/week\",\"profile\":{\"description\":\"Technical PM (4 years) with engineering background\",\"experience\":\"4 years\"},\"learningStyle\":\"Build → Research → Share\",\"coreSkills\":[{\"skill\":\"AI/ML Technical Foundations (LLM & Classical)\",\"description\":\"LLM fundamentals, RAG, Fine-tuning, Embeddings, Vector DBs, and Classical ML (Supervised/Unsupervised).\",\"relevantWeeks\":\"Weeks 1-3\"},{\"skill\":\"System Design & MLOps\",\"description\":\"Scalable architecture, Data pipelines, Cloud services (AWS/GCP), Cost optimization, Latency/quality trade-offs.\",\"relevantWeeks\":\"Weeks 2, 5\"},{\"skill\":\"Customer Discovery & AI UX\",\"description\":\"User interviews, Usability testing, UX for hallucinations/latency, Ethical constraints, User-centered AI design.\",\"relevantWeeks\":\"Weeks 4, 6\"},{\"skill\":\"Product Strategy & Stakeholder Comms\",\"description\":\"Market analysis, GTM strategy, Pricing, Roadmapping, PRDs, Leadership presentations, Cross-functional alignment.\",\"relevantWeeks\":\"Weeks 4, 8\"},{\"skill\":\"Data, Analytics & Experimentation\",\"description\":\"North Star metrics, RICE, A/B testing for AI, Analytics logging plans, SQL-based insights.\",\"relevantWeeks\":\"Weeks 4, 7\"},{\"skill\":\"AI Ethics & Responsible AI\",\"description\":\"Identifying and mitigating bias, fairness, 'red teaming', model cards, data privacy, building user trust.\",\"relevantWeeks\":\"Weeks 4, 7\"},{\"skill\":\"Interview & Career Excellence\",\"description\":\"Mock interviews (All types), STAR stories, Strategic networking, Resume/Portfolio optimization, Application execution.\",\"relevantWeeks\":\"Weeks 9-14\"}],\"phases\":[{\"phaseNumber\":1,\"title\":\"BUILD AI PRODUCT & PM FOUNDATION\",\"summary\":\"Master AI/ML fundamentals, system design, and core PM documentation through hands-on projects.\",\"weekRange\":\"Weeks 1-4\",\"weeks\":[{\"weekNumber\":1,\"title\":\"AI Fundamentals & First Product Build\",\"theme\":\"\\\"Build to Learn\\\" - Create your first AI product while learning fundamentals\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":14,\"research\":4,\"share\":2},\"buildSection\":{\"hours\":14,\"projectTitle\":\"AI-Powered Product Assistant\",\"description\":\"Build a ChatGPT-style interface for a specific domain. Implement conversation memory. Deploy to Vercel.\",\"technicalStack\":[\"Frontend: Next.js + Tailwind\",\"Backend: Python FastAPI or Node.js\",\"LLM: OpenAI GPT-4 or Claude 3.5 Sonnet\",\"Database: PostgreSQL for conversation history\"],\"deliverables\":[{\"description\":\"Working product with public URL\",\"isCompleted\":false},{\"description\":\"GitHub repo with README\",\"isCompleted\":false},{\"description\":\"1-Page Product Brief for this idea (defining user, problem, and solution)\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":4,\"deepDiveTopics\":[{\"description\":\"LLM architecture & how transformers work (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Andrej Karpathy's \\\"Intro to Large Language Models\\\" (YouTube)\",\"type\":\"YouTube\",\"url\":\"https://www.youtube.com/watch?v=zjkBMFhNj_g\"},{\"title\":\"The Illustrated Transformer\",\"type\":\"Article\",\"url\":\"https://jalammar.github.io/illustrated-transformer/\"}],\"subtasks\":[{\"description\":\"Read \\\"Attention Is All You Need\\\" paper summary\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Attention Is All You Need - Paper\",\"type\":\"Paper\",\"url\":\"https://arxiv.org/abs/1706.03762\"},{\"title\":\"The Transformer Family by Lilian Weng\",\"type\":\"Article\",\"url\":\"https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/\"}]},{\"description\":\"Understand tokenization, context windows, temperature\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"OpenAI Tokenizer Tool\",\"type\":\"Tool\",\"url\":\"https://platform.openai.com/tokenizer\"},{\"title\":\"Temperature and Sampling in LLMs\",\"type\":\"Article\",\"url\":\"https://lukesalamone.github.io/posts/what-is-temperature/\"}]}]},{\"description\":\"Prompt engineering best practices (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"OpenAI Prompt Engineering Guide\",\"type\":\"Guide\",\"url\":\"https://platform.openai.com/docs/guides/prompt-engineering\"},{\"title\":\"Anthropic Prompt Engineering Guide\",\"type\":\"Guide\",\"url\":\"https://docs.anthropic.com/claude/docs/prompt-engineering\"}],\"subtasks\":[{\"description\":\"Study OpenAI/Anthropic prompt guides\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"OpenAI Prompt Engineering Guide\",\"type\":\"Guide\",\"url\":\"https://platform.openai.com/docs/guides/prompt-engineering\"},{\"title\":\"Anthropic Prompt Engineering Guide\",\"type\":\"Guide\",\"url\":\"https://docs.anthropic.com/claude/docs/prompt-engineering\"}]},{\"description\":\"Learn few-shot learning, chain-of-thought prompting\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Chain-of-Thought Prompting Paper\",\"type\":\"Paper\",\"url\":\"https://arxiv.org/abs/2201.11903\"},{\"title\":\"Prompt Engineering Guide - LearnPrompting.org\",\"type\":\"Guide\",\"url\":\"https://learnprompting.org/docs/intro\"}]}]}],\"resources\":[{\"title\":\"Andrej Karpathy's \\\"Intro to Large Language Models\\\" (YouTube)\",\"type\":\"YouTube\"},{\"title\":\"OpenAI Prompt Engineering Guide\",\"type\":\"Guide\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"LinkedIn Post\",\"artifactDescription\":\"LinkedIn post: \\\"Built my first AI product assistant in 2 days - here's what I learned about LLMs\\\"\",\"details\":[\"Include: Demo video, key insights, technical challenges\"],\"tags\":[\"#AIProducts\",\"#ProductManagement\",\"#BuildInPublic\"]}},{\"weekNumber\":2,\"title\":\"System Design & MLOps\",\"theme\":\"\\\"Scale It\\\" - Design systems for millions of users and robust data pipelines\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":10,\"research\":6,\"share\":4},\"buildSection\":{\"hours\":10,\"projectTitle\":\"System Design for AI Chat Platform\",\"description\":\"Design architecture for 1M+ concurrent users. Create detailed diagrams. Calculate costs. Design data pipeline for training/fine-tuning.\",\"components\":[\"Load balancing & API gateway\",\"Caching strategy (Redis) to reduce LLM calls\",\"Vector database for RAG (Pinecone/Weaviate)\",\"Monitoring & logging (DataDog/CloudWatch)\",\"Cost optimization strategies\",\"MLOps Data Pipeline\"],\"deliverables\":[{\"description\":\"High-level architecture diagram (Excalidraw/Figma)\",\"isCompleted\":false},{\"description\":\"Data flow diagram for model training (ingestion to serving)\",\"isCompleted\":false},{\"description\":\"Cost analysis spreadsheet (per 1K/10K/100K users)\",\"isCompleted\":false},{\"description\":\"Trade-offs document (latency vs. cost vs. quality)\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":6,\"deepDiveTopics\":[{\"description\":\"Grokking the System Design Interview (AI-specific chapters)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Grokking the System Design Interview - Book\",\"type\":\"Book\",\"url\":\"https://www.educative.io/courses/grokking-the-system-design-interview\"},{\"title\":\"Designing Machine Learning Systems Book by Chip Huyen\",\"type\":\"Book\",\"url\":\"https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/\"}]},{\"description\":\"MLOps Principles (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"MLOps.org - MLOps Community\",\"type\":\"Article\",\"url\":\"https://ml-ops.org/\"},{\"title\":\"MLOps: Continuous delivery and automation pipelines in ML\",\"type\":\"Article\",\"url\":\"https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning\"}],\"subtasks\":[{\"description\":\"CI/CD for models\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Continuous Delivery for Machine Learning\",\"type\":\"Article\",\"url\":\"https://martinfowler.com/articles/cd4ml.html\"},{\"title\":\"MLflow - Model Registry\",\"type\":\"Documentation\",\"url\":\"https://mlflow.org/docs/latest/model-registry.html\"}]},{\"description\":\"Data/model versioning (DVC)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"DVC - Data Version Control\",\"type\":\"Documentation\",\"url\":\"https://dvc.org/doc\"},{\"title\":\"Getting Started with DVC\",\"type\":\"Guide\",\"url\":\"https://dvc.org/doc/start\"}]}]},{\"description\":\"Study real architectures (ChatGPT, Perplexity.ai, Notion AI)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"How ChatGPT Works: Architecture Breakdown\",\"type\":\"Article\",\"url\":\"https://www.assemblyai.com/blog/how-chatgpt-works-technical-explanation/\"},{\"title\":\"Perplexity AI Architecture - Building a Modern Search Engine\",\"type\":\"Article\",\"url\":\"https://www.perplexity.ai/sitemap\"},{\"title\":\"How Notion AI Works - Engineering Blog\",\"type\":\"Article\",\"url\":\"https://www.notion.so/blog/notion-ai\"}]},{\"description\":\"AWS/GCP AI services comparison (SageMaker vs. Vertex AI)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"AWS SageMaker Documentation\",\"type\":\"Documentation\",\"url\":\"https://docs.aws.amazon.com/sagemaker/\"},{\"title\":\"Google Cloud Vertex AI Documentation\",\"type\":\"Documentation\",\"url\":\"https://cloud.google.com/vertex-ai/docs\"},{\"title\":\"AWS vs GCP for Machine Learning - Comparison\",\"type\":\"Article\",\"url\":\"https://www.datacamp.com/tutorial/aws-vs-google-cloud-machine-learning\"}]}],\"resources\":[{\"title\":\"\\\"Designing Data-Intensive Applications\\\" by Martin Kleppmann (Ch 1-3)\",\"type\":\"Book\"},{\"title\":\"AWS Well-Architected Framework for AI/ML\",\"type\":\"Framework\"}]},\"shareSection\":{\"hours\":4,\"artifactTitle\":\"Medium/LinkedIn Article\",\"artifactDescription\":\"\\\"How to Design AI Products for 1M+ Users: Cost, Latency, and MLOps\\\"\",\"details\":[\"Include your architecture diagrams\",\"Share cost analysis and MLOps insights\"],\"tags\":[]}},{\"weekNumber\":3,\"title\":\"Advanced AI Capabilities & Classical ML\",\"theme\":\"\\\"Go Beyond Chat\\\" - Implement RAG and review classical ML foundations\",\"totalHours\":22,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":14,\"research\":6,\"share\":2},\"buildSection\":{\"hours\":14,\"projectTitle\":\"RAG-Powered Knowledge Assistant\",\"description\":\"Build a product that answers questions from your custom knowledge base. Implement RAG with vector embeddings. Compare against vanilla LLM responses.\",\"components\":[\"Company documentation assistant\",\"Research paper Q&A\"],\"deliverables\":[{\"description\":\"Working RAG product\",\"isCompleted\":false},{\"description\":\"Comparison dashboard (RAG vs. vanilla LLM)\",\"isCompleted\":false},{\"description\":\"Evaluation metrics (accuracy, relevance, latency)\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":6,\"deepDiveTopics\":[{\"description\":\"RAG architectures & best practices (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"LangChain RAG Documentation\",\"type\":\"Documentation\",\"url\":\"https://python.langchain.com/docs/use_cases/question_answering/\"},{\"title\":\"LlamaIndex RAG Guide\",\"type\":\"Guide\",\"url\":\"https://docs.llamaindex.ai/en/stable/module_guides/deploying/query_engine/retrieval_augmented_generation.html\"}],\"subtasks\":[{\"description\":\"Chunking strategies\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Text Chunking Strategies for RAG\",\"type\":\"Article\",\"url\":\"https://www.pinecone.io/learn/chunking-strategies/\"},{\"title\":\"LangChain Text Splitters\",\"type\":\"Documentation\",\"url\":\"https://python.langchain.com/docs/modules/data_connection/document_transformers/\"}]},{\"description\":\"Reranking techniques\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Reranking in RAG - Cohere Guide\",\"type\":\"Guide\",\"url\":\"https://cohere.com/blog/rerank\"},{\"title\":\"Improving RAG with Reranking\",\"type\":\"Article\",\"url\":\"https://www.pinecone.io/learn/reranking/\"}]}]},{\"description\":\"Fine-tuning vs. RAG trade-offs (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Fine-tuning vs RAG: When to Use Each\",\"type\":\"Article\",\"url\":\"https://www.pinecone.io/learn/fine-tuning-vs-rag/\"},{\"title\":\"RAG vs Fine-tuning: Choosing the Right Approach\",\"type\":\"Article\",\"url\":\"https://www.databricks.com/blog/rag-vs-finetuning-which-is-the-best-tool\"}],\"subtasks\":[{\"description\":\"When to use each approach\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"When to Use RAG vs Fine-tuning\",\"type\":\"Article\",\"url\":\"https://www.anyscale.com/blog/fine-tuning-vs-retrieval-augmented-generation-rag\"}]},{\"description\":\"Cost implications\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"OpenAI Fine-tuning Pricing\",\"type\":\"Documentation\",\"url\":\"https://openai.com/api/pricing/#fine-tuning-model-pricing\"},{\"title\":\"Anthropic Fine-tuning Pricing\",\"type\":\"Documentation\",\"url\":\"https://docs.anthropic.com/claude/docs/fine-tuning\"}]}]},{\"description\":\"Classical ML Foundations (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Andrew Ng's Machine Learning Course (Coursera)\",\"type\":\"Course\",\"url\":\"https://www.coursera.org/learn/machine-learning\"},{\"title\":\"Scikit-learn User Guide\",\"type\":\"Documentation\",\"url\":\"https://scikit-learn.org/stable/user_guide.html\"}],\"subtasks\":[{\"description\":\"Supervised (Classification, Regression) vs. Unsupervised (Clustering)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Supervised vs Unsupervised Learning\",\"type\":\"Article\",\"url\":\"https://www.ibm.com/think/topics/machine-learning\"},{\"title\":\"Introduction to Machine Learning - Stanford CS229\",\"type\":\"Course\",\"url\":\"https://cs229.stanford.edu/\"}]},{\"description\":\"How recommendation systems work (collaborative vs. content-based)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Collaborative Filtering - Google ML Guide\",\"type\":\"Guide\",\"url\":\"https://developers.google.com/machine-learning/recommendation/collaborative/basics\"},{\"title\":\"Content-Based Filtering\",\"type\":\"Article\",\"url\":\"https://developers.google.com/machine-learning/recommendation/content-based/basics\"}]},{\"description\":\"Basic model evaluation (Confusion Matrix, Precision/Recall)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Classification Metrics - Scikit-learn\",\"type\":\"Documentation\",\"url\":\"https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics\"},{\"title\":\"Understanding Precision and Recall\",\"type\":\"Article\",\"url\":\"https://towardsdatascience.com/understanding-confusion-matrix-a9ad42dcfd62\"}]}]}],\"resources\":[{\"title\":\"LangChain documentation on RAG\",\"type\":\"Documentation\"},{\"title\":\"Andrew Ng's 'Machine Learning' course (relevant chapters)\",\"type\":\"Course\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"LinkedIn Post\",\"artifactDescription\":\"\\\"RAG vs. Fine-tuning: A PM's Guide to Customizing LLMs\\\"\",\"details\":[\"Include metrics, costs, use cases\"],\"tags\":[]}},{\"weekNumber\":4,\"title\":\"Product Strategy & PM Artifacts\",\"theme\":\"\\\"Think Like a PM\\\" - Strategy, prioritization, ethics, and engineering comms\",\"totalHours\":22,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":10,\"research\":8,\"share\":4},\"buildSection\":{\"hours\":10,\"projectTitle\":\"AI Product Strategy & Engineering PRD\",\"description\":\"Choose one of your products. Create comprehensive strategy doc. Then, write a detailed PRD for the *next major feature* (which you will build in Week 5).\",\"deliverables\":[{\"description\":\"Strategy document (8-10 pages) (Market analysis, Personas, Vision, Roadmap, North Star, Pricing)\",\"isCompleted\":false},{\"description\":\"Product Requirements Doc (PRD) for Flagship Project (User Stories, Acceptance Criteria, Scope, Analytics hooks)\",\"isCompleted\":false},{\"description\":\"Responsible AI & Ethics Brief (1-page) for your product\",\"isCompleted\":false},{\"description\":\"Metrics dashboard (mock data is fine)\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":8,\"deepDiveTopics\":[{\"description\":\"AI product teardowns (4h) (ChatGPT, Claude, Perplexity, Jasper)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"ChatGPT Product Teardown - Lenny's Newsletter\",\"type\":\"Article\",\"url\":\"https://www.lennysnewsletter.com/p/inside-chatgpt\"},{\"title\":\"Perplexity AI Product Analysis\",\"type\":\"Article\",\"url\":\"https://www.perplexity.ai/\"},{\"title\":\"Jasper AI - Product Review\",\"type\":\"Article\",\"url\":\"https://jasper.ai/\"}]},{\"description\":\"Responsible AI Frameworks (2h) (Google's AI Principles, Model Cards)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Google AI Principles\",\"type\":\"Guide\",\"url\":\"https://ai.google/principles/\"},{\"title\":\"Model Cards for Model Reporting\",\"type\":\"Paper\",\"url\":\"https://arxiv.org/abs/1810.03993\"},{\"title\":\"Google Responsible AI Practices\",\"type\":\"Guide\",\"url\":\"https://ai.google/responsibilities/responsible-ai-practices/\"}]},{\"description\":\"How to write effective PRDs (2h) (Study examples from Lenny's Newsletter, Atlassian)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"How to Write a PRD - Lenny's Newsletter\",\"type\":\"Article\",\"url\":\"https://www.lennysnewsletter.com/p/how-to-write-a-product-requirements\"},{\"title\":\"Atlassian PRD Template\",\"type\":\"Template\",\"url\":\"https://www.atlassian.com/agile/product-management/requirements\"},{\"title\":\"Product Requirements Document Examples\",\"type\":\"Article\",\"url\":\"https://www.productplan.com/glossary/product-requirements-document/\"}]}],\"resources\":[{\"title\":\"Lenny's Podcast episodes on AI PMs\",\"type\":\"Podcast\"},{\"title\":\"a16z articles on AI product-market fit\",\"type\":\"Article\"},{\"title\":\"Google's Responsible AI Practices\",\"type\":\"Guide\"}]},\"shareSection\":{\"hours\":4,\"artifactTitle\":\"LinkedIn Carousel\",\"artifactDescription\":\"\\\"From 1-Pager to PRD: My Process for Scoping an AI Product\\\"\",\"details\":[\"Include your (abbreviated) PRD template and strategic insights\"],\"tags\":[\"#ResponsibleAI\",\"#ProductManagement\"]}}]},{\"phaseNumber\":2,\"title\":\"SIGNATURE PROJECT & CORE PM EXECUTION\",\"summary\":\"Build a flagship product while executing on the core PM competencies: user research, data analysis, strategy, and stakeholder communication.\",\"weekRange\":\"Weeks 5-9\",\"weeks\":[{\"weekNumber\":5,\"title\":\"Flagship Product Build & AI UX\",\"theme\":\"\\\"Ship v1.0\\\" - Build your portfolio centerpiece based on your PRD\",\"totalHours\":22,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":18,\"research\":2,\"share\":2},\"buildSection\":{\"hours\":18,\"projectTitle\":\"Full-Stack AI Product (v1.0)\",\"description\":\"Build the product defined in your Week 4 PRD. Focus on production quality, user auth, and deliberate AI-UX (handling latency, errors, and trust).\",\"technicalStack\":[\"Frontend: Next.js 14 (App Router)\",\"Backend: Supabase or Firebase\",\"LLM: Claude 3.5 Sonnet or GPT-4\",\"Analytics: PostHog or Mixpanel\"],\"deliverables\":[{\"description\":\"Live product (v1.0) with public URL\",\"isCompleted\":false},{\"description\":\"Product demo video (2-3 min) highlighting AI-UX features\",\"isCompleted\":false},{\"description\":\"GitHub repo with comprehensive README\",\"isCompleted\":false},{\"description\":\"UX mockups (Figma) for error/loading/trust states\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":2,\"deepDiveTopics\":[{\"description\":\"Study Google's People + AI Guidebook\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Google's People + AI Guidebook\",\"type\":\"Guide\",\"url\":\"https://pair.withgoogle.com/\"}]},{\"description\":\"Research pricing strategies for AI (token-based vs. user-based)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"AI Pricing Strategies for AI Apps\",\"type\":\"Article\",\"url\":\"https://www.whoisgrowing.com/p/ai-pricing-strategies-for-ai-apps\"},{\"title\":\"Unit Economics for AI SaaS Companies\",\"type\":\"Article\",\"url\":\"https://www.drivetrain.ai/post/unit-economics-of-ai-saas-companies-cfo-guide-for-managing-token-based-costs-and-margins\"},{\"title\":\"AI Pricing Models Explained: From Tokens to Seats\",\"type\":\"Article\",\"url\":\"https://topcompany.ai/ai-pricing-models-explained-from-tokens-to-seats\"}]}],\"resources\":[{\"title\":\"Google's People + AI Guidebook\",\"type\":\"Guide\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"Twitter/LinkedIn Thread\",\"artifactDescription\":\"\\\"I built [Product Name]... here's how I designed the UX for AI (hallucinations, latency, and all)\\\"\",\"details\":[\"Include: Demo video, tech decisions, AI-UX screenshots\"],\"tags\":[\"#AIUX\",\"#Design\"]}},{\"weekNumber\":6,\"title\":\"Customer Discovery & AI Usability\",\"theme\":\"\\\"Talk to Users\\\" - Go beyond building and actively seek customer feedback\",\"totalHours\":22,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":10,\"research\":10,\"share\":2},\"buildSection\":{\"hours\":10,\"projectTitle\":\"User Research Artifacts\",\"description\":\"Create the documents needed to run professional user research for your flagship product.\",\"deliverables\":[{\"description\":\"User Interview Script (for generative discovery)\",\"isCompleted\":false},{\"description\":\"Usability Test Plan (for your v1.0 product)\",\"isCompleted\":false},{\"description\":\"User Research Synthesis Report (template)\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":10,\"deepDiveTopics\":[{\"description\":\"Conduct 5 mock user interviews (with peers, friends) using your script\",\"isCompleted\":false},{\"description\":\"Conduct 3 mock usability tests on your v1.0 product\",\"isCompleted\":false},{\"description\":\"Fill out your Synthesis Report with real findings\",\"isCompleted\":false},{\"description\":\"Read 'The Mom Test' (summary or book)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"The Mom Test by Rob Fitzpatrick\",\"type\":\"Book\",\"url\":\"https://www.momtestbook.com/\"},{\"title\":\"Nielsen Norman Group - Usability Testing Articles\",\"type\":\"Article\",\"url\":\"https://www.nngroup.com/topic/usability-testing/\"}]}],\"resources\":[{\"title\":\"'The Mom Test' by Rob Fitzpatrick\",\"type\":\"Book\"},{\"title\":\"NN/g (Nielsen Norman Group) articles on usability testing\",\"type\":\"Article\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"LinkedIn Post\",\"artifactDescription\":\"\\\"I user-tested my AI product with 5 people. Here's what I learned about AI-UX (and my own bad assumptions).\\\"\",\"details\":[\"Share 3 key insights from your synthesis report\"],\"tags\":[\"#UserResearch\",\"#ProductManagement\"]}},{\"weekNumber\":7,\"title\":\"Data, Analytics & Experimentation\",\"theme\":\"\\\"Measure What Matters\\\" - Define how to measure success for your AI product\",\"totalHours\":22,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":10,\"research\":10,\"share\":2},\"buildSection\":{\"hours\":10,\"projectTitle\":\"Data & Experimentation Plans\",\"description\":\"Define the data infrastructure and experimentation framework for your flagship product.\",\"deliverables\":[{\"description\":\"Analytics & Logging Plan (Define key events, properties, and funnels)\",\"isCompleted\":false},{\"description\":\"A/B Test Plan for a new AI feature (Hypothesis, Primary/Counter Metrics, Rollout)\",\"isCompleted\":false},{\"description\":\"SQL queries to answer 3 key product questions (using mock schema)\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":10,\"deepDiveTopics\":[{\"description\":\"Deep dive on SQL (e.g., Mode's SQL tutorial)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Mode Analytics SQL Tutorial\",\"type\":\"Guide\",\"url\":\"https://mode.com/sql-tutorial/\"},{\"title\":\"W3Schools SQL Tutorial\",\"type\":\"Tutorial\",\"url\":\"https://www.w3schools.com/sql/\"},{\"title\":\"SQLBolt - Interactive SQL Tutorial\",\"type\":\"Tutorial\",\"url\":\"https://sqlbolt.com/\"}]},{\"description\":\"Study A/B testing for AI (Statsig/Optimizely blogs)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Statsig Blog - AI A/B Testing\",\"type\":\"Blog\",\"url\":\"https://www.statsig.com/blog\"},{\"title\":\"Optimizely A/B Testing Guide\",\"type\":\"Guide\",\"url\":\"https://www.optimizely.com/optimization-glossary/ab-testing/\"}],\"subtasks\":[{\"description\":\"Challenges (novelty effect, cost)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"A/B Testing AI Products - Challenges\",\"type\":\"Article\",\"url\":\"https://www.statsig.com/blog/ab-testing-ai-products\"}]},{\"description\":\"Interleaving for ranking models\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Interleaving Experiments for Ranking\",\"type\":\"Article\",\"url\":\"https://engineering.linkedin.com/blog/2019/06/interleaving-experiments-on-linkedin\"}]}]},{\"description\":\"Implement PostHog/Mixpanel and track your defined events in your v1.0 product\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"PostHog Documentation\",\"type\":\"Documentation\",\"url\":\"https://posthog.com/docs\"},{\"title\":\"Mixpanel Documentation\",\"type\":\"Documentation\",\"url\":\"https://developer.mixpanel.com/docs\"}]}],\"resources\":[{\"title\":\"Mode's SQL Tutorial\",\"type\":\"Guide\"},{\"title\":\"Statsig blogs on AI A/B testing\",\"type\":\"Blog\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"Medium Article\",\"artifactDescription\":\"\\\"How to Define Metrics and A/B Tests for Generative AI Products\\\"\",\"details\":[\"Share your A/B test plan template\",\"Discuss challenges of measuring 'quality'\"],\"tags\":[\"#ABTesting\",\"#DataScience\"]}},{\"weekNumber\":8,\"title\":\"Strategy, GTM & Stakeholder Comms\",\"theme\":\"\\\"Align the Organization\\\" - Create the artifacts to get buy-in and launch\",\"totalHours\":22,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":12,\"research\":8,\"share\":2},\"buildSection\":{\"hours\":12,\"projectTitle\":\"Launch & Strategy Artifacts\",\"description\":\"Create the high-level strategy and communication documents for your flagship product.\",\"deliverables\":[{\"description\":\"Go-to-Market (GTM) Strategy & Launch Plan (1-page)\",\"isCompleted\":false},{\"description\":\"5-Slide Leadership 'Go/No-Go' Deck (Problem, Solution, GTM, Metrics, Ask)\",\"isCompleted\":false},{\"description\":\"Stakeholder Update Email Template (for Engineering, Marketing, Leadership)\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":8,\"deepDiveTopics\":[{\"description\":\"Analyze GTM & pricing of 3 competitors (4h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Competitive Analysis Framework - ProductPlan\",\"type\":\"Guide\",\"url\":\"https://www.productplan.com/glossary/competitive-analysis/\"},{\"title\":\"How to Conduct Competitive Analysis\",\"type\":\"Article\",\"url\":\"https://www.productplan.com/learn/competitive-analysis/\"}]},{\"description\":\"Read 'Crossing the Chasm' (summary or book) (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Crossing the Chasm by Geoffrey A. Moore\",\"type\":\"Book\",\"url\":\"https://www.amazon.com/Crossing-Chasm-3rd-Disruptive-Mainstream/dp/0062292986\"},{\"title\":\"Crossing the Chasm - Book Summary\",\"type\":\"Article\",\"url\":\"https://www.summary.com/book-summaries/crossing-the-chasm\"}]},{\"description\":\"Study Strategic Storytelling (how to present to execs) (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Sequoia Capital's Guide to Writing a Business Plan\",\"type\":\"Guide\",\"url\":\"https://www.sequoiacap.com/article/writing-a-business-plan/\"},{\"title\":\"Presentation Zen by Garr Reynolds\",\"type\":\"Book\",\"url\":\"https://www.presentationzen.com/\"},{\"title\":\"How to Present to Executives - Harvard Business Review\",\"type\":\"Article\",\"url\":\"https://hbr.org/2020/09/how-to-present-to-executives\"}]}],\"resources\":[{\"title\":\"'Crossing the Chasm' by Geoffrey A. Moore\",\"type\":\"Book\"},{\"title\":\"Sequoia Capital's guide to writing a business plan\",\"type\":\"Guide\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"LinkedIn Post\",\"artifactDescription\":\"\\\"I created a GTM plan and Leadership deck for my AI product. Here's the 5-slide structure I used to justify the launch.\\\"\",\"details\":[\"Share the 5 slide titles and their purpose\"],\"tags\":[\"#Strategy\",\"#GTM\"]}},{\"weekNumber\":9,\"title\":\"Portfolio & Brand Consolidation\",\"theme\":\"\\\"Become Visible\\\" - Consolidate all new artifacts into a world-class portfolio\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":12,\"research\":4,\"share\":4},\"buildSection\":{\"hours\":12,\"projectTitle\":\"Portfolio Website (v2.0)\",\"description\":\"Build your professional portfolio site (Webflow, Framer, Next.js). This is now your #1 asset.\",\"deliverables\":[{\"description\":\"Live portfolio website with public URL\",\"isCompleted\":false},{\"description\":\"Case Study 1: Flagship Product (show demo, PRD, GTM deck, User Research insights)\",\"isCompleted\":false},{\"description\":\"Case Study 2: RAG Product (show demo, system design, eval metrics)\",\"isCompleted\":false},{\"description\":\"Case Study 3: AI Product Assistant (show demo, 1-pager)\",\"isCompleted\":false},{\"description\":\"Updated LinkedIn profile to point to new portfolio\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":4,\"deepDiveTopics\":[{\"description\":\"Study 5-10 portfolios of top PMs (2h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Bestfolios - Product Manager Portfolio Examples\",\"type\":\"Gallery\",\"url\":\"https://www.bestfolios.com/collections/product-manager\"},{\"title\":\"PM Portfolio Examples - Medium\",\"type\":\"Article\",\"url\":\"https://medium.com/tag/product-manager-portfolio\"}]},{\"description\":\"Research AI PM communities (2h) (Product School, Mind the Product, AI PM Discord)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Product School - Free Resources\",\"type\":\"Platform\",\"url\":\"https://www.productschool.com/resources\"},{\"title\":\"Mind the Product\",\"type\":\"Platform\",\"url\":\"https://www.mindtheproduct.com/\"},{\"title\":\"AI Product Management Community\",\"type\":\"Community\",\"url\":\"https://www.linkedin.com/groups/\"}]}],\"resources\":[{\"title\":\"bestfolios.com (for PM examples)\",\"type\":\"Gallery\"}]},\"shareSection\":{\"hours\":4,\"artifactTitle\":\"Portfolio Launch & Networking\",\"artifactDescription\":\"Launch portfolio website publicly. Announce on LinkedIn with retrospective post. Engage with 20+ AI PM posts this week. DM 5 AI PMs for feedback on your portfolio.\",\"details\":[],\"tags\":[]}}]},{\"phaseNumber\":3,\"title\":\"INTERVIEW PREP & CAREER LAUNCH\",\"summary\":\"Execute strategic networking, optimize application materials, and nail mock interviews covering the full breadth of PM skills.\",\"weekRange\":\"Weeks 10-14\",\"weeks\":[{\"weekNumber\":10,\"title\":\"Mock Interviews: Product & Tech\",\"theme\":\"\\\"Perfect Your Performance\\\" - Product Sense & System Design\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":8,\"research\":10,\"share\":2},\"buildSection\":{\"hours\":8,\"projectTitle\":\"Interview Answer Bank (v1)\",\"description\":\"Create reusable templates and practice answers for Product & Tech loops.\",\"deliverables\":[{\"description\":\"5 completed CIRCLES practice questions (written)\",\"isCompleted\":false},{\"description\":\"3 system design diagrams (written)\",\"isCompleted\":false},{\"description\":\"1-page framework for AI ethics & bias questions\",\"isCompleted\":false},{\"description\":\"1-page framework for A/B test & metrics questions\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":10,\"deepDiveTopics\":[{\"description\":\"Schedule 3 mock interviews (1.5h each)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Exponent.pm - AI PM Interview Prep\",\"type\":\"Platform\",\"url\":\"https://www.tryexponent.com/\"},{\"title\":\"IGotAnOffer - AI PM Interview Course\",\"type\":\"Platform\",\"url\":\"https://igotanoffer.com/blogs/product-manager\"},{\"title\":\"Pramp - Free Mock Interviews\",\"type\":\"Platform\",\"url\":\"https://www.pramp.com/\"}],\"subtasks\":[{\"description\":\"Mock 1: Product Sense (AI)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"CIRCLES Framework - Exponent\",\"type\":\"Guide\",\"url\":\"https://www.tryexponent.com/blog/circles-framework\"}]},{\"description\":\"Mock 2: Technical & System Design (AI)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"System Design Interview - Exponent\",\"type\":\"Guide\",\"url\":\"https://www.tryexponent.com/courses/system-design-interview\"}]},{\"description\":\"Mock 3: Analytical & Data (AI)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Analytical PM Interview Prep - Exponent\",\"type\":\"Guide\",\"url\":\"https://www.tryexponent.com/courses/analytics-pm-interview\"}]}]},{\"description\":\"Record each mock interview and get detailed feedback\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"How to Get Better Interview Feedback\",\"type\":\"Article\",\"url\":\"https://www.tryexponent.com/blog/interview-feedback\"}]},{\"description\":\"Create improvement plan based on feedback\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Interview Improvement Plan Template\",\"type\":\"Template\",\"url\":\"https://www.tryexponent.com/resources\"}]}],\"resources\":[{\"title\":\"Exponent.pm\",\"type\":\"Platform\"},{\"title\":\"IGotAnOffer\",\"type\":\"Platform\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"LinkedIn Post\",\"artifactDescription\":\"\\\"Just finished 3 AI PM mock interviews. Here's the #1 mistake I was making in the Product Sense loop.\\\"\",\"details\":[],\"tags\":[\"#InterviewPrep\"]}},{\"weekNumber\":11,\"title\":\"Mock Interviews: Behavioral & Strategy\",\"theme\":\"\\\"Perfect Your Performance\\\" - STAR Stories & Stakeholder Qs\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":10,\"research\":8,\"share\":2},\"buildSection\":{\"hours\":10,\"projectTitle\":\"Interview Answer Bank (v2)\",\"description\":\"Write out your STAR stories, focusing on the new PM skills you've built.\",\"deliverables\":[{\"description\":\"STAR stories document (20 stories)\",\"isCompleted\":false,\"subtasks\":[{\"description\":\"Stories for: Stakeholder conflict, Influencing eng, Handling ambiguity, Failure, User empathy, Data-driven decision\",\"isCompleted\":false}]},{\"description\":\"Practice 'Tell me about yourself' (30s, 60s, 90s versions)\",\"isCompleted\":false},{\"description\":\"Practice 'Why [Company]?' for 5 target companies\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":8,\"deepDiveTopics\":[{\"description\":\"Schedule 2 mock interviews (1.5h each)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Behavioral Interview Prep - Exponent\",\"type\":\"Guide\",\"url\":\"https://www.tryexponent.com/courses/behavioral-interview\"},{\"title\":\"STAR Method Guide\",\"type\":\"Guide\",\"url\":\"https://www.themuse.com/advice/star-interview-method\"}],\"subtasks\":[{\"description\":\"Mock 4: Behavioral & Leadership\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Leadership Interview Questions - Glassdoor\",\"type\":\"Article\",\"url\":\"https://www.glassdoor.com/blog/guide/leadership-interview-questions/\"}]},{\"description\":\"Mock 5: Stakeholder & Strategy (GTM, Pricing)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Strategy Interview Questions - Exponent\",\"type\":\"Guide\",\"url\":\"https://www.tryexponent.com/blog/strategy-pm-interview\"}]}]},{\"description\":\"Refine STAR stories based on mock feedback\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"How to Craft Powerful STAR Stories\",\"type\":\"Article\",\"url\":\"https://www.tryexponent.com/blog/star-method-product-manager\"},{\"title\":\"STAR Story Examples - Product Manager\",\"type\":\"Article\",\"url\":\"https://igotanoffer.com/blogs/product-manager/star-method-product-manager-interview\"}]}],\"resources\":[{\"title\":\"Peers from PM communities\",\"type\":\"Networking\"}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"LinkedIn Post\",\"artifactDescription\":\"\\\"How I'm using my 4 portfolio projects to create 20+ STAR interview stories.\\\"\",\"details\":[],\"tags\":[]}},{\"weekNumber\":12,\"title\":\"Strategic Networking & Outreach\",\"theme\":\"\\\"Build Connections\\\" - Network your way in\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":14,\"research\":4,\"share\":2},\"buildSection\":{\"hours\":14,\"projectTitle\":\"Strategic Networking Campaign\",\"description\":\"1. Target Companies Research (4h) - List 30 companies. 2. LinkedIn Outreach (7h) - Identify 50 people. 3. Cold Email Campaign (3h) - Send 20 emails.\",\"deliverables\":[{\"description\":\"Target companies spreadsheet (30 companies)\",\"isCompleted\":false},{\"description\":\"50 LinkedIn connection requests sent (with context!)\",\"isCompleted\":false},{\"description\":\"20 cold emails sent\",\"isCompleted\":false},{\"description\":\"Follow-up schedule\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":4,\"deepDiveTopics\":[{\"description\":\"Conduct 4-5 coffee chats (30 min each)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"How to Network Effectively - Product School\",\"type\":\"Article\",\"url\":\"https://www.productschool.com/blog/product-management-2/product-manager-networking-tips\"},{\"title\":\"Informational Interview Guide\",\"type\":\"Guide\",\"url\":\"https://www.themuse.com/advice/how-to-ace-an-informational-interview\"}]},{\"description\":\"Ask: AI PM role, valuable skills, interview process, referrals, challenges\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Coffee Chat Questions for PMs\",\"type\":\"Article\",\"url\":\"https://www.productschool.com/blog/product-management-2/product-manager-networking-questions\"},{\"title\":\"How to Ask for Referrals\",\"type\":\"Article\",\"url\":\"https://www.themuse.com/advice/how-to-ask-for-a-referral\"}]}],\"resources\":[],\"deliverables\":[{\"description\":\"Notes from each conversation\",\"isCompleted\":false},{\"description\":\"Follow-up thank you messages\",\"isCompleted\":false},{\"description\":\"Referral requests (where appropriate)\",\"isCompleted\":false}]},\"shareSection\":{\"hours\":2,\"artifactTitle\":\"Content for Visibility\",\"artifactDescription\":\"Post 3 times this week on LinkedIn. Engage with your network's content daily.\",\"details\":[\"Topic: \\\"What I learned from networking with 20 AI PMs\\\"\",\"Topic: \\\"My AI PM portfolio [showcase your work]\\\"\"],\"tags\":[]}},{\"weekNumber\":13,\"title\":\"Application Materials & Sprint\",\"theme\":\"\\\"Execute & Close\\\" - Application blitz & final polish\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":15,\"research\":5,\"share\":0},\"buildSection\":{\"hours\":15,\"projectTitle\":\"Application Sprint (Wave 1)\",\"description\":\"Create all materials and apply to Tier 1 roles.\",\"deliverables\":[{\"description\":\"AI PM-focused resume (vFinal), get 3+ reviews\",\"isCompleted\":false},{\"description\":\"3 Cover letter templates (FAANG, AI-first startup, Traditional tech)\",\"isCompleted\":false},{\"description\":\"Application Tracker (spreadsheet)\",\"isCompleted\":false},{\"description\":\"Apply to 15 Tier-1 roles (Dream jobs, max customization)\",\"isCompleted\":false},{\"description\":\"Request 5+ referrals from Week 12 network\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":5,\"deepDiveTopics\":[{\"description\":\"Company-Specific Prep for Tier-1 (5h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Glassdoor - Company Reviews & Interview Questions\",\"type\":\"Platform\",\"url\":\"https://www.glassdoor.com/index.htm\"},{\"title\":\"Blind - Company Insights\",\"type\":\"Platform\",\"url\":\"https://www.teamblind.com/\"},{\"title\":\"Levels.fyi - Company Compensation & Info\",\"type\":\"Platform\",\"url\":\"https://www.levels.fyi/\"}],\"subtasks\":[{\"description\":\"Research product launches, culture, interview questions\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Company Blog - Latest Product Announcements\",\"type\":\"Article\",\"url\":\"https://blog.google/\"},{\"title\":\"InterviewBit - Company-Specific Interview Prep\",\"type\":\"Platform\",\"url\":\"https://www.interviewbit.com/\"}]}]}],\"resources\":[]},\"shareSection\":{\"hours\":0,\"artifactTitle\":\"(Head-down week)\",\"artifactDescription\":\"Focus on applications, not public sharing.\",\"details\":[],\"tags\":[]}},{\"weekNumber\":14,\"title\":\"Final Prep, Follow-ups & Wave 2\",\"theme\":\"\\\"Maintain Momentum\\\" - Interviews, follow-ups, and expanding the search\",\"totalHours\":20,\"status\":\"PLANNED\",\"timeBreakdown\":{\"build\":10,\"research\":6,\"share\":4},\"buildSection\":{\"hours\":10,\"projectTitle\":\"Application Sprint (Wave 2)\",\"description\":\"Apply to Tier 2/3 roles and handle follow-ups.\",\"deliverables\":[{\"description\":\"Apply to 20+ Tier 2/3 roles\",\"isCompleted\":false},{\"description\":\"Send follow-up emails for Wave 1 applications\",\"isCompleted\":false},{\"description\":\"Send referral thank-you notes\",\"isCompleted\":false}]},\"researchSection\":{\"hours\":6,\"deepDiveTopics\":[{\"description\":\"Practice Sessions (3h)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"How to Answer 'Tell Me About Yourself' - Product Manager\",\"type\":\"Article\",\"url\":\"https://www.tryexponent.com/blog/tell-me-about-yourself-product-manager\"},{\"title\":\"Recording Interview Practice Tips\",\"type\":\"Article\",\"url\":\"https://www.themuse.com/advice/how-to-record-yourself-practicing-for-an-interview\"}],\"subtasks\":[{\"description\":\"Self-record answering 'Tell me about yourself' and 'Why AI PM?'\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Tell Me About Yourself - Product Manager Template\",\"type\":\"Template\",\"url\":\"https://igotanoffer.com/blogs/product-manager/product-manager-tell-me-about-yourself\"}]},{\"description\":\"Practice with a peer one more time (focus on weakest area)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"Pramp - Free Peer Mock Interviews\",\"type\":\"Platform\",\"url\":\"https://www.pramp.com/\"}]}]},{\"description\":\"First-round interview prep (if scheduled)\",\"isCompleted\":false,\"suggestedResources\":[{\"title\":\"First Round Interview Prep - Exponent\",\"type\":\"Guide\",\"url\":\"https://www.tryexponent.com/courses/phone-screen-interview\"},{\"title\":\"Phone Screen Interview Guide - IGotAnOffer\",\"type\":\"Guide\",\"url\":\"https://igotanoffer.com/blogs/product-manager/product-manager-phone-screen-interview\"}]}],\"resources\":[]},\"shareSection\":{\"hours\":4,\"artifactTitle\":\"Celebration Post & Continued Engagement\",\"artifactDescription\":\"Share your 14-week journey on LinkedIn. This builds social proof and visibility right as recruiters are viewing your profile.\",\"details\":[\"Include: What you built, what you learned, key artifacts\",\"Thank your supporters\",\"Announce you are 'officially on the market for an AI PM role'\"],\"deliverables\":[{\"description\":\"Public celebration of your journey\",\"isCompleted\":false}],\"tags\":[\"#OpenToWork\",\"#AI\",\"#ProductManager\"]}}]}],\"supplementalSections\":{\"weeklyTimeAllocationTemplate\":{\"monTue\":\"BUILD Days: 8-10 hours - Hands-on coding/product work, System design, Creating artifacts (PRDs, Decks)\",\"wedThu\":\"RESEARCH Days: 6-8 hours - Deep dives, User research, Competitive analysis, Interview prep\",\"friSat\":\"SHARE Days: 4-6 hours - Writing posts/articles, Creating demo videos, Portfolio updates, Networking\",\"sun\":\"REFLECT Day: 2-3 hours - Review week's progress, Plan next week, Adjust roadmap\"},\"successMetrics\":[{\"category\":\"Build Metrics\",\"metrics\":[{\"description\":\"Projects completed & deployed\",\"isCompleted\":false},{\"description\":\"PM Artifacts completed (PRD, GTM Deck, Strategy Doc, etc.)\",\"isCompleted\":false},{\"description\":\"Ethics briefs & A/B test plans completed\",\"isCompleted\":false}]},{\"category\":\"Research Metrics\",\"metrics\":[{\"description\":\"Hours spent learning\",\"isCompleted\":false},{\"description\":\"User interviews/usability tests conducted\",\"isCompleted\":false},{\"description\":\"Concepts mastered (Classical ML, GTM, Stakeholder Comms)\",\"isCompleted\":false}]},{\"category\":\"Share Metrics\",\"metrics\":[{\"description\":\"LinkedIn posts published\",\"isCompleted\":false},{\"description\":\"Article views & engagement\",\"isCompleted\":false},{\"description\":\"Portfolio visitors\",\"isCompleted\":false},{\"description\":\"New meaningful connections made\",\"isCompleted\":false}]},{\"category\":\"Career Metrics (Weeks 10-14)\",\"metrics\":[{\"description\":\"Applications submitted\",\"isCompleted\":false},{\"description\":\"Referrals received\",\"isCompleted\":false},{\"description\":\"Interviews scheduled\",\"isCompleted\":false},{\"description\":\"Mock interviews completed (5+)\",\"isCompleted\":false},{\"description\":\"Networking conversations (10+)\",\"isCompleted\":false}]}],\"masterResources\":[{\"category\":\"Essential Tools - Development\",\"items\":[{\"name\":\"LLM APIs\",\"description\":\"OpenAI, Anthropic Claude, Together.ai\"},{\"name\":\"Vector DBs\",\"description\":\"Pinecone (free tier), ChromaDB (local), Weaviate\"},{\"name\":\"Frameworks\",\"description\":\"LangChain, LlamaIndex\"},{\"name\":\"Deployment\",\"description\":\"Vercel, Railway, Render, Replit\"},{\"name\":\"Frontend\",\"description\":\"Next.js, Tailwind, Shadcn UI\"},{\"name\":\"Backend\",\"description\":\"FastAPI (Python), Express (Node)\"}]},{\"category\":\"Essential Tools - PM & Design\",\"items\":[{\"name\":\"Figma/Excalidraw\",\"description\":\"Design mockups & system diagrams\"},{\"name\":\"Notion/Coda\",\"description\":\"PRDs, Strategy Docs, Note-taking\"},{\"name\":\"Loom\",\"description\":\"Demo videos\"},{\"name\":\"Framer/Webflow\",\"description\":\"No-code portfolio sites\"}]},{\"category\":\"Essential Tools - Learning Platforms\",\"items\":[{\"name\":\"Exponent\",\"description\":\"AI PM interview prep\"},{\"name\":\"Coursera\",\"description\":\"Duke AI for PM, Andrew Ng ML Course\"},{\"name\":\"DeepLearning.AI\",\"description\":\"Short courses on LLMs, RAG, fine-tuning\"},{\"name\":\"Reforge\",\"description\":\"(Read free content) - for growth & strategy\"}]},{\"category\":\"Essential Tools - Interview Prep\",\"items\":[{\"name\":\"IGotAnOffer\",\"description\":\"AI PM Interview Course\"},{\"name\":\"Product School\",\"description\":\"Free guides & frameworks\"},{\"name\":\"Lenny's Newsletter\",\"description\":\"PM insights & AI content\"}]},{\"category\":\"Reading List - Core PM\",\"items\":[{\"name\":\"'The Mom Test'\",\"description\":\"User interviews\"},{\"name\":\"'Inspired'\",\"description\":\"Marty Cagan - Product discovery\"},{\"name\":\"'Cracking the PM Interview'\",\"description\":\"Gayle McDowell - Core frameworks\"},{\"name\":\"'Crossing the Chasm'\",\"description\":\"Geoffrey A. Moore - GTM strategy\"}]},{\"category\":\"Reading List - AI & Data\",\"items\":[{\"name\":\"Google's People + AI Guidebook\",\"description\":\"AI UX Principles\"},{\"name\":\"Mode's SQL Tutorial\",\"description\":\"Data analysis\"},{\"name\":\"Statsig/Optimizely blogs\",\"description\":\"A/B testing for AI\"},{\"name\":\"Google's Responsible AI Practices\",\"description\":\"Ethics & safety\"}]}],\"interviewBank\":[{\"category\":\"Product Sense\",\"weight\":\"30% of interviews\",\"framework\":\"CIRCLES\",\"notes\":\"AI-Specific: Value prop, Hallucination UX, Cold start, Quality measurement, Data privacy, Trust/latency UX\",\"questions\":[\"Design an AI product for elderly care\",\"How would you improve Google Docs with AI?\",\"Design an AI coding assistant for non-technical PMs\",\"Create an AI feature for Spotify\",\"Design a UI to build user trust with an AI that is 70% confident\"]},{\"category\":\"Customer Centricity & UX\",\"weight\":\"Part of Product Sense\",\"framework\":\"User Interview -> Synthesize -> Test (Usability)\",\"notes\":\"Focus on how you get from 0 to 1 on a user problem.\",\"questions\":[\"How would you decide *what* AI feature to build for LinkedIn?\",\"Walk me through your user research process for [Your Portfolio Project]\",\"A user complains your AI gave them bad advice. What do you do?\",\"How do you design for AI errors (hallucinations)?\"]},{\"category\":\"Technical & System Design\",\"weight\":\"20% of interviews\",\"notes\":\"Key Topics: Load balancing, Caching, Vector DBs, Model selection (hosted vs. self-hosted), Cost optimization, MLOps, A/B infra\",\"questions\":[\"Design a system for AI-powered email assistant serving 10M users\",\"How would you build a ChatGPT competitor?\",\"Design the backend for Grammarly's AI features\",\"Design a data pipeline for training a customer support AI\"]},{\"category\":\"Analytical & Execution\",\"weight\":\"20% of interviews\",\"framework\":\"RICE, OKRs, North Star. Key Metrics: Engagement, Quality (accuracy, hallucination rate), Efficiency (cost/query, latency), Business (conversion, LTV)\",\"questions\":[\"How would you prioritize features for a new AI product?\",\"Define success metrics for an AI writing assistant\",\"Your AI product has 40% retention. Root cause?\",\"You've launched a new AI model. Engagement is up, but retention is down. What do you do?\",\"Our LLM costs are 10x projections. What do you do?\"]},{\"category\":\"Behavioral & Stakeholder Mgmt\",\"weight\":\"20% of interviews\",\"framework\":\"STAR: Situation, Task, Action, Result\",\"notes\":\"AI PM-Specific: Explaining AI to non-technical stakeholders, Handling user trust, Ethical decisions\",\"questions\":[\"Tell me about a time you influenced engineering without authority\",\"Describe a situation where you had to make a decision with incomplete data\",\"Tell me about a product failure and what you learned\",\"Give an example of managing stakeholder conflict (e.g., Legal vs. Product)\",\"Walk me through your PRD for [Your Portfolio Project]. How did you get buy-in from Eng?\",\"How would you explain a complex AI concept (like RAG) to a marketing leader?\"]},{\"category\":\"Strategy & Business\",\"weight\":\"10% of interviews\",\"framework\":\"TAM/SAM/SOM, Porter's 5 Forces, SWOT\",\"questions\":[\"Should Google build a ChatGPT competitor? Why or why not?\",\"How big is the market for AI code assistants?\",\"What's your GTM strategy for [Your Portfolio Project]?\",\"How would you compete with ChatGPT in the enterprise market?\",\"How would you price an AI product (token vs. seat vs. value)?\"]}],\"demonstrationMoments\":[{\"category\":\"Portfolio Projects (Weeks 1-5)\",\"items\":[\"AI Product Assistant (Week 1)\",\"System Design Architecture (Week 2)\",\"RAG Knowledge Assistant (Week 3)\",\"Full-Stack AI Product (Week 5)\"]},{\"category\":\"Core PM Artifacts (Weeks 4-8)\",\"items\":[\"Product Strategy Document\",\"Product Requirements Doc (PRD)\",\"Responsible AI Brief\",\"User Interview Synthesis Report\",\"A/B Test Plan\",\"Analytics & Logging Plan\",\"GTM Strategy & Launch Plan\",\"5-Slide Leadership Deck\"]},{\"category\":\"Professional Presence (Week 9)\",\"items\":[\"Portfolio Website (v2.0)\",\"Optimized LinkedIn\",\"GitHub Profile\",\"Medium/LinkedIn Articles\"]},{\"category\":\"Interview Readiness (Weeks 10-14)\",\"items\":[\"STAR Stories Bank (20+ stories)\",\"Mock Interview Recordings (5+ mocks)\",\"Application Materials (Resume, CLs)\"]}],\"weeklyRituals\":{\"daily\":\"Morning: Review daily goals, check LinkedIn/AI news. Evening: Log progress, update task list, engage on LinkedIn\",\"weekly\":\"Sunday Planning: Review past week, plan next week, adjust roadmap. Friday Reflection: Write down learnings, update portfolio, schedule next week's shares\",\"biWeekly\":\"Portfolio Review: Get feedback from peers, iterate. Network Check-in: Reach out to 3-5 connections\"},\"redFlagsAndAdjustments\":[{\"checkpoint\":\"Week 4 Checkpoint\",\"items\":[\"Have you built 3 AI products/projects?\",\"Can you design a system for 1M users?\",\"Have you written your first PRD?\",\"Do you have 2+ public LinkedIn posts with engagement?\"],\"adjustment\":\"If No: Double down on building & PM artifacts, reduce research time\"},{\"checkpoint\":\"Week 9 Checkpoint\",\"items\":[\"Do you have a live portfolio website with all PM artifacts (PRD, GTM, etc.)?\",\"Have you completed your user research and data analysis plans?\",\"Can you explain your GTM strategy confidently?\"],\"adjustment\":\"If No: Delay interview prep week, spend Week 10 on portfolio/brand\"},{\"checkpoint\":\"Week 12 Checkpoint\",\"items\":[\"Have you completed 5+ mock interviews (all types)?\",\"Do you have 5+ referrals or strong connections?\",\"Is your STAR story bank complete?\"],\"adjustment\":\"If No: Extend mock interview/networking phase, delay application sprint\"}],\"competitiveAdvantages\":[{\"advantage\":\"Technical Credibility\",\"description\":\"2 years as engineer + Spring Boot → You can talk to engineers credibly\",\"leverage\":{\"inInterviews\":\"\\\"As a former engineer, I wrote the PRD for my project with clear user stories and technical acceptance criteria. This helps build trust and velocity with the eng team.\\\"\",\"inNetworking\":\"\\\"I'm building my AI PM expertise in public - here's my portfolio of 4 AI products I've shipped... but more importantly, here's the GTM deck and user research I did for them.\\\"\"}},{\"advantage\":\"PM Experience\",\"description\":\"4 years as PM → You understand product lifecycle, stakeholder management\",\"leverage\":{}},{\"advantage\":\"Learning Agility\",\"description\":\"Exploratory style → You can learn AI/ML faster than pure business PMs\",\"leverage\":{}},{\"advantage\":\"Builder Mentality\",\"description\":\"You ship → Portfolio will demonstrate real capability, not just theory\",\"leverage\":{\"inInterviews\":\"\\\"Here's the GTM deck I built for my flagship product. Let me walk you through my analysis.\\\"\"}},{\"advantage\":\"Public Learning\",\"description\":\"Share journey → Builds brand while you learn\",\"leverage\":{\"inNetworking\":\"Share your learning journey on LinkedIn → Shows growth mindset\",\"inApplications\":\"Showcase portfolio prominently\"}}],\"finalMotivation\":\"You have 14 weeks. That's ~300-350 hours of focused work. This is the 'no-shortcut' plan. It's designed to not just make you *look* like a top AI PM in an interview, but to give you the portfolio and deep-seated skills to *be* one from day one. By February 2026, you will have a portfolio that few can match, demonstrating end-to-end execution from technical build to user research to GTM strategy. This is achievable. This is YOUR roadmap. Let's execute. 🚀\",\"nextSteps\":[\"Today: Review this 14-week roadmap. This is a significant commitment.\",\"This Week: Start Week 1, build your first product AND your first 1-pager.\",\"Every Sunday: Review progress, adjust if needed\",\"February 23, 2026: Celebrate your new AI PM role\"]}}"));}),
"[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateProgress",
    ()=>calculateProgress,
    "generateItemId",
    ()=>generateItemId,
    "parseItemId",
    ()=>parseItemId
]);
function generateItemId(weekNumber, type, index, section, parentIndex) {
    if (type === 'subtask' && parentIndex !== undefined) {
        return `w${weekNumber}-t${parentIndex}-s${index}`;
    }
    if (type === 'resource') {
        // section can be used for topic ID or general section
        const sectionSuffix = section ? `-${section}` : '';
        return `w${weekNumber}-r${index}${sectionSuffix}`;
    }
    const prefix = type === 'deliverable' ? 'd' : 't';
    const sectionSuffix = section ? `-${section}` : '';
    return `w${weekNumber}-${prefix}${index}${sectionSuffix}`;
}
function parseItemId(itemId) {
    // Format: w1-d1-build, w1-t1, w1-t1-s1
    const parts = itemId.split('-');
    const weekNumber = parseInt(parts[0].substring(1));
    if (parts.length >= 3 && parts[1].startsWith('t') && parts[2].startsWith('s')) {
        // Subtask: w1-t1-s1
        const parentIndex = parseInt(parts[1].substring(1));
        const index = parseInt(parts[2].substring(1));
        return {
            weekNumber,
            type: 'subtask',
            index,
            parentIndex
        };
    }
    // Resource: w1-r0-topic-0 or w1-r0-research
    if (parts[1].startsWith('r')) {
        const index = parseInt(parts[1].substring(1));
        const sectionPart = parts.slice(2).join('-'); // topic-0 or research
        let topicIndex;
        if (sectionPart.startsWith('topic-')) {
            topicIndex = parseInt(sectionPart.split('-')[1]);
        }
        return {
            weekNumber,
            type: 'resource',
            index,
            section: sectionPart,
            topicIndex
        };
    }
    const typeChar = parts[1].charAt(0);
    const index = parseInt(parts[1].substring(1));
    const type = typeChar === 'd' ? 'deliverable' : 'topic';
    let section;
    if (parts.length > 2 && !parts[2].startsWith('s')) {
        section = parts[2];
    }
    return {
        weekNumber,
        type,
        index,
        section
    };
}
function calculateProgress(total, completed) {
    if (total === 0) return 0;
    return Math.round(completed / total * 100);
}
}),
"[project]/components/viewer/actions/RemoveButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RemoveButton",
    ()=>RemoveButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
'use client';
;
;
;
function RemoveButton({ onRemove, itemName, disabled = false, className = "", iconSize = 14 }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dialogRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isOpen
    ]);
    const handleConfirm = (e)=>{
        e.stopPropagation();
        onRemove();
        setIsOpen(false);
    };
    const handleCancel = (e)=>{
        e.stopPropagation();
        setIsOpen(false);
    };
    const handleTrigger = (e)=>{
        e.stopPropagation();
        if (!disabled) {
            setIsOpen(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleTrigger,
                disabled: disabled,
                className: `p-1 text-text-tertiary hover:text-red-600 rounded-sm hover:bg-red-50 transition-colors ${className}`,
                title: `Remove ${itemName}`,
                "aria-label": `Remove ${itemName}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                    size: iconSize
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-full mt-2 z-50 min-w-[280px] bg-surface rounded-md shadow-lg border border-border p-[var(--space-4)] animate-in fade-in zoom-in-95 duration-200 origin-top-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: dialogRef,
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 bg-red-100 rounded-full shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-4 h-4 text-red-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                        lineNumber: 75,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 74,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-semibold text-text-primary",
                                            children: "Remove Item?"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                            lineNumber: 78,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-text-secondary mt-1",
                                            children: [
                                                "Are you sure you want to remove this ",
                                                itemName,
                                                "? This action cannot be undone."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                            lineNumber: 81,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 77,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                            lineNumber: 73,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-2 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCancel,
                                    className: "px-3 py-1.5 text-xs font-medium text-text-secondary bg-transparent hover:bg-bg-secondary rounded-sm transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 88,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConfirm,
                                    className: "px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-sm transition-colors flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                            lineNumber: 98,
                                            columnNumber: 33
                                        }, this),
                                        "Remove"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                                    lineNumber: 94,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                            lineNumber: 87,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                    lineNumber: 72,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
                lineNumber: 71,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/actions/RemoveButton.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, this);
}
}),
"[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectionProvider",
    ()=>SelectionProvider,
    "useSelection",
    ()=>useSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const SelectionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function SelectionProvider({ children }) {
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [isSelectionMode, setIsSelectionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setSelectedIds((prev)=>{
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSelectedIds(new Set());
        setIsSelectionMode(false);
    }, []);
    const selectAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ids)=>{
        setSelectedIds(new Set(ids));
    }, []);
    const isSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        return selectedIds.has(id);
    }, [
        selectedIds
    ]);
    const toggleSelectionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsSelectionMode((prev)=>{
            if (prev) {
                // Exiting selection mode, clear selection
                setSelectedIds(new Set());
            }
            return !prev;
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectionContext.Provider, {
        value: {
            selectedIds,
            toggleSelection,
            clearSelection,
            selectAll,
            isSelected,
            hasSelection: selectedIds.size > 0,
            selectionCount: selectedIds.size,
            isSelectionMode: isSelectionMode || selectedIds.size > 0,
            toggleSelectionMode
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/SelectionContext.tsx",
        lineNumber: 59,
        columnNumber: 9
    }, this);
}
function useSelection() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SelectionContext);
    if (context === undefined) {
        throw new Error('useSelection must be used within a SelectionProvider');
    }
    return context;
}
}),
"[project]/lib/notes/note-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utility functions for note operations
 */ __turbopack_context__.s([
    "exceedsMaxLength",
    ()=>exceedsMaxLength,
    "formatTimestamp",
    ()=>formatTimestamp,
    "getCharacterCount",
    ()=>getCharacterCount,
    "isNoteEmpty",
    ()=>isNoteEmpty,
    "sanitizeMarkdown",
    ()=>sanitizeMarkdown,
    "truncateNote",
    ()=>truncateNote
]);
function formatTimestamp(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}
function truncateNote(content, maxLength = 100) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
}
function sanitizeMarkdown(content) {
    // Remove script tags and event handlers
    let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    return sanitized;
}
function isNoteEmpty(content) {
    return !content || content.trim().length === 0;
}
function getCharacterCount(content) {
    return content.length;
}
function exceedsMaxLength(content, maxLength) {
    return content.length > maxLength;
}
}),
"[project]/components/viewer/notes/NoteIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteIcon",
    ()=>NoteIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notes/note-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function NoteIcon({ content, onClick, className = '' }) {
    const hasNote = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNoteEmpty"])(content);
    if (!hasNote && !onClick) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClick,
                className: `p-1 rounded transition-colors ${hasNote ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20' : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} ${className}`,
                title: hasNote ? 'View note' : 'Add note',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            hasNote && content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-full mt-1 hidden group-hover:block z-10 w-64 p-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded shadow-lg",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncateNote"])(content, 150)
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
                lineNumber: 34,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/notes/NoteIcon.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/notes/NoteEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteEditor",
    ()=>NoteEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notes/note-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NoteEditor({ entityType, entityId, initialContent = '', onSave, onCancel, placeholder = 'Add your notes here... (Markdown supported)', maxLength = 2000, autoFocus = false }) {
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialContent);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastSaved, setLastSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasChanges, setHasChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const autoSaveTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const characterCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCharacterCount"])(content);
    const isOverLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exceedsMaxLength"])(content, maxLength);
    // Auto-focus if requested
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (autoFocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [
        autoFocus
    ]);
    // Auto-save logic
    const performSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!hasChanges || isSaving || isOverLimit) return;
        setIsSaving(true);
        try {
            await onSave(content);
            setLastSaved(new Date().toISOString());
            setHasChanges(false);
        } catch (error) {
            console.error('Failed to save note:', error);
        } finally{
            setIsSaving(false);
        }
    }, [
        content,
        hasChanges,
        isSaving,
        isOverLimit,
        onSave
    ]);
    // Set up auto-save timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hasChanges && !isSaving) {
            // Clear existing timer
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
            // Set new timer for 3 seconds
            autoSaveTimerRef.current = setTimeout(()=>{
                performSave();
            }, 3000);
        }
        return ()=>{
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [
        hasChanges,
        isSaving,
        performSave
    ]);
    const handleContentChange = (e)=>{
        setContent(e.target.value);
        setHasChanges(true);
    };
    const handleManualSave = async ()=>{
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }
        await performSave();
    };
    const handleCancel = ()=>{
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }
        setContent(initialContent);
        setHasChanges(false);
        onCancel?.();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Note"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 110,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500",
                        children: [
                            lastSaved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 115,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Saved ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notes$2f$note$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTimestamp"])(lastSaved)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 116,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 114,
                                columnNumber: 25
                            }, this),
                            isSaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-blue-600 dark:text-blue-400",
                                children: "Saving..."
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 119,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                ref: textareaRef,
                value: content,
                onChange: handleContentChange,
                placeholder: placeholder,
                className: "w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y",
                maxLength: maxLength
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 124,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500 dark:text-gray-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: isOverLimit ? 'text-red-600 dark:text-red-400 font-medium' : '',
                                children: [
                                    characterCount,
                                    " / ",
                                    maxLength
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 136,
                                columnNumber: 21
                            }, this),
                            isOverLimit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 text-red-600 dark:text-red-400",
                                children: "Character limit exceeded"
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 139,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 135,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCancel,
                                className: "px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4 inline mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 148,
                                        columnNumber: 29
                                    }, this),
                                    "Cancel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleManualSave,
                                disabled: !hasChanges || isSaving || isOverLimit,
                                className: "px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                        lineNumber: 157,
                                        columnNumber: 25
                                    }, this),
                                    isSaving ? 'Saving...' : 'Save'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                                lineNumber: 152,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                        lineNumber: 142,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-xs text-gray-400 dark:text-gray-600",
                children: "Supports Markdown: **bold**, *italic*, [links](url), lists, etc."
            }, void 0, false, {
                fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
                lineNumber: 164,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/notes/NoteEditor.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
}),
"[project]/hooks/useNotes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook for managing notes on roadmap entities
 */ __turbopack_context__.s([
    "useNotes",
    ()=>useNotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/RoadmapContext.tsx [app-ssr] (ecmascript)");
;
;
function useNotes(options) {
    const { roadmap, setRoadmapDirect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmap"])();
    const { entityType, weekNumber, section, topicIndex, deliverableIndex, resourceIndex } = options;
    // Get current note content
    const getCurrentNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!roadmap || weekNumber === undefined) return undefined;
        const phase = roadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
        if (!phase) return undefined;
        const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
        if (!week) return undefined;
        switch(entityType){
            case 'week':
                return week.notes;
            case 'deliverable':
                if (deliverableIndex === undefined || !section) return undefined;
                let deliverables;
                if (section === 'build') deliverables = week.buildSection?.deliverables;
                else if (section === 'research') deliverables = week.researchSection?.deliverables;
                else if (section === 'share') deliverables = week.shareSection?.deliverables;
                return deliverables?.[deliverableIndex]?.notes;
            case 'topic':
                if (topicIndex === undefined) return undefined;
                return week.researchSection?.deepDiveTopics?.[topicIndex]?.notes;
            case 'resource':
                if (resourceIndex === undefined || topicIndex === undefined) return undefined;
                return week.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources?.[resourceIndex]?.notes;
            default:
                return undefined;
        }
    }, [
        roadmap,
        weekNumber,
        entityType,
        section,
        topicIndex,
        deliverableIndex,
        resourceIndex
    ]);
    // Save note
    const saveNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (content)=>{
        if (!roadmap || weekNumber === undefined) {
            throw new Error('No roadmap loaded or invalid week number');
        }
        const updatedRoadmap = {
            ...roadmap
        };
        const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
        if (!phase) throw new Error('Phase not found');
        const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
        if (!week) throw new Error('Week not found');
        const timestamp = new Date().toISOString();
        switch(entityType){
            case 'week':
                week.notes = content;
                break;
            case 'deliverable':
                if (deliverableIndex === undefined || !section) throw new Error('Invalid deliverable reference');
                let deliverables;
                if (section === 'build') deliverables = week.buildSection?.deliverables;
                else if (section === 'research') deliverables = week.researchSection?.deliverables;
                else if (section === 'share') deliverables = week.shareSection?.deliverables;
                if (deliverables && deliverables[deliverableIndex]) {
                    deliverables[deliverableIndex].notes = content;
                }
                break;
            case 'topic':
                if (topicIndex === undefined) throw new Error('Invalid topic reference');
                const topic = week.researchSection?.deepDiveTopics?.[topicIndex];
                if (topic) {
                    topic.notes = content;
                }
                break;
            case 'resource':
                if (resourceIndex === undefined || topicIndex === undefined) throw new Error('Invalid resource reference');
                const resource = week.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources?.[resourceIndex];
                if (resource) {
                    resource.notes = content;
                }
                break;
        }
        setRoadmapDirect(updatedRoadmap);
    // TODO: Call API to persist changes
    // await fetch(`/api/notes`, {
    //   method: 'POST',
    //   body: JSON.stringify({ entityType, entityId, content, timestamp })
    // });
    }, [
        roadmap,
        weekNumber,
        entityType,
        section,
        topicIndex,
        deliverableIndex,
        resourceIndex,
        setRoadmapDirect
    ]);
    const currentNote = getCurrentNote();
    return {
        note: currentNote,
        saveNote
    };
}
}),
"[project]/components/viewer/editable/EditableDeliverable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableDeliverable",
    ()=>EditableDeliverable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$RemoveButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/actions/RemoveButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/notes/NoteEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useNotes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function EditableDeliverable({ deliverable, weekNumber, index, section, roadmapId, isCompleted, onToggle, onSave, onRemove }) {
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNoteOpen, setIsNoteOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(deliverable.description);
    const itemId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', index, section);
    const { note, saveNote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotes"])({
        entityType: 'deliverable',
        entityId: itemId,
        weekNumber,
        section,
        deliverableIndex: index
    });
    const { isSelected, toggleSelection, isSelectionMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelection"])();
    const selected = isSelected(itemId);
    const showSelectionCheckbox = isSelectionMode; // Only show when in selection mode
    const handleSave = ()=>{
        if (onSave) {
            onSave(itemId, description);
        }
        setIsEditing(false);
    };
    const handleCancel = ()=>{
        setDescription(deliverable.description);
        setIsEditing(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group flex items-start gap-3 p-2 rounded-lg transition-colors ${selected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`,
        children: [
            showSelectionCheckbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 flex items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: selected,
                    onChange: ()=>toggleSelection(itemId),
                    className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                    lineNumber: 71,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                lineNumber: 70,
                columnNumber: 17
            }, this),
            !showSelectionCheckbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: isCompleted,
                    onChange: (e)=>onToggle(itemId, e.target.checked),
                    className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                    lineNumber: 83,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                lineNumber: 82,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: description,
                                onChange: (e)=>setDescription(e.target.value),
                                className: "w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700",
                                rows: 2,
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 95,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSave,
                                        className: "flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                                lineNumber: 107,
                                                columnNumber: 33
                                            }, this),
                                            " Save"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 103,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCancel,
                                        className: "flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                                lineNumber: 113,
                                                columnNumber: 33
                                            }, this),
                                            " Cancel"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 109,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 102,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                        lineNumber: 94,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group/text pr-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`,
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 119,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-0 flex items-center gap-1 transition-opacity bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded px-1 opacity-100 md:opacity-0 md:group-hover/text:opacity-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsEditing(true),
                                        className: "p-1 text-gray-400 hover:text-blue-600 transition-colors",
                                        title: "Edit deliverable",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                            lineNumber: 129,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 124,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteIcon"], {
                                        content: note,
                                        onClick: ()=>setIsNoteOpen(!isNoteOpen),
                                        className: "p-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 131,
                                        columnNumber: 29
                                    }, this),
                                    onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$RemoveButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveButton"], {
                                        onRemove: ()=>onRemove(itemId),
                                        itemName: "deliverable",
                                        iconSize: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                        lineNumber: 137,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                                lineNumber: 123,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                        lineNumber: 118,
                        columnNumber: 21
                    }, this),
                    isNoteOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$notes$2f$NoteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoteEditor"], {
                            entityType: "deliverable",
                            entityId: itemId,
                            initialContent: note,
                            onSave: async (content)=>{
                                await saveNote(content);
                                setIsNoteOpen(false);
                            },
                            onCancel: ()=>setIsNoteOpen(false),
                            autoFocus: true,
                            placeholder: "Add notes for this deliverable..."
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                            lineNumber: 150,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                        lineNumber: 149,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
                lineNumber: 92,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/editable/EditableDeliverable.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/viewer/dnd/DraggableDeliverable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DraggableDeliverable",
    ()=>DraggableDeliverable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-ssr] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/editable/EditableDeliverable.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function DraggableDeliverable({ id, deliverable, weekNumber, index, section, roadmapId, isCompleted, onToggle, onSave, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSortable"])({
        id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        className: "flex items-start gap-2 group/drag",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ...attributes,
                ...listeners,
                className: "mt-3 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 opacity-0 group-hover/drag:opacity-100 transition-opacity",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                    lineNumber: 56,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$editable$2f$EditableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditableDeliverable"], {
                    deliverable: deliverable,
                    weekNumber: weekNumber,
                    index: index,
                    section: section,
                    roadmapId: roadmapId,
                    isCompleted: isCompleted,
                    onToggle: onToggle,
                    onSave: onSave,
                    onRemove: onRemove
                }, void 0, false, {
                    fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/dnd/DraggableDeliverable.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
}),
"[project]/lib/validation/guardrails.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Guardrails System
 *
 * Three-tier guardrail system for roadmap editing:
 * - Tier 1: Structural (cannot override - hard constraints)
 * - Tier 2: Content (can edit with validation)
 * - Tier 3: Quality (warnings only, not blockers)
 */ __turbopack_context__.s([
    "DEFAULT_CONTENT_GUARDRAILS",
    ()=>DEFAULT_CONTENT_GUARDRAILS,
    "DEFAULT_QUALITY_GUARDRAILS",
    ()=>DEFAULT_QUALITY_GUARDRAILS,
    "DEFAULT_STRUCTURAL_GUARDRAILS",
    ()=>DEFAULT_STRUCTURAL_GUARDRAILS,
    "extractStructuralGuardrails",
    ()=>extractStructuralGuardrails,
    "generateQualityWarnings",
    ()=>generateQualityWarnings,
    "validateContentConstraints",
    ()=>validateContentConstraints,
    "validateStructuralConstraints",
    ()=>validateStructuralConstraints
]);
const DEFAULT_STRUCTURAL_GUARDRAILS = {
    totalDurationWeeks: 0,
    phaseCount: 0,
    weekNumbers: [],
    phaseWeekDistribution: {
        min: 2,
        max: 8
    },
    hoursPerWeek: {
        min: 5,
        max: 40
    }
};
function extractStructuralGuardrails(roadmap) {
    const weekNumbers = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            weekNumbers.push(week.weekNumber);
        });
    });
    return {
        totalDurationWeeks: roadmap.totalDurationWeeks || 0,
        phaseCount: roadmap.phases?.length || 0,
        weekNumbers,
        phaseWeekDistribution: DEFAULT_STRUCTURAL_GUARDRAILS.phaseWeekDistribution,
        hoursPerWeek: DEFAULT_STRUCTURAL_GUARDRAILS.hoursPerWeek
    };
}
const DEFAULT_CONTENT_GUARDRAILS = {
    deliverables: {
        minPerWeek: 1,
        maxPerWeek: 10,
        requiredFields: [
            'description'
        ],
        maxDescriptionLength: 500
    },
    resources: {
        minPerTopic: 0,
        maxPerTopic: 20,
        urlValidation: true,
        requiredFields: [
            'title',
            'type'
        ]
    },
    notes: {
        maxLength: 5000,
        allowMarkdown: true
    },
    timeAllocation: {
        buildPercentage: {
            min: 40,
            max: 80
        },
        researchPercentage: {
            min: 10,
            max: 40
        },
        sharePercentage: {
            min: 5,
            max: 25
        }
    },
    weekFields: {
        titleMaxLength: 100,
        themeMaxLength: 100,
        descriptionMaxLength: 1000
    }
};
const DEFAULT_QUALITY_GUARDRAILS = {
    warnings: {
        noResources: 'Week has no resources - consider adding some',
        fewDeliverables: 'Only 1 deliverable - consider adding 2-3 more for better granularity',
        vagueTitles: 'Title is too generic - be more specific about what you\'ll build',
        noSubtasks: 'Topic has no subtasks - consider breaking it down into smaller steps',
        skippedWeeks: 'You have skipped 3+ weeks - is this intentional?',
        lowResourceQuality: 'Some resources are missing URLs or descriptions',
        missingUrls: 'Resource is missing a URL - add a link for easy access'
    },
    suggestions: {
        aiEnhancement: true,
        resourceRecommendations: true,
        deliverableSuggestions: true
    }
};
function validateStructuralConstraints(roadmap, guardrails) {
    const errors = [];
    // Check total duration hasn't changed
    if (roadmap.totalDurationWeeks !== guardrails.totalDurationWeeks) {
        errors.push({
            code: 'DURATION_CHANGED',
            severity: 'error',
            message: `Total duration cannot be changed. Expected ${guardrails.totalDurationWeeks} weeks.`,
            field: 'totalDurationWeeks'
        });
    }
    // Check phase count hasn't changed
    if (roadmap.phases?.length !== guardrails.phaseCount) {
        errors.push({
            code: 'PHASE_COUNT_CHANGED',
            severity: 'error',
            message: `Phase count cannot be changed. Expected ${guardrails.phaseCount} phases.`,
            field: 'phases'
        });
    }
    // Check week numbers are intact
    const currentWeekNumbers = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            currentWeekNumbers.push(week.weekNumber);
        });
    });
    const missingWeeks = guardrails.weekNumbers.filter((n)=>!currentWeekNumbers.includes(n));
    if (missingWeeks.length > 0) {
        errors.push({
            code: 'WEEKS_MISSING',
            severity: 'error',
            message: `Weeks cannot be deleted: ${missingWeeks.join(', ')}`,
            field: 'weeks'
        });
    }
    // Validate hours per week
    roadmap.phases?.forEach((phase, phaseIndex)=>{
        phase.weeks?.forEach((week, weekIndex)=>{
            if (week.totalHours < guardrails.hoursPerWeek.min) {
                errors.push({
                    code: 'HOURS_TOO_LOW',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${week.totalHours} hours. Minimum is ${guardrails.hoursPerWeek.min}.`,
                    field: 'totalHours',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            if (week.totalHours > guardrails.hoursPerWeek.max) {
                errors.push({
                    code: 'HOURS_TOO_HIGH',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${week.totalHours} hours. Maximum is ${guardrails.hoursPerWeek.max}.`,
                    field: 'totalHours',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
        });
    });
    return errors;
}
function validateContentConstraints(roadmap, guardrails) {
    const errors = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            // Validate deliverables
            const deliverableCount = week.buildSection?.deliverables?.length || 0;
            if (deliverableCount < guardrails.deliverables.minPerWeek) {
                errors.push({
                    code: 'TOO_FEW_DELIVERABLES',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${deliverableCount} deliverable(s). Minimum is ${guardrails.deliverables.minPerWeek}.`,
                    field: 'deliverables',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            if (deliverableCount > guardrails.deliverables.maxPerWeek) {
                errors.push({
                    code: 'TOO_MANY_DELIVERABLES',
                    severity: 'error',
                    message: `Week ${week.weekNumber} has ${deliverableCount} deliverables. Maximum is ${guardrails.deliverables.maxPerWeek}.`,
                    field: 'deliverables',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Validate each deliverable
            week.buildSection?.deliverables?.forEach((deliverable, index)=>{
                if (!deliverable.description || deliverable.description.trim() === '') {
                    errors.push({
                        code: 'DELIVERABLE_NO_DESCRIPTION',
                        severity: 'error',
                        message: `Deliverable ${index + 1} in Week ${week.weekNumber} has no description.`,
                        field: 'deliverables.description',
                        location: {
                            phaseNumber: phase.phaseNumber,
                            weekNumber: week.weekNumber,
                            deliverableIndex: index
                        }
                    });
                }
                if (deliverable.description?.length > guardrails.deliverables.maxDescriptionLength) {
                    errors.push({
                        code: 'DELIVERABLE_DESCRIPTION_TOO_LONG',
                        severity: 'error',
                        message: `Deliverable description in Week ${week.weekNumber} is too long. Maximum is ${guardrails.deliverables.maxDescriptionLength} characters.`,
                        field: 'deliverables.description',
                        location: {
                            phaseNumber: phase.phaseNumber,
                            weekNumber: week.weekNumber,
                            deliverableIndex: index
                        }
                    });
                }
            });
            // Validate resources
            week.researchSection?.deepDiveTopics?.forEach((topic, topicIndex)=>{
                const resourceCount = topic.suggestedResources?.length || 0;
                if (resourceCount > guardrails.resources.maxPerTopic) {
                    errors.push({
                        code: 'TOO_MANY_RESOURCES',
                        severity: 'error',
                        message: `Topic ${topicIndex + 1} in Week ${week.weekNumber} has ${resourceCount} resources. Maximum is ${guardrails.resources.maxPerTopic}.`,
                        field: 'resources',
                        location: {
                            phaseNumber: phase.phaseNumber,
                            weekNumber: week.weekNumber,
                            topicIndex
                        }
                    });
                }
                // Validate each resource
                topic.suggestedResources?.forEach((resource, resourceIndex)=>{
                    if (!resource.title || resource.title.trim() === '') {
                        errors.push({
                            code: 'RESOURCE_NO_TITLE',
                            severity: 'error',
                            message: `Resource ${resourceIndex + 1} in Week ${week.weekNumber} has no title.`,
                            field: 'resources.title',
                            location: {
                                phaseNumber: phase.phaseNumber,
                                weekNumber: week.weekNumber,
                                topicIndex,
                                resourceIndex
                            }
                        });
                    }
                    if (guardrails.resources.urlValidation && resource.url) {
                        if (!isValidUrl(resource.url)) {
                            errors.push({
                                code: 'RESOURCE_INVALID_URL',
                                severity: 'error',
                                message: `Resource "${resource.title}" has an invalid URL.`,
                                field: 'resources.url',
                                location: {
                                    phaseNumber: phase.phaseNumber,
                                    weekNumber: week.weekNumber,
                                    topicIndex,
                                    resourceIndex
                                },
                                suggestion: 'Ensure URL starts with http:// or https://'
                            });
                        }
                    }
                });
            });
            // Validate week fields
            if (week.title && week.title.length > guardrails.weekFields.titleMaxLength) {
                errors.push({
                    code: 'WEEK_TITLE_TOO_LONG',
                    severity: 'error',
                    message: `Week ${week.weekNumber} title is too long. Maximum is ${guardrails.weekFields.titleMaxLength} characters.`,
                    field: 'title',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
        });
    });
    return errors;
}
function generateQualityWarnings(roadmap, guardrails) {
    const warnings = [];
    roadmap.phases?.forEach((phase)=>{
        phase.weeks?.forEach((week)=>{
            // Check for no resources
            const hasResources = week.researchSection?.deepDiveTopics?.some((topic)=>topic.suggestedResources && topic.suggestedResources.length > 0);
            if (!hasResources) {
                warnings.push({
                    code: 'NO_RESOURCES',
                    severity: 'warning',
                    message: guardrails.warnings.noResources,
                    suggestion: guardrails.suggestions.resourceRecommendations ? 'Use AI to suggest resources for this week' : undefined,
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Check for few deliverables
            const deliverableCount = week.buildSection?.deliverables?.length || 0;
            if (deliverableCount === 1) {
                warnings.push({
                    code: 'FEW_DELIVERABLES',
                    severity: 'info',
                    message: guardrails.warnings.fewDeliverables,
                    suggestion: guardrails.suggestions.deliverableSuggestions ? 'Use AI to suggest more deliverables' : undefined,
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Check for vague titles
            if (week.title && isVagueTitle(week.title)) {
                warnings.push({
                    code: 'VAGUE_TITLE',
                    severity: 'info',
                    message: guardrails.warnings.vagueTitles,
                    suggestion: 'Be specific about technologies and outcomes',
                    location: {
                        phaseNumber: phase.phaseNumber,
                        weekNumber: week.weekNumber
                    }
                });
            }
            // Check for missing URLs
            week.researchSection?.deepDiveTopics?.forEach((topic)=>{
                topic.suggestedResources?.forEach((resource)=>{
                    if (!resource.url || resource.url.trim() === '') {
                        warnings.push({
                            code: 'MISSING_URL',
                            severity: 'warning',
                            message: `"${resource.title}": ${guardrails.warnings.missingUrls}`,
                            location: {
                                phaseNumber: phase.phaseNumber,
                                weekNumber: week.weekNumber
                            }
                        });
                    }
                });
            });
        });
    });
    return warnings;
}
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Validates if a string is a valid URL
 */ function isValidUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch  {
        return false;
    }
}
/**
 * Checks if a title is too vague
 */ function isVagueTitle(title) {
    const vagueWords = [
        'learn',
        'study',
        'basics',
        'introduction',
        'overview',
        'fundamentals',
        'getting started'
    ];
    const lowerTitle = title.toLowerCase();
    return vagueWords.some((word)=>lowerTitle.includes(word)) && title.split(' ').length < 5;
}
}),
"[project]/components/viewer/actions/AddDeliverableButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddDeliverableButton",
    ()=>AddDeliverableButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$guardrails$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/guardrails.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function AddDeliverableButton({ weekNumber, section, currentCount, onAdd }) {
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [warnings, setWarnings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const maxDeliverables = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$guardrails$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CONTENT_GUARDRAILS"].deliverables.maxPerWeek;
    const canAdd = currentCount < maxDeliverables;
    const handleAdd = ()=>{
        setIsAdding(true);
        setDescription('');
        setErrors([]);
        setWarnings([]);
    };
    const handleCancel = ()=>{
        setIsAdding(false);
        setDescription('');
        setErrors([]);
        setWarnings([]);
    };
    const handleSave = async ()=>{
        // Validate description
        const errors = [];
        const warnings = [];
        if (!description || description.trim() === '') {
            errors.push('Deliverable description is required.');
        } else if (description.length < 10) {
            warnings.push('Description is very short. Consider being more specific about what needs to be delivered.');
        }
        // Check for vague terms
        const vagueTerms = [
            'complete',
            'finish',
            'do',
            'work on',
            'project'
        ];
        const lowerDesc = description.toLowerCase();
        const hasVagueTerm = vagueTerms.some((term)=>lowerDesc.includes(term) && lowerDesc.split(' ').length < 5);
        if (hasVagueTerm) {
            warnings.push('Description seems vague. Be specific about what will be delivered (e.g., "Deploy to Vercel with public URL").');
        }
        if (errors.length > 0) {
            setErrors(errors);
            setWarnings(warnings);
            return;
        }
        setWarnings(warnings);
        try {
            setIsSubmitting(true);
            await onAdd(description);
            setIsAdding(false);
            setDescription('');
            setErrors([]);
            setWarnings([]);
        } catch (error) {
            setErrors([
                'Failed to add deliverable. Please try again.'
            ]);
        } finally{
            setIsSubmitting(false);
        }
    };
    if (!canAdd) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-gray-500 dark:text-gray-400 italic",
            children: [
                "Maximum ",
                maxDeliverables,
                " deliverables reached"
            ]
        }, void 0, true, {
            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
            lineNumber: 89,
            columnNumber: 13
        }, this);
    }
    if (isAdding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-[var(--space-3)] border-2 border-dashed border-primary/30 rounded-md bg-primary/5 space-y-[var(--space-3)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-xs font-medium text-text-secondary mb-1",
                            children: "New Deliverable"
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 99,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: description,
                            onChange: (e)=>setDescription(e.target.value),
                            placeholder: "e.g., Deploy working prototype to Vercel with public URL",
                            className: `w-full p-[var(--space-2)] text-sm border border-border rounded-sm focus:outline-none focus:border-primary bg-surface text-text-primary ${errors.length > 0 ? 'border-red-500' : ''}`,
                            rows: 2,
                            autoFocus: true,
                            disabled: isSubmitting
                        }, void 0, false, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 102,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 98,
                    columnNumber: 17
                }, this),
                errors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: errors.map((error, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-red-600",
                            children: [
                                "❌ ",
                                error
                            ]
                        }, idx, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 118,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 116,
                    columnNumber: 21
                }, this),
                warnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: warnings.map((warning, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-yellow-600",
                            children: [
                                "⚠️ ",
                                warning
                            ]
                        }, idx, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 129,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 127,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            disabled: isSubmitting || !description.trim(),
                            className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                                    lineNumber: 142,
                                    columnNumber: 25
                                }, this),
                                isSubmitting ? 'Adding...' : 'Add'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 137,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCancel,
                            disabled: isSubmitting,
                            className: "flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary bg-transparent rounded-sm hover:bg-bg-secondary hover:text-text-primary disabled:opacity-50 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                                    lineNumber: 150,
                                    columnNumber: 25
                                }, this),
                                "Cancel"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                    lineNumber: 136,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
            lineNumber: 97,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleAdd,
        className: "flex items-center gap-1.5 text-xs font-medium text-text-tertiary hover:text-primary transition-colors py-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
                lineNumber: 163,
                columnNumber: 13
            }, this),
            "Add deliverable"
        ]
    }, void 0, true, {
        fileName: "[project]/components/viewer/actions/AddDeliverableButton.tsx",
        lineNumber: 159,
        columnNumber: 9
    }, this);
}
}),
"[project]/hooks/useRoadmapMutations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hook for managing roadmap mutations (add/remove/update)
 * Handles optimistic updates and validation
 */ __turbopack_context__.s([
    "useRoadmapMutations",
    ()=>useRoadmapMutations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/RoadmapContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
;
;
;
function useRoadmapMutations() {
    const { roadmap, setRoadmapDirect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$RoadmapContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmap"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const apiClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApiClient"])();
    const persistRoadmap = async (updatedRoadmap)=>{
        try {
            await apiClient.patch(`/api/roadmaps/${updatedRoadmap.id}`, {
                current_roadmap: updatedRoadmap
            });
        } catch (err) {
            console.error('Failed to persist roadmap:', err);
            throw err;
        }
    };
    const persistProgress = async (roadmapId, weekNumber, sectionType, deliverablePath, isCompleted, userNote, effectivenessRating)=>{
        try {
            // We use the phase number from the roadmap structure if available, otherwise default to 1
            // In a real app, we'd look this up properly
            const phaseNumber = 1;
            await apiClient.post(`/api/roadmaps/${roadmapId}/progress`, {
                phase_number: phaseNumber,
                week_number: weekNumber,
                section_type: sectionType,
                deliverable_path: deliverablePath,
                is_completed: isCompleted,
                user_note: userNote,
                effectiveness_rating: effectivenessRating
            });
        } catch (err) {
            console.error('Failed to persist progress:', err);
        // We don't throw here to avoid blocking the UI if the granular update fails
        // The JSON blob update (persistRoadmap) is the source of truth for the UI
        }
    };
    /**
     * Add a deliverable to a week section
     */ const addDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, description, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        const newDeliverable = {
            description,
            isCompleted: false
        };
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    if (section === 'build' && week.buildSection) {
                        week.buildSection.deliverables = [
                            ...week.buildSection.deliverables || [],
                            newDeliverable
                        ];
                    } else if (section === 'research' && week.researchSection) {
                        week.researchSection.deliverables = [
                            ...week.researchSection.deliverables || [],
                            newDeliverable
                        ];
                    } else if (section === 'share' && week.shareSection) {
                        week.shareSection.deliverables = [
                            ...week.shareSection.deliverables || [],
                            newDeliverable
                        ];
                    }
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            // Rollback optimistic update on error
            // In a real implementation, we'd restore from a saved state
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Remove a deliverable from a week section
     */ const removeDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, index, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    if (section === 'build' && week.buildSection?.deliverables) {
                        week.buildSection.deliverables = week.buildSection.deliverables.filter((_, i)=>i !== index);
                    } else if (section === 'research' && week.researchSection?.deliverables) {
                        week.researchSection.deliverables = week.researchSection.deliverables.filter((_, i)=>i !== index);
                    } else if (section === 'share' && week.shareSection?.deliverables) {
                        week.shareSection.deliverables = week.shareSection.deliverables.filter((_, i)=>i !== index);
                    }
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Add a resource to a topic
     */ const addResource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, resource, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    const topic = week.researchSection.deepDiveTopics[topicIndex];
                    topic.suggestedResources = [
                        ...topic.suggestedResources || [],
                        resource
                    ];
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Remove a resource from a topic
     */ const removeResource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, resourceIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const topic = week.researchSection.deepDiveTopics[topicIndex];
                    if (topic.suggestedResources) {
                        topic.suggestedResources = topic.suggestedResources.filter((_, i)=>i !== resourceIndex);
                    }
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Reorder deliverables within a week section
     */ const reorderDeliverables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, startIndex, endIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    let deliverables;
                    if (section === 'build') deliverables = week.buildSection?.deliverables;
                    else if (section === 'research') deliverables = week.researchSection?.deliverables;
                    else if (section === 'share') deliverables = week.shareSection?.deliverables;
                    if (deliverables) {
                        const [removed] = deliverables.splice(startIndex, 1);
                        deliverables.splice(endIndex, 0, removed);
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Reorder resources within a topic
     */ /**
     * Reorder resources within a topic
     */ const reorderResources = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, startIndex, endIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const resources = week.researchSection.deepDiveTopics[topicIndex].suggestedResources;
                    if (resources) {
                        const [removed] = resources.splice(startIndex, 1);
                        resources.splice(endIndex, 0, removed);
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Toggle deliverable completion status
     */ const toggleDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, index, isCompleted, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    let deliverable;
                    if (section === 'build') deliverable = week.buildSection?.deliverables?.[index];
                    else if (section === 'research') deliverable = week.researchSection?.deliverables?.[index];
                    else if (section === 'share') deliverable = week.shareSection?.deliverables?.[index];
                    if (deliverable) {
                        deliverable.isCompleted = isCompleted;
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            // Dual-write: Also update the progress table
            // Construct a unique path for the deliverable
            const deliverablePath = `${section}.${index}`;
            await persistProgress(updatedRoadmap.id, weekNumber, section, deliverablePath, isCompleted);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Update deliverable description
     */ const updateDeliverable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, section, index, description, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week) {
                    let deliverable;
                    if (section === 'build') deliverable = week.buildSection?.deliverables?.[index];
                    else if (section === 'research') deliverable = week.researchSection?.deliverables?.[index];
                    else if (section === 'share') deliverable = week.shareSection?.deliverables?.[index];
                    if (deliverable) {
                        deliverable.description = description;
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Update resource details
     */ const updateResource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, resourceIndex, resource, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const resources = week.researchSection.deepDiveTopics[topicIndex].suggestedResources;
                    if (resources && resources[resourceIndex]) {
                        resources[resourceIndex] = resource;
                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Toggle topic completion status
     */ const toggleTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, isCompleted, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    week.researchSection.deepDiveTopics[topicIndex].isCompleted = isCompleted;
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            // Dual-write: Also update the progress table for topics
            const topicPath = `research.topic.${topicIndex}`;
            await persistProgress(updatedRoadmap.id, weekNumber, 'research', topicPath, isCompleted);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Update topic description
     */ const updateTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, description, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    week.researchSection.deepDiveTopics[topicIndex].description = description;
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    /**
     * Remove a topic
     */ const removeTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (weekNumber, topicIndex, options)=>{
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedRoadmap = {
                ...roadmap
            };
            const phase = updatedRoadmap.phases.find((p)=>p.weeks.some((w)=>w.weekNumber === weekNumber));
            if (phase) {
                const week = phase.weeks.find((w)=>w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics) {
                    week.researchSection.deepDiveTopics = week.researchSection.deepDiveTopics.filter((_, i)=>i !== topicIndex);
                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }
            await persistRoadmap(updatedRoadmap);
            options?.onSuccess?.();
        } catch (err) {
            const error = err;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    }, [
        roadmap,
        setRoadmapDirect
    ]);
    return {
        addDeliverable,
        removeDeliverable,
        reorderDeliverables,
        addResource,
        removeResource,
        reorderResources,
        toggleDeliverable,
        updateDeliverable,
        updateResource,
        toggleTopic,
        updateTopic,
        removeTopic,
        isLoading,
        error
    };
}
}),
"[project]/components/ui/DeliverableList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DeliverableList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$dnd$2f$DraggableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/dnd/DraggableDeliverable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddDeliverableButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/viewer/actions/AddDeliverableButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRoadmapMutations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/progress/tracker.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function DeliverableList({ deliverables, title, weekNumber = 1, section = 'build', roadmapId = 'default' }) {
    const { addDeliverable, removeDeliverable, reorderDeliverables } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRoadmapMutations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoadmapMutations"])();
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointerSensor"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortableKeyboardCoordinates"]
    }));
    const handleDragEnd = async (event)=>{
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = deliverables.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', i, section) === active.id);
            const newIndex = deliverables.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', i, section) === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                await reorderDeliverables(weekNumber, section, oldIndex, newIndex);
            }
        }
    };
    const handleToggle = (id, checked)=>{
        // TODO: Call API to update progress
        console.log('Toggle', id, checked);
    };
    const handleSave = (id, newDescription)=>{
        // TODO: Call API to update deliverable
        console.log('Save', id, newDescription);
    };
    const handleRemove = async (id)=>{
        // Extract index from ID or find it
        // ID format: w{weekNumber}-deliverable-{index}-{section}
        // But generateItemId might produce something else.
        // Let's find the index by iterating.
        const index = deliverables.findIndex((_, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', i, section) === id);
        if (index !== -1) {
            await removeDeliverable(weekNumber, section, index);
        }
    };
    const renderSubtasks = (subtasks)=>{
        if (!subtasks || subtasks.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "ml-8 mt-2 space-y-2",
            children: subtasks.map((subtask, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "flex items-start gap-2",
                    children: [
                        subtask.isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/DeliverableList.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                            className: "w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/DeliverableList.tsx",
                            lineNumber: 105,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-sm ${subtask.isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`,
                            children: subtask.description
                        }, void 0, false, {
                            fileName: "[project]/components/ui/DeliverableList.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/ui/DeliverableList.tsx",
            lineNumber: 99,
            columnNumber: 7
        }, this);
    };
    if (!deliverables || deliverables.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 119,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-500 dark:text-gray-400 italic",
                    children: "No deliverables yet"
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddDeliverableButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddDeliverableButton"], {
                    weekNumber: weekNumber,
                    section: section,
                    currentCount: 0,
                    onAdd: async (description)=>{
                        await addDeliverable(weekNumber, section, description);
                    }
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/DeliverableList.tsx",
            lineNumber: 118,
            columnNumber: 7
        }, this);
    }
    // Generate IDs for sortable items
    const items = deliverables.map((_, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', index, section));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-sm font-semibold text-gray-900 dark:text-gray-100",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/ui/DeliverableList.tsx",
                lineNumber: 140,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DndContext"], {
                sensors: sensors,
                collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closestCenter"],
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortableContext"], {
                    items: items,
                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-3",
                        children: deliverables.map((item, index)=>{
                            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$progress$2f$tracker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateItemId"])(weekNumber, 'deliverable', index, section);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$dnd$2f$DraggableDeliverable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DraggableDeliverable"], {
                                        id: id,
                                        deliverable: item,
                                        weekNumber: weekNumber,
                                        index: index,
                                        section: section,
                                        roadmapId: roadmapId,
                                        isCompleted: item.isCompleted,
                                        onToggle: handleToggle,
                                        onSave: handleSave,
                                        onRemove: handleRemove
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/DeliverableList.tsx",
                                        lineNumber: 156,
                                        columnNumber: 19
                                    }, this),
                                    'subtasks' in item && renderSubtasks(item.subtasks)
                                ]
                            }, id, true, {
                                fileName: "[project]/components/ui/DeliverableList.tsx",
                                lineNumber: 155,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/ui/DeliverableList.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/DeliverableList.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/DeliverableList.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$viewer$2f$actions$2f$AddDeliverableButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddDeliverableButton"], {
                weekNumber: weekNumber,
                section: section,
                currentCount: deliverables.length,
                onAdd: async (description)=>{
                    await addDeliverable(weekNumber, section, description);
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/DeliverableList.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/DeliverableList.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/roadmap/BuildSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BuildSectionComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hammer.js [app-ssr] (ecmascript) <export default as Hammer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/DeliverableList.tsx [app-ssr] (ecmascript)");
;
;
;
function BuildSectionComponent({ buildSection, weekNumber }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-orange-600 dark:text-orange-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__["Hammer"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold",
                        children: [
                            "Build (",
                            buildSection.hours,
                            "h)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/BuildSection.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-base font-semibold text-gray-900 dark:text-gray-100 mb-2",
                                children: buildSection.projectTitle
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed",
                                children: buildSection.description
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    buildSection.technicalStack && buildSection.technicalStack.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                className: "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2",
                                children: "Technical Stack"
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: buildSection.technicalStack.map((tech, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full",
                                        children: tech
                                    }, index, false, {
                                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                                        lineNumber: 29,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    buildSection.components && buildSection.components.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                className: "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this),
                                    "Components"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5",
                                children: buildSection.components.map((component, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-sm text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-orange-300 dark:border-orange-700",
                                        children: component
                                    }, index, false, {
                                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/roadmap/BuildSection.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this),
                    buildSection.deliverables && buildSection.deliverables.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DeliverableList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        deliverables: buildSection.deliverables,
                        title: "Deliverables",
                        weekNumber: weekNumber,
                        section: "build"
                    }, void 0, false, {
                        fileName: "[project]/components/roadmap/BuildSection.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/roadmap/BuildSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/roadmap/BuildSection.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/experiments/living-space/ProgressPulse.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProgressPulse",
    ()=>ProgressPulse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function ProgressPulse({ isActive, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-400 to-pink-600 opacity-30 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200 animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                        lineNumber: 13,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -left-4 top-1/2 -translate-y-1/2 hidden xl:block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative flex h-3 w-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
                                        }, void 0, false, {
                                            fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                                            lineNumber: 17,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative inline-flex rounded-full h-3 w-3 bg-orange-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                                            lineNumber: 18,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                                    lineNumber: 16,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold text-orange-500 uppercase tracking-wider",
                                    children: "Active"
                                }, void 0, false, {
                                    fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                                    lineNumber: 20,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                            lineNumber: 15,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                        lineNumber: 14,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative rounded-xl bg-surface", isActive ? "ring-1 ring-orange-500/20" : ""),
                children: children
            }, void 0, false, {
                fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/experiments/living-space/ProgressPulse.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
}
}),
"[project]/components/experiments/living-space/MicroTipCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MicroTipCard",
    ()=>MicroTipCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-ssr] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
;
;
function MicroTipCard({ title, content, onDismiss }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative overflow-hidden rounded-lg border border-yellow-200 bg-yellow-50/50 p-4 transition-all hover:bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/10 dark:hover:bg-yellow-900/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold uppercase tracking-wide",
                        children: "Micro-Tip"
                    }, void 0, false, {
                        fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
                        lineNumber: 14,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs leading-relaxed text-gray-600 dark:text-gray-400",
                children: content
            }, void 0, false, {
                fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onDismiss,
                className: "absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 text-gray-400 hover:text-gray-600",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "h-3 w-3"
                }, void 0, false, {
                    fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/experiments/living-space/MicroTipCard.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/viewer/experiments/living-space/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LivingSpacePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$final_roadmap$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/final_roadmap.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$BuildSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/roadmap/BuildSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$experiments$2f$living$2d$space$2f$ProgressPulse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/experiments/living-space/ProgressPulse.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$experiments$2f$living$2d$space$2f$MicroTipCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/experiments/living-space/MicroTipCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/SelectionContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function LivingSpacePage() {
    // Mock State: Week 1
    const currentWeek = __TURBOPACK__imported__module__$5b$project$5d2f$final_roadmap$2e$json__$28$json$29$__["default"].phases[0].weeks[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$SelectionContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectionProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 dark:bg-gray-950 p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-[1600px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-gray-900 dark:text-white mb-2",
                                children: "Week 1: AI Fundamentals"
                            }, void 0, false, {
                                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                lineNumber: 20,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-gray-600 dark:text-gray-400",
                                children: [
                                    "Focus Mode: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-500 font-semibold",
                                        children: "Active"
                                    }, void 0, false, {
                                        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                        lineNumber: 24,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                        lineNumber: 19,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 xl:grid-cols-12 gap-8 items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden xl:flex xl:col-span-3 flex-col gap-6 sticky top-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$experiments$2f$living$2d$space$2f$MicroTipCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MicroTipCard"], {
                                        title: "Why this matters?",
                                        content: "Building a product from scratch is the fastest way to understand the limitations of current LLMs. You will face latency and hallucination issues immediately."
                                    }, void 0, false, {
                                        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                        lineNumber: 32,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$experiments$2f$living$2d$space$2f$MicroTipCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MicroTipCard"], {
                                        title: "Pro Tip: Vercel",
                                        content: "Use Vercel's AI SDK for streaming responses. It handles the complexity of edge functions for you."
                                    }, void 0, false, {
                                        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                        lineNumber: 36,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "xl:col-span-6 space-y-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent opacity-20 rounded-full hidden xl:block"
                                            }, void 0, false, {
                                                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                lineNumber: 47,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$experiments$2f$living$2d$space$2f$ProgressPulse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProgressPulse"], {
                                                isActive: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-6 flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider",
                                                                    children: "Current Focus"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                                    lineNumber: 52,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: "14h estimated"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                                    lineNumber: 55,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                            lineNumber: 51,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roadmap$2f$BuildSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            buildSection: currentWeek.buildSection,
                                                            weekNumber: 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                            lineNumber: 58,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                lineNumber: 49,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 border-dashed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-gray-400 mb-4",
                                                    children: "Research: Deep Dives"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500",
                                                    children: "Complete the build to unlock research topics on Transformers and Attention mechanisms."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                lineNumber: 43,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden xl:flex xl:col-span-3 flex-col gap-6 sticky top-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 p-6 border border-indigo-100 dark:border-indigo-900/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold",
                                                    children: "AI Coach"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                            lineNumber: 81,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-indigo-900 dark:text-indigo-200 mb-4",
                                            children: '"I noticed you haven\'t deployed to Vercel yet. Want a quick guide on setting up the CLI?"'
                                        }, void 0, false, {
                                            fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors",
                                            children: "Show Guide"
                                        }, void 0, false, {
                                            fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                            lineNumber: 88,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                        lineNumber: 28,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
                lineNumber: 17,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
            lineNumber: 16,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/viewer/experiments/living-space/page.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=_dcd4b85c._.js.map