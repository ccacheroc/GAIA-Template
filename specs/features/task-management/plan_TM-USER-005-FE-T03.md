# TM-USER-005-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-005-FE-T03**  
**Related user story**: **TM-USER-005** (Search Tasks)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Integrate the Search component into the Page layout and bind it to the URL query parameter for shareable/refreshable state.
- **Impacted entities**: None.
- **Impacted services/modules**: `src/features/task-management/pages/TaskPage.tsx`.
- **Impacted tests**: E2E.

## 2) Scope
- **In scope**: 
  - URL State: `?q=searchterm`. Using `useSearchParams`.
  - Pass search term to `useTasks` hook.
  - Layout placement (Top bar or above list).
  - Empty results state ("No tasks match 'xyz'").
- **Out of scope**: 
  - Advanced filtering.

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Write Test (Red)**: E2E `tasks-search.spec.ts`.
2.  **Implement (Green)**: 
    - Add `useSearchParams` in `TaskPage`.
    - Pass query to `TaskSearch` (value) and `useTasks` (filter).
    - Handle empty state in `TaskList` or `TaskPage` conditional.
3.  **Refactor**: Clean up layout.

### 3.2 NFR hooks
- **UX**: Persist search on reload.

## 4) Atomic Task Breakdown

### Task 1: URL Binding
- **Purpose**: State management.
- **Artifacts**: `src/features/task-management/pages/TaskPage.tsx`.
- **Test types**: Manual/E2E.

### Task 2: Empty Results State
- **Purpose**: Feedback.
- **Artifacts**: `src/features/task-management/components/TaskList.tsx` (update).
- **Test types**: Component Test.

## 5) Verification Plan
- **Automated**: `npx playwright test`.
- **Manual**: Search "Buy", reload page, list still filtered.
