# Schema-Driven Roadmap Viewer

A generic, schema-driven roadmap viewer application built with Next.js 14, React, and TypeScript that accepts any JSON file conforming to a defined schema and renders it as an interactive, beautiful UI.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

### Core Functionality
- 📤 **File Upload**: Drag & drop or browse for JSON files
- 🌐 **URL Loading**: Load roadmaps from remote URLs
- ✅ **Schema Validation**: AJV-based validation with detailed error reporting
- 🎨 **Beautiful UI**: Modern, responsive design with dark mode support
- 📊 **Progress Tracking**: Visual progress bars at roadmap, phase, and week levels
- 🔗 **Resource Integration**: Clickable resource links with type badges
- 🧭 **Intuitive Navigation**: Easy navigation between phases and weeks

### Interactive Features
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌙 Dark mode support
- ✓ Deliverable checklists with completion tracking
- 🔍 Resource type badges (YouTube, Article, Guide, etc.)
- 📈 Real-time progress calculation
- 🎯 Phase and week-based navigation
- ↔️ Previous/Next navigation

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Usage

### 1. Loading a Roadmap

**Option A: Upload a File**
1. Click "Browse Files" or drag & drop a JSON file
2. The file will be validated against the schema
3. If valid, you'll be redirected to the viewer

**Option B: Load from URL**
1. Enter a URL to a JSON file
2. Click "Load"
3. The roadmap will be fetched and validated

**Option C: Try the Example**
1. Click "Load example roadmap (final_roadmap.json)"
2. Instantly see a complete 14-week AI PM roadmap

### 2. Navigating the Roadmap

**Overview Page** (`/viewer`)
- View overall roadmap stats
- See all phases
- Track overall progress

**Phase View** (`/viewer/phase/[id]`)
- View all weeks in a phase
- Track phase progress
- Navigate between phases

**Week View** (`/viewer/week/[number]`)
- View detailed week information
- See Build, Research, and Share sections
- Track deliverables and resources
- Navigate between weeks

## Project Structure

```
roadmap-viewer/
├── app/                        # Next.js app directory
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (file upload)
│   ├── viewer/
│   │   ├── page.tsx            # Roadmap overview
│   │   ├── phase/[id]/         # Phase details
│   │   └── week/[number]/      # Week details
├── components/
│   ├── input/
│   │   └── FileUpload.tsx      # File upload component
│   ├── roadmap/
│   │   ├── PhaseCard.tsx       # Phase card
│   │   ├── WeekCard.tsx        # Week card
│   │   ├── BuildSection.tsx    # Build section
│   │   ├── ResearchSection.tsx # Research section
│   │   └── ShareSection.tsx    # Share section
│   ├── ui/
│   │   ├── ProgressBar.tsx     # Progress bar
│   │   ├── ResourceLink.tsx    # Resource link
│   │   └── DeliverableList.tsx # Deliverable checklist
│   └── layout/
│       └── Header.tsx          # Header/navigation
├── context/
│   └── RoadmapContext.tsx      # Global state
├── lib/
│   ├── types.ts                # TypeScript types
│   ├── validator.ts            # Schema validation
│   └── roadmap-utils.ts        # Utility functions
└── public/
    ├── json_schema_final.json  # JSON Schema
    └── final_roadmap.json      # Example roadmap
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [AJV](https://ajv.js.org/)

## Key Features

### Schema Validation
- Validates JSON against schema before rendering
- Provides detailed, human-readable error messages
- Gracefully handles validation failures

### Flexible Type System
- TypeScript types handle schema variations
- Optional fields supported throughout
- Handles different section structures (build/research/share)

### Progress Tracking
- Calculates completion percentage at all levels
- Visual progress bars with color coding
- Aggregates deliverables from all sections

### Resource Management
- Aggregates resources from all levels
- Deduplicates resources
- Color-coded type badges
- External link indicators

## Troubleshooting

### Validation Errors
If your JSON fails validation:
1. Check the error message for specific field issues
2. Compare against `json_schema_final.json`
3. Ensure all required fields are present
4. Verify data types match the schema

### Build Errors
If you encounter build errors:
```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import the project on Vercel
3. Deploy automatically

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Ready to visualize your roadmap?** Drop a JSON file and start exploring! 🚀
