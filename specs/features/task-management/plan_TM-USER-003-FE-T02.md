# TM-USER-003-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-003-FE-T02**  
**Related user story**: **TM-USER-003** (Complete/Uncomplete Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Update the `TaskItem` UI to include a checkbox that allows users to toggle the completion status. Visually distinguish completed tasks.
- **Impacted entities**: None.
- **Impacted services/modules**: `src/features/task-management/components/TaskItem.tsx`.
- **Impacted tests**: Component tests.

## 2) Scope
- **In scope**: 
  - Checkbox UI (using `shadcn/ui` Checkbox or native input styled).
  - Strikethrough style for task title when completed.
  - Integration with `onToggle` prop (callback).
  - Accessibility (keyboard toggle).
- **Out of scope**: 
  - Mutation logic (T03).
- **Assumptions**: 
  - `TaskItem` already exists (from Story 001).

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Write Tests (Red)**: Update `TaskItem.test.tsx` to check for checkbox presence and style changes based on status prop.
2.  **Implement (Green)**: Add checkbox to `TaskItem`. Apply conditional CSS classes (line-through, opacity).
3.  **Refactor**: Extract Checkbox if complex.

### 3.2 NFR hooks
- **Accessibility**: Checkbox needs `aria-label` "Mark as complete".
- **UX**: Immediate visual feedback (the checkbox state).

## 4) Atomic Task Breakdown

### Task 1: UI Implementation
- **Purpose**: interactive UI.
- **Artifacts**: `src/features/task-management/components/TaskItem.tsx`.
- **Test types**: Component Test.
- **BDD**: 
  - **Given** pending task **When** rendered **Then** checkbox unchecked.
  - **Given** completed task **When** rendered **Then** checkbox checked & title strikethrough.

## 5) Verification Plan
- **Automated**: `npm run test`.
- **Manual**: Storybook or temporary page mount.
