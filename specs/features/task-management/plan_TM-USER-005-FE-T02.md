# TM-USER-005-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-005-FE-T02**  
**Related user story**: **TM-USER-005** (Search Tasks)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Create the `TaskSearch` component. A simple input field that updates the filter state.
- **Impacted entities**: None.
- **Impacted services/modules**: `src/features/task-management/components/TaskSearch.tsx`.
- **Impacted tests**: Component tests.

## 2) Scope
- **In scope**: 
  - Input field with "Search tasks..." placeholder.
  - Search icon (Lucide).
  - Clear "X" button when text is present.
  - `onChange` debouncing (optional but good for UX, though standard input is fine for local).
  - Controlled component pattern (`value`, `onChange`).
- **Out of scope**: 
  - Layout integration (T03).
  - URL state binding (T03 - or handled by parent). Scope says T02 deliverable: "Bind to URL state...". I'll push URL binding logic to T03 (Page integration) and keep this component pure (props driven).

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Write Tests (Red)**: `TaskSearch.test.tsx`.
2.  **Implement (Green)**: Create component.
3.  **Refactor**: Styles.

### 3.2 NFR hooks
- **Accessibility**: Label "Search tasks".

## 4) Atomic Task Breakdown

### Task 1: Component Implementation
- **Purpose**: UI.
- **Artifacts**: `src/features/task-management/components/TaskSearch.tsx`.
- **Test types**: Component Test.
- **BDD**: **Given** text "abc" **When** X clicked **Then** onClear called.

## 5) Verification Plan
- **Automated**: `npm run test`.
- **Manual**: Storybook/Mount.
