# TM-USER-002-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-002-FE-T03**  
**Related user story**: **TM-USER-002** (Create New Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Integrate the `createTask` logic with React Query mutations to enable the UI to create tasks and have the list update automatically (invalidation or optimistic update). Verify performance latency.
- **Impacted entities**: `Task` (creation).
- **Impacted services/modules**: `src/features/task-management/hooks/useCreateTask.ts`, `src/features/task-management/pages/TaskPage.tsx` (integration).
- **Impacted tests**: Unit tests for hook.

## 2) Scope
- **In scope**: 
  - `useCreateTask` hook (using `useMutation`).
  - `onSuccess` logic: Invalidate `tasks` query (or 'tasks' key).
  - Integration: Connect `TaskInput` prop `onSave` to this mutation in the `TaskPage` or `TaskList` container.
- **Out of scope**: 
  - Complex optimistic updates (UI update before server) - nice to have but Invalidation is fast enough for local storage (simplicity first).
- **Assumptions**: 
  - `useTasks` (from TM-USER-001) uses the key `['tasks']`.

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Define Hook**: Create `useCreateTask.ts` shell.
2.  **Write Tests (Red)**: Test hook calls repository and invalidates query client.
3.  **Implement (Green)**: Use `useMutation` calling `TaskRepository.createTask`.
4.  **Integrate**: Update `TaskPage` to render `TaskInput` and pass the mutation handler.

### 3.2 NFR hooks
- **Performance**: Ensure perceived latency < 100ms. LocalStorage is instant, so React update cycle is the main delay.
- **Resilience**: Handle error in mutation (show toast?).

## 4) Atomic Task Breakdown

### Task 1: useCreateTask Hook
- **Purpose**: Mutation logic.
- **Artifacts**: `src/features/task-management/hooks/useCreateTask.ts`.
- **Test types**: Unit (Wrapper).
- **BDD**: **Given** valid title **When** mutate **Then** repository called & cache invalidated.

### Task 2: Page Integration
- **Purpose**: Connect UI to Logic.
- **Artifacts**: `src/features/task-management/pages/TaskPage.tsx`.
- **Test types**: Manual / E2E.

## 5) Verification Plan
- **Automated**: `npm run test` (Hooks).
- **Manual**: Open App, type "Test Task", hit Enter. Task should appear in list immediately.
