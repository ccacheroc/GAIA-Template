# QQ-TECH-001-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TECH-001-FE-T01**  
**Related user story**: **QQ-TECH-001**  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `QQ-TECH-001-FE-T01`.

---

## 1) Context & Objective
- **Ticket summary**: Update the global design system of the Gaia Quiz App to strictly follow the Brand Guidelines. This includes color palette, typography (Inter), and semantic token mapping for shadcn/ui components.
- **Impacted files**: 
    - `frontend/src/index.css`
    - `frontend/index.html` (for Google Fonts)
- **Impacted tests**: Visual consistency checks in future E2E tests.

## 2) Scope
- **In scope**: 
    - Updating `:root` and `.dark` variables in `index.css`.
    - Importing Inter font from Google Fonts.
    - Mapping semantic tokens (primary, secondary, accent) to brand colors.
- **Out of scope**: Individual component refactors (covered in T02).
- **Assumptions**: The project uses Tailwind CSS 4 features or standard CSS variables compatible with the existing shadcn setup.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Verification**: After applying changes, inspect the computed styles in the browser to ensure CSS variables match the Brand Guidelines.
2. **Visual Inspection**: Use the browser subagent to verify the overall "Warm White" background and "Navy" text baseline.

### 3.2 NFR hooks
- **Brand & Visuals** (FE): 
    - Background: `--background: 40 60% 99%` (Warm White)
    - Foreground: `--foreground: 255.6 23.9% 22.2%` (Navy)
    - Primary: `--primary: 24.3 61.8% 43.1%` (Terracotta AA)
    - Secondary: `--secondary: 82.6 46.0% 51.4%` (Green)
- **Accessibility**: Ensure contrast ratios remain AA or higher with the new palette.

## 4) Atomic Task Breakdown

### Task 1: Update Google Fonts for Inter
- **Purpose**: Ensure the primary typeface is available.
- **Prerequisites**: Access to `frontend/index.html`.
- **Artifacts impacted**: `frontend/index.html`.

### Task 2: Implement Brand Design Tokens in CSS
- **Purpose**: Update global variables in `index.css`.
- **Prerequisites**: Verified HSL values from brand guidelines.
- **Artifacts impacted**: `frontend/src/index.css`.

### Task 3: Verify Design System Application
- **Purpose**: Confirm variables are correctly picked up by Tailwind/shadcn.
- **Artifacts impacted**: Browser view.
