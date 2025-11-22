# Compass AI - Roadmap Viewer Frontend

A powerful Next.js application that generates personalized, week-by-week learning roadmaps for Product Managers using AI agents. Features an intelligent assessment system, beautiful schema-driven roadmap viewer, and cutting-edge AI-native UI prototypes.

![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black)
![React 19](https://img.shields.io/badge/React-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)

## 🚀 Features

### 🧠 AI-Powered Generation
*   **Intelligent Assessment**: 10-question adaptive wizard to understand your background
*   **Gap Analysis**: AI agents identify your specific skill gaps
*   **Custom Roadmaps**: Generates a 14-week personalized plan using GPT-4
*   **Strict Validation**: All AI outputs are validated against a strict JSON schema

### 📊 Interactive Roadmap Viewer
*   **Phase & Week Views**: Drill down from high-level phases to weekly tasks
*   **Progress Tracking**: Track completion of deliverables, topics, and weeks
*   **Resource Integration**: Curated resources with type badges (Video, Article, etc.)
*   **Dark Mode**: Fully responsive design with dark mode support
*   **Hybrid Flow UI**: Scroll-based focus mechanism with AI copilot sidebar

### 🎨 AI-Native UI Experiments
*   **Smart Stream**: Hero action cards with context-aware AI copilot
*   **Living White Space**: Micro-learning tips and progress pulse visualization
*   **Hybrid Flow**: Combined scroll-focus mechanism with integrated AI assistance
*   **Experimental Routes**: `/viewer/experiments/*` for testing new UI concepts

### 🛠️ SaaS Platform
*   **Dashboard**: Manage multiple roadmaps
*   **Secure**: User-provided OpenAI keys are encrypted (AES-256) before storage
*   **Authentication**: Secure sign-up/login via Clerk
*   **Persistence**: All data stored in Supabase with Row Level Security (RLS)

## 🏗️ Architecture

The application operates in two modes:
1.  **SaaS Mode** (`/dashboard`): Full authenticated experience with AI generation and progress tracking
2.  **Viewer Mode** (`/viewer`): Public, standalone viewer that accepts any valid JSON roadmap file

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **State Management**: Zustand, React Context
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Drag & Drop**: @dnd-kit
- **Markdown**: react-markdown with remark-gfm
- **Testing**: Jest with React Testing Library

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed technical documentation.

## 🏁 Getting Started

### Prerequisites
*   Node.js 20+
*   npm or yarn
*   Supabase Project
*   Clerk Application
*   OpenAI API Key

### Installation

1.  **Clone and Install**
    ```bash
    git clone <repo-url>
    cd roadmap-viewer/frontend
    npm install
    ```

2.  **Environment Setup**
    Copy `.env.example` to `.env.local` and fill in your keys:
    ```bash
    cp .env.example .env.local
    ```
    Required variables:
    *   `NEXT_PUBLIC_CLERK_*`: From Clerk Dashboard
    *   `NEXT_PUBLIC_SUPABASE_*`: From Supabase Settings
    *   `ENCRYPTION_SECRET`: Generate a 32-char random string

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000)

4.  **Run Tests**
    ```bash
    npm test              # Run all tests
    npm run test:watch    # Run in watch mode
    ```

## 📂 Project Structure

```
frontend/
├── app/
│   ├── (dashboard)/          # Authenticated routes (Dashboard, Onboarding)
│   ├── viewer/               # Public roadmap viewer
│   │   ├── week/[number]/    # Week detail view (Hybrid Flow UI)
│   │   ├── phase/[id]/       # Phase overview
│   │   └── experiments/      # AI-native UI prototypes
│   │       ├── smart-stream/
│   │       ├── living-space/
│   │       └── hybrid-flow/
│   ├── api/                  # API Routes (Agents, CRUD, Webhooks)
│   ├── globals.css           # Global styles and CSS variables
│   └── layout.tsx            # Root layout with theme provider
├── components/
│   ├── roadmap/              # Roadmap rendering components
│   ├── onboarding/           # Assessment & Wizard components
│   ├── viewer/               # Viewer-specific components
│   │   ├── hybrid/           # Hybrid Flow components (HeroAction, Copilot, ScrollFocus)
│   │   ├── actions/          # Bulk actions, buttons
│   │   ├── controls/         # Selection toggle, filters
│   │   └── notes/            # Note display and editing
│   └── experiments/          # Experimental UI components
├── lib/
│   ├── agents/               # AI logic & prompts
│   ├── db/                   # Database operations
│   ├── progress/             # Progress tracking logic
│   ├── validation/           # Schema & Guardrails validation
│   └── utils.ts              # Utility functions (cn, etc.)
├── context/                  # React Context providers
├── hooks/                    # Custom React hooks
└── public/                   # Static assets
```

## 🎨 UI Design System

The application uses a custom design system with:
- **CSS Variables**: Theme-aware colors defined in `globals.css`
- **Tailwind CSS 4**: Utility-first styling
- **Component Library**: Reusable components in `components/`
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic theme switching with `next-themes`

### Brand Kit
The brand kit is located in `brand-kit/` and includes:
- Color themes (Serene, Warm, Twilight, Dusk)
- Typography guidelines
- Component specifications
- Implementation guides

## 🧪 Testing

The project uses **Jest** for automated testing:
```bash
npm test              # Run all tests
npm run test:watch    # Run in watch mode
```

Test coverage includes:
- Progress calculation logic
- Component rendering
- User interactions

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Ensure all required environment variables are set in your production environment:
- Clerk keys for authentication
- Supabase keys for database access
- Encryption secret for API key storage

## 📜 Documentation

*   [Architecture Overview](docs/ARCHITECTURE.md)
*   [Roadmap & Status](docs/ROADMAP_AND_STATUS.md)
*   [Antigravity Setup](ANTIGRAVITY_SETUP.md)
*   [Quick Start Guide](QUICK_START.md)
*   [Claude Integration](CLAUDE.md)

## 🎯 Recent Updates

### Hybrid Flow Integration (Latest)
- ✅ Implemented scroll-based focus mechanism with blur/focus effects
- ✅ Added Hero Action component for current focus display
- ✅ Integrated Copilot sidebar for context-aware AI assistance
- ✅ Refactored Week View with 8/4 grid layout (2/3 content, 1/3 sidebar)
- ✅ Fixed focus thresholds for all sections across screen sizes
- ✅ Created design redesign prompt template for future UI work

### Previous Updates
- ✅ AI-native experimental prototypes (Smart Stream, Living White Space)
- ✅ Dark mode contrast improvements
- ✅ API error fixes and schema alignment
- ✅ Comprehensive brand kit with multi-theme system

## 🐛 Known Issues

- Build artifacts (`.next/`) and `node_modules/` are now properly gitignored
- Backend UUID type mismatch in user API key endpoint (tracked)

## 📄 License

Private - Do not distribute.

---

**Built with ❤️ using Next.js, React, and AI**
