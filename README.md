# AI PM Roadmap Generator

A powerful SaaS application that generates personalized, week-by-week learning roadmaps for Product Managers using AI agents. It combines an intelligent assessment system with a beautiful, schema-driven roadmap viewer.

![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black)
![React 19](https://img.shields.io/badge/React-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)

## 🚀 Features

### 🧠 AI-Powered Generation
*   **Intelligent Assessment**: 10-question adaptive wizard to understand your background.
*   **Gap Analysis**: AI agents identify your specific skill gaps.
*   **Custom Roadmaps**: Generates a 14-week personalized plan using GPT-4.
*   **Strict Validation**: All AI outputs are validated against a strict JSON schema.

### 📊 Interactive Roadmap Viewer
*   **Phase & Week Views**: Drill down from high-level phases to weekly tasks.
*   **Progress Tracking**: Track completion of deliverables, topics, and weeks.
*   **Resource Integration**: Curated resources with type badges (Video, Article, etc.).
*   **Dark Mode**: Fully responsive design with dark mode support.

### 🛠️ SaaS Platform
*   **Dashboard**: Manage multiple roadmaps.
*   **Secure**: User-provided OpenAI keys are encrypted (AES-256) before storage.
*   **Authentication**: Secure sign-up/login via Clerk.
*   **Persistence**: All data stored in Supabase with Row Level Security (RLS).

## 🏗️ Architecture

The application operates in two modes:
1.  **SaaS Mode** (`/dashboard`): Full authenticated experience with AI generation and progress tracking.
2.  **Viewer Mode** (`/viewer`): Public, standalone viewer that accepts any valid JSON roadmap file.

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
    cd roadmap-viewer
    npm install
    ```

2.  **Environment Setup**
    Copy `.env.example` to `.env.local` and fill in your keys:
    ```bash
    cp .env.example .env.local
    ```
    *   `NEXT_PUBLIC_CLERK_*`: From Clerk Dashboard.
    *   `NEXT_PUBLIC_SUPABASE_*`: From Supabase Settings.
    *   `ENCRYPTION_SECRET`: Generate a 32-char random string.

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000).

4.  **Run Tests**
    ```bash
    npm test
    ```

## 📂 Project Structure

```
app/
├── (dashboard)/        # Authenticated routes (Dashboard, Onboarding)
├── viewer/             # Public roadmap viewer
├── api/                # API Routes (Agents, CRUD, Webhooks)
components/
├── roadmap/            # Roadmap rendering components
├── onboarding/         # Assessment & Wizard components
lib/
├── agents/             # AI logic & prompts
├── db/                 # Database operations
├── progress/           # Progress tracking logic
├── validation/         # Schema & Guardrails validation
```

## 📜 Documentation

*   [Architecture Overview](docs/ARCHITECTURE.md)
*   [Roadmap & Status](docs/ROADMAP_AND_STATUS.md)
*   [Antigravity Setup](ANTIGRAVITY_SETUP.md)

## 🧪 Testing

The project uses **Jest** for automated testing.
```bash
npm test          # Run all tests
npm run test:watch # Run in watch mode
```

## 📄 License

Private - Do not distribute.
