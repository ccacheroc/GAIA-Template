# TM-USER-003-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-003-FE-T03**  
**Related user story**: **TM-USER-003** (Complete/Uncomplete Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Implement the mutation logic to toggle task status and connect it to the UI. Ensure the UI updates instantly (optimistic update).
- **Impacted entities**: `Task`.
- **Impacted services/modules**: `src/features/task-management/hooks/useToggleTask.ts` (or part of `useTasks`), `TaskPage` integration.
- **Impacted tests**: Unit tests.

## 2) Scope
- **In scope**: 
  - `useToggleTask` mutation hook.
  - Optimistic update logic (updating cache before server response, though local storage is instant, this is good practice).
  - Integration with `TaskList` / `TaskItem` via `TaskPage`.
- **Out of scope**: 
  - Deletion.

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Define Hook**: `useToggleTask.ts`.
2.  **Write Tests (Red)**: Logic verification.
3.  **Implement (Green)**: `useMutation` calling `repo.updateTask`.
4.  **Integrate**: Pass handler to `TaskItem`.

### 3.2 NFR hooks
- **Performance**: Optimistic UI or fast invalidation.
- **Resilience**: Rollback on error (rare with local storage).

## 4) Atomic Task Breakdown

### Task 1: useToggleTask Hook
- **Purpose**: Mutation logic.
- **Artifacts**: `src/features/task-management/hooks/useToggleTask.ts`.
- **Test types**: Unit.
- **BDD**: **Given** task **When** toggle **Then** repo updated & UI reflects.

### Task 2: Integration
- **Purpose**: Connect UI.
- **Artifacts**: `src/features/task-management/pages/TaskPage.tsx` (passing props down) or `TaskList.tsx`.
- **Test types**: Manual/E2E.

## 5) Verification Plan
- **Automated**: `npm run test`.
- **Manual**: Click checkbox, referesh page -> persists.
