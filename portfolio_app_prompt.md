# Portfolio Web App - Complete Build Prompt

**Objective**: Build a production-ready, visually stunning portfolio web app that showcases my professional journey, the Compass AI project, design philosophy, and includes an AI-powered resume chatbot.

---

## 🎯 Project Overview

Create a **single-page Next.js application** that serves as my professional portfolio. The app should feel premium, modern, and demonstrate exceptional UI/UX design skills while showcasing my AI PM approach and the Compass AI roadmap viewer project.

---

## 🏗️ Technical Stack

**Framework & Core**:
- Next.js 15+ (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

**AI Integration**:
- OpenAI API (for resume chatbot)
- Streaming responses for chat interface

**Deployment**:
- Vercel (optimized for Next.js)
- Environment variables for API keys

**Design Philosophy**:
- Premium aesthetics (inspired by Linear, Vercel, Apple)
- Glassmorphism and subtle gradients
- Smooth animations (framer-motion)
- Dark mode by default with light mode toggle
- Mobile-first responsive design

---

## 📐 Page Structure & Sections

### 1. Hero Section
**Purpose**: Immediate impact, professional introduction

**Design**:
- Full-viewport height with animated gradient background
- Professional headshot (circular, glassmorphic border)
- Name in large, bold typography (60-80px)
- Tagline: "AI Product Manager | Design Thinker | Builder"
- Animated scroll indicator

**Content to Provide**:
- Professional photo (high-res, square format)
- Name: [Your Name]
- Current role/title
- Location (optional)

**Interactions**:
- Parallax scroll effect on background
- Fade-in animations on load
- CTA buttons: "View My Work" (scroll to projects) and "Chat with My Resume" (open chatbot)

---

### 2. About Me Section
**Purpose**: Professional background, skills, and philosophy

**Design**:
- Two-column layout (60/40 split)
- Left: Professional narrative (3-4 paragraphs)
- Right: Skills grid with proficiency indicators

**Content to Provide**:
- Professional bio (200-300 words covering):
  - Background and journey into AI/PM
  - Core expertise areas
  - What drives you professionally
  - Vision for AI in product management
- Skills list with categories:
  - Product Management (Roadmapping, User Research, Stakeholder Management, etc.)
  - AI & Technical (OpenAI, Prompt Engineering, Python, etc.)
  - Design & UX (Figma, User-Centered Design, etc.)
  - Tools (Jira, Notion, Analytics platforms, etc.)

**Interactions**:
- Skill bars animate on scroll into view
- Hover effects on skill cards

---

### 3. Compass AI Project Showcase
**Purpose**: Deep dive into the flagship project

**Design**:
- Hero banner with project logo/screenshot
- Tabbed interface for different aspects:
  - **Overview**: Problem statement, solution, impact
  - **Design Decisions**: UI/UX choices, design system, AI-native concepts
  - **Technical Architecture**: Stack, data flow, key features
  - **Learnings**: Challenges, iterations, outcomes
  - **Live Demo**: Embedded iframe or link to live app

**Content to Provide**:
- Project description (150-200 words)
- Key metrics/outcomes (e.g., "14-week personalized roadmaps", "3 AI-native UI prototypes")
- Screenshots/recordings of:
  - Week View (Hybrid Flow)
  - Experimental prototypes (Smart Stream, Living White Space)
  - Dashboard view
- Design philosophy writeup (300-400 words):
  - Why Hybrid Flow was chosen
  - Scroll-based focus mechanism rationale
  - AI copilot integration benefits
  - User-centric design approach
- Technical highlights:
  - Next.js 16 + React 19
  - FastAPI backend
  - OpenAI integration
  - Supabase database
- Key learnings (bullet points):
  - Iterative design process
  - Balancing AI assistance with user control
  - Performance optimization for large datasets
  - etc.

**Interactions**:
- Tab switching with smooth transitions
- Image carousel for screenshots
- "View Live Demo" button (opens in new tab)
- "View on GitHub" button (if public)

---

### 4. AI PM Approach Section
**Purpose**: Showcase methodology and thought leadership

**Design**:
- Timeline or step-by-step visual flow
- Icon-driven cards for each principle

**Content to Provide**:
- Your AI PM framework (4-6 key principles), e.g.:
  1. **User-Centric AI**: AI should augment, not replace human decision-making
  2. **Iterative Prototyping**: Build, test, learn, repeat
  3. **Data-Informed Design**: Let analytics guide, not dictate
  4. **Ethical AI**: Transparency, privacy, and user control
  5. **Cross-Functional Collaboration**: Bridge engineering, design, and business
  6. **Continuous Learning**: Stay ahead of AI trends and tools

**Interactions**:
- Cards expand on hover to show more detail
- Smooth scroll animations

---

### 5. Resume Chatbot Section
**Purpose**: Interactive way to learn about professional background

**Design**:
- Floating chat widget (bottom-right corner, always accessible)
- OR dedicated section with embedded chat interface
- Glassmorphic chat window
- Typing indicators, smooth message animations
- Suggested questions as chips

**Content to Provide**:
- Full resume text (PDF or structured text)
- Key facts about your career:
  - Education
  - Work experience (companies, roles, dates, achievements)
  - Projects
  - Certifications
  - Publications/talks (if any)

**Technical Implementation**:
- Use OpenAI API with system prompt:
  ```
  You are a helpful assistant representing [Your Name]'s professional background.
  Answer questions about their resume, experience, skills, and projects.
  Be concise, professional, and friendly. If asked about something not in the resume,
  politely say you don't have that information.
  
  Resume:
  [Insert full resume text here]
  ```
- Stream responses for better UX
- Rate limiting to prevent API abuse
- Suggested questions:
  - "What's your experience with AI?"
  - "Tell me about the Compass AI project"
  - "What are your key skills?"
  - "What's your educational background?"

**Interactions**:
- Click to open/close chat
- Auto-scroll to latest message
- Copy message button
- Clear chat button

---

### 6. Contact Section
**Purpose**: Easy ways to connect

**Design**:
- Clean, minimal layout
- Social links with icons (LinkedIn, GitHub, Twitter, Email)
- Optional: Contact form (if you want to collect messages)

**Content to Provide**:
- Email address
- LinkedIn URL
- GitHub URL
- Twitter/X handle (optional)
- Other relevant links (Medium, personal blog, etc.)

**Interactions**:
- Hover effects on social icons
- Copy email to clipboard button
- Form validation (if using contact form)

---

## 🎨 Design System

### Color Palette
**Dark Mode (Default)**:
- Background: `#0a0a0a` (near black)
- Surface: `#1a1a1a` (dark gray)
- Primary Accent: `#6366f1` (indigo)
- Secondary Accent: `#f59e0b` (amber)
- Text Primary: `#f5f5f5` (off-white)
- Text Secondary: `#a3a3a3` (gray)
- Border: `#2a2a2a` (subtle gray)

**Light Mode**:
- Background: `#ffffff`
- Surface: `#f9fafb`
- Primary Accent: `#4f46e5`
- Secondary Accent: `#f59e0b`
- Text Primary: `#0a0a0a`
- Text Secondary: `#6b7280`
- Border: `#e5e7eb`

### Typography
- **Headings**: Inter (bold, 600-800 weight)
- **Body**: Inter (regular, 400-500 weight)
- **Code/Mono**: JetBrains Mono

### Spacing
- Use 8px grid system (8, 16, 24, 32, 48, 64, 96, 128px)

### Effects
- **Glassmorphism**: `backdrop-blur-xl bg-white/10 border border-white/20`
- **Shadows**: Subtle, layered shadows for depth
- **Gradients**: Radial gradients for backgrounds, linear for accents
- **Animations**: 
  - Fade-in on scroll (Intersection Observer)
  - Smooth transitions (300-500ms ease-in-out)
  - Micro-interactions on hover (scale, color shift)

---

## 🚀 Implementation Requirements

### Must-Haves
1. **Fully Responsive**: Perfect on mobile, tablet, and desktop
2. **Performance Optimized**:
   - Next.js Image optimization
   - Lazy loading for images and heavy components
   - Code splitting
   - Lighthouse score 90+ on all metrics
3. **SEO Optimized**:
   - Meta tags (title, description, OG tags)
   - Structured data (JSON-LD for Person schema)
   - Sitemap
4. **Accessibility**:
   - ARIA labels
   - Keyboard navigation
   - Screen reader friendly
   - WCAG 2.1 AA compliant
5. **Dark/Light Mode Toggle**: Persistent preference (localStorage)
6. **Smooth Scrolling**: Native smooth scroll with offset for fixed header
7. **Loading States**: Skeleton screens, spinners where appropriate
8. **Error Handling**: Graceful error messages for chatbot API failures

### Nice-to-Haves
- Animated page transitions
- Easter eggs (e.g., Konami code for special message)
- Analytics integration (Google Analytics or Vercel Analytics)
- Blog section (if you plan to write)

---

## 📦 Deliverables

### Code Structure
```
portfolio-app/
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout with theme provider
│   ├── globals.css           # Global styles
│   └── api/
│       └── chat/
│           └── route.ts      # Chatbot API endpoint
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── ProjectShowcase.tsx
│   ├── AIPMApproach.tsx
│   ├── ResumeChatbot.tsx
│   ├── Contact.tsx
│   └── ui/                   # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ThemeToggle.tsx
│       └── ...
├── lib/
│   └── utils.ts              # Utility functions
├── public/
│   ├── images/               # Photos, screenshots
│   └── resume.pdf            # Downloadable resume
├── .env.example              # Environment variable template
├── next.config.js
├── tailwind.config.ts
└── package.json
```

### Environment Variables
```bash
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

### Deployment
- Deploy to Vercel
- Custom domain setup instructions
- Environment variable configuration guide

---

## 📝 Content Checklist

Before starting, I will provide:
- [ ] Professional headshot (square, high-res)
- [ ] Full name and tagline
- [ ] Professional bio (200-300 words)
- [ ] Skills list with categories
- [ ] Compass AI project details:
  - [ ] Description
  - [ ] Screenshots/recordings
  - [ ] Design philosophy writeup
  - [ ] Technical highlights
  - [ ] Key learnings
- [ ] AI PM approach framework (4-6 principles)
- [ ] Full resume text (for chatbot)
- [ ] Contact information (email, LinkedIn, GitHub, etc.)
- [ ] Any additional projects to showcase (optional)

---

## 🎯 Success Criteria

The final app should:
1. ✅ Load in under 2 seconds on 4G connection
2. ✅ Score 90+ on all Lighthouse metrics
3. ✅ Look stunning on all devices (mobile, tablet, desktop)
4. ✅ Have a functional, responsive AI chatbot
5. ✅ Clearly communicate my professional value proposition
6. ✅ Showcase the Compass AI project comprehensively
7. ✅ Be production-ready and deployable to Vercel
8. ✅ Include a README with setup and deployment instructions

---

## 🚀 Execution Instructions

**To Claude Code**:

Using the specifications above, build a complete, production-ready Next.js portfolio application. Follow these steps:

1. **Initialize Project**: Create a new Next.js 15 app with TypeScript and Tailwind CSS
2. **Implement Design System**: Set up the color palette, typography, and reusable components
3. **Build Sections**: Create all 6 sections (Hero, About, Project Showcase, AI PM Approach, Resume Chatbot, Contact)
4. **Integrate AI Chatbot**: Implement OpenAI API integration with streaming responses
5. **Add Animations**: Use framer-motion for smooth, professional animations
6. **Optimize Performance**: Implement lazy loading, image optimization, and code splitting
7. **Test Responsiveness**: Ensure perfect rendering on all screen sizes
8. **Add Dark/Light Mode**: Implement theme toggle with persistence
9. **SEO & Accessibility**: Add meta tags, ARIA labels, and semantic HTML
10. **Create Deployment Guide**: Write clear instructions for Vercel deployment

**Important**: 
- Use placeholder content where I haven't provided specific details yet
- Comment clearly where I need to add my personal information
- Make the app visually stunning - this is a showcase of design skills
- Prioritize performance and user experience
- Include a comprehensive README with setup instructions

Build this as a **single, cohesive application** that I can immediately deploy after adding my personal content.
