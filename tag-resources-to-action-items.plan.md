<!-- 78f508a5-dd56-4599-800b-13198a7e1624 a1dc9103-d00a-4da9-aea8-901e7c0deade -->
# Schema-Driven Roadmap Viewer

## Overview

Build a generic, schema-driven roadmap viewer application using Next.js 14, React, and TypeScript that accepts any JSON file conforming to `json_schema_final.json` and renders it as an interactive, beautiful UI with all roadmap features.

## Key Features

- **Schema Validation**: Validate uploaded JSON against `json_schema_final.json`
- **File Upload**: Drag & drop or file picker for JSON input
- **Generic Rendering**: Schema-driven components that work with any valid roadmap
- **Interactive UI**: Collapsible sections, navigation, search, filtering
- **Resource Integration**: Clickable resource links with type badges
- **Progress Tracking**: Visual progress indicators
- **Responsive Design**: Mobile-first, works on all devices

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Schema Validation**: ajv (JSON Schema validator)
- **State Management**: React Context + hooks
- **Icons**: Lucide React or Heroicons

## Application Structure

### Pages

1. **Root Page** (`/`) - File upload/input interface
2. **Viewer** (`/viewer`) - Main roadmap overview
3. **Phase View** (`/viewer/phase/[id]`) - Phase details
4. **Week View** (`/viewer/week/[number]`) - Week details
5. **Resources View** (`/viewer/resources`) - All resources aggregated

### Core Components

- `FileUpload` - Drag & drop file input with validation
- `SchemaValidator` - Validates JSON against schema
- `RoadmapProvider` - Context provider for roadmap data
- `PhaseCard` - Displays phase overview
- `WeekCard` - Shows week summary
- `BuildSection` - Renders build activities
- `ResearchSection` - Renders research topics with resources
- `ShareSection` - Renders share activities
- `DeepDiveTopic` - Topic with subtasks and resources
- `ResourceLink` - Clickable resource with type badge
- `DeliverableList` - Checklist component
- `ProgressBar` - Visual progress indicator
- `SearchBar` - Search across roadmap
- `FilterBar` - Filter by phase, skill, status

### File Structure

```
roadmap-viewer/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Upload/Input)
│   ├── viewer/
│   │   ├── page.tsx
│   │   ├── phase/[id]/page.tsx
│   │   ├── week/[number]/page.tsx
│   │   └── resources/page.tsx
│   └── api/
│       └── validate/route.ts
├── components/
│   ├── input/
│   │   └── FileUpload.tsx
│   ├── roadmap/
│   │   ├── PhaseCard.tsx
│   │   ├── WeekCard.tsx
│   │   ├── BuildSection.tsx
│   │   ├── ResearchSection.tsx
│   │   ├── ShareSection.tsx
│   │   └── DeepDiveTopic.tsx
│   ├── ui/
│   │   ├── ResourceLink.tsx
│   │   ├── DeliverableList.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SearchBar.tsx
│   │   └── FilterBar.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── lib/
│   ├── schema.ts (Load JSON schema)
│   ├── validator.ts (ajv validation)
│   ├── types.ts (TypeScript interfaces)
│   └── roadmap.ts (Utilities)
├── context/
│   └── RoadmapContext.tsx
└── public/
    └── json_schema_final.json
```

## Implementation Steps

1. **Project Setup**

   - Initialize Next.js 14 with TypeScript
   - Install dependencies (Tailwind, ajv, lucide-react)
   - Set up project structure

2. **Schema & Validation**

   - Load `json_schema_final.json`
   - Create validation utility with ajv
   - Build validation API endpoint
   - Generate TypeScript types from schema

3. **File Upload System**

   - Build drag & drop file upload component
   - Add URL/path input option
   - Integrate schema validation
   - Display validation errors/feedback

4. **Data Management**

   - Create RoadmapContext for state management
   - Build generic data parsing utilities
   - Handle optional/missing fields gracefully

5. **UI Components**

   - Build layout components (Header, Sidebar, Footer)
   - Create reusable UI primitives
   - Implement resource display components

6. **Roadmap Rendering**

   - Build schema-driven rendering components
   - Phase and week display components
   - Section rendering (Build/Research/Share)
   - Dynamic resource aggregation

7. **Interactivity**

   - Navigation system
   - Search functionality
   - Filtering by phase/skill/status
   - Collapsible sections
   - Progress tracking

8. **Styling & Polish**

   - Apply Tailwind CSS
   - Add animations/transitions
   - Responsive design
   - Accessibility improvements

9. **Testing**

   - Test with `final_roadmap.json`
   - Test with other valid JSON files
   - Verify schema validation
   - Mobile responsiveness check

### To-dos

- [x] Identify all ambiguous deepDiveTopics and subtasks across 14 weeks that need resource tags