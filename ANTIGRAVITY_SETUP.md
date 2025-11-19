# Antigravity Setup & Migration

This project has been configured for use with Google Antigravity.

## Workflows
The following workflows have been set up in `.agent/workflows/`:

- **/dev**: Start the development server (`npm run dev`)
- **/build**: Build the application for production (`npm run build`)
- **/lint**: Run ESLint (`npm run lint`)
- **/install**: Install dependencies (`npm install`)

## Project Context (Migrated from CLAUDE.md)

**Overview**: AI-powered roadmap generator SaaS application.
**Tech Stack**: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Clerk (auth), Supabase (db).

### Key Architecture Notes
- **Viewer Mode**: `/viewer/*` - Generic roadmap viewer (JSON schema driven).
- **SaaS Mode**: `/dashboard/*` - Authenticated experience (Clerk + Supabase).
- **AI Agents**: Located in `lib/agents/`.
- **Schema**: `public/json_schema_final.json` is the source of truth.

### Environment
Ensure your `.env.local` is populated with the necessary keys (Clerk, Supabase, OpenAI) as detailed in `CLAUDE.md`.

## Next Steps
1. Run `/install` to ensure dependencies are up to date.
2. Run `/dev` to start the server.
