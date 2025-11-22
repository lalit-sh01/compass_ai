# Project Cleanup - Unnecessary Files

This document lists files and directories that are no longer needed and can be safely removed from the project.

## 📋 Summary

**Total Categories**: 6
**Estimated Space Savings**: Significant (especially from duplicate JSON files and archived docs)

---

## 🗑️ Files to Remove

### 1. Duplicate Prompt Files
**Reason**: We have multiple copies of the same redesign prompt

- `/UI redesign prompt.md` (duplicate of `design_redesign_prompt.md`)
- `/design_redesign_prompt.md` (keep `portfolio_app_prompt.md` as the comprehensive version)

**Action**: Keep only `portfolio_app_prompt.md` in the root

---

### 2. Temporary Design Notes
**Reason**: These were brainstorming documents that have been implemented

- `/options.md` - Initial AI-native design brainstorming (concepts now implemented in experiments)

**Action**: Remove (concepts are now in `/frontend/app/viewer/experiments/`)

---

### 3. Archived Documentation (Frontend)
**Reason**: Old session summaries and implementation plans that are no longer relevant

**Directory**: `/frontend/archive/`

Files to remove:
- `FINAL_SUMMARY.md`
- `GAPS_FIXED.md`
- `IMPLEMENTATION_PLAN.md`
- `NEXTJS_15_CHANGES.md`
- `PHASE_5.1_FOUNDATION_COMPLETE.md`
- `PHASE_5_EDITABLE_ROADMAP_PLAN.md`
- `SAAS_IMPLEMENTATION_PLAN.md`
- `SCHEMA_FIXES.md`
- `SESSION_2_SUMMARY.md`
- `SESSION_PROGRESS.md`
- `SETUP_COMPLETE.md`
- `tag-resources-to-action-items.plan.md`

**Action**: Remove entire `/frontend/archive/` directory

---

### 4. Brand Kit (Outdated)
**Reason**: The brand kit was created for a specific design phase but is no longer actively used. The actual design system is now in `globals.css` and Tailwind config.

**Directory**: `/frontend/brand-kit/`

**Subdirectories**:
- `assets/` - Mockup images
- `core-brand-elements/` - Typography, spacing, logo guides
- `implementation/` - CSS variables, theme switching guides
- `themes/` - Theme definitions (Serene, Warm, Twilight, Dusk)
- `ui-components/` - Button, card, form, navigation specs

**Files**:
- `BRAND_KIT_SUMMARY.md`
- `README.md`

**Action**: 
- **Option A (Recommended)**: Move to `/frontend/archive/brand-kit/` for reference
- **Option B**: Remove entirely if design system is fully implemented in code

---

### 5. Duplicate JSON Files
**Reason**: Multiple copies of the same roadmap data

**Files**:
- `/frontend/final_roadmap.json` (duplicate)
- `/frontend/json_schema_final.json` (duplicate)
- `/frontend/public/final_roadmap.json` (keep this one - it's in the public directory)
- `/frontend/public/json_schema_final.json` (keep this one)

**Action**: Remove the duplicates in `/frontend/` root, keep only the ones in `/frontend/public/`

---

### 6. Temporary Documentation Files
**Reason**: Development notes that are now outdated

**Files**:
- `/frontend/bugs.md` - Bug tracking (should use GitHub Issues instead)
- `/frontend/ANTIGRAVITY_SETUP.md` - Setup notes (info now in README)
- `/frontend/CLAUDE.md` - Claude-specific notes (info now in README)
- `/frontend/QUICK_START.md` - Quick start guide (info now in README)

**Action**: 
- **Option A**: Consolidate useful info into main README, then remove
- **Option B**: Move to `/frontend/docs/` if you want to keep them

---

### 7. Docker Compose (If Not Using)
**Reason**: Only needed if running services in Docker

**Files**:
- `/docker-compose.yml`
- `/backend/Dockerfile`

**Action**: Remove if you're not using Docker for local development or deployment

---

## ✅ Files to KEEP

### Root Level
- `portfolio_app_prompt.md` - Comprehensive portfolio app prompt

### Frontend
- `README.md` - Main documentation
- `package.json`, `package-lock.json` - Dependencies
- `next.config.ts`, `tailwind.config.ts`, `tsconfig.json` - Configuration
- `jest.config.js`, `jest.setup.ts` - Testing setup
- `eslint.config.mjs`, `postcss.config.mjs` - Linting and PostCSS
- `middleware.ts` - Next.js middleware
- `next-env.d.ts` - TypeScript definitions

### Frontend Docs
- `/frontend/docs/ARCHITECTURE.md` - Architecture documentation
- `/frontend/docs/ROADMAP_AND_STATUS.md` - Project roadmap

### Backend
- All current backend files (actively used)

---

## 🚀 Recommended Cleanup Steps

1. **Phase 1 - Safe Removals** (No risk):
   ```bash
   # Remove duplicate prompts
   rm "UI redesign prompt.md"
   rm design_redesign_prompt.md
   
   # Remove temporary notes
   rm options.md
   
   # Remove duplicate JSON files
   rm frontend/final_roadmap.json
   rm frontend/json_schema_final.json
   ```

2. **Phase 2 - Archive Old Docs**:
   ```bash
   # Already archived, can remove
   rm -rf frontend/archive/
   ```

3. **Phase 3 - Brand Kit Decision**:
   ```bash
   # Option A: Archive for reference
   mkdir -p frontend/archive/brand-kit
   mv frontend/brand-kit/* frontend/archive/brand-kit/
   rmdir frontend/brand-kit
   
   # Option B: Remove entirely
   # rm -rf frontend/brand-kit/
   ```

4. **Phase 4 - Consolidate Docs**:
   ```bash
   # Review and consolidate, then remove
   # rm frontend/bugs.md
   # rm frontend/ANTIGRAVITY_SETUP.md
   # rm frontend/CLAUDE.md
   # rm frontend/QUICK_START.md
   ```

5. **Phase 5 - Docker (If Not Using)**:
   ```bash
   # rm docker-compose.yml
   # rm backend/Dockerfile
   ```

---

## 📊 Impact Assessment

### Low Risk (Safe to Remove Immediately)
- Duplicate prompt files
- `options.md`
- Duplicate JSON files in `/frontend/` root
- `/frontend/archive/` directory

### Medium Risk (Review First)
- Brand kit directory (might want to archive)
- Temporary documentation files (consolidate first)

### High Risk (Decide Based on Usage)
- Docker files (only if not using Docker)
- `bugs.md` (migrate to GitHub Issues first)

---

## 🔍 Next Steps

1. Review this list
2. Decide on brand kit handling (archive vs. remove)
3. Consolidate useful info from temp docs into main README
4. Execute cleanup in phases
5. Commit changes with clear message: "chore: Remove unnecessary files and consolidate documentation"

---

**Last Updated**: 2025-11-21
**Total Files Identified for Removal**: ~30+ files
**Directories for Removal**: 2-3 (archive, brand-kit, possibly Docker files)
