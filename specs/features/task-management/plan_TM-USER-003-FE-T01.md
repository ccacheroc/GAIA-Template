# TM-USER-003-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-003-FE-T01**  
**Related user story**: **TM-USER-003** (Complete/Uncomplete Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Extend the data layer to support updating a task's status (toggling between 'pending' and 'completed').
- **Impacted entities**: `Task` (status field).
- **Impacted services/modules**: `src/features/task-management/api/storage.ts`.
- **Impacted tests**: Unit tests for repository.

## 2) Scope
- **In scope**: 
  - `updateTask(id, updates: Partial<Task>)` method in `TaskRepository` & implementation.
  - Ensuring `updatedAt` is modified.
  - Test coverage for status toggling.
- **Out of scope**: 
  - UI Components (T02).
  - Hook/Mutation (T03).

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Write Tests (Red)**: Add test case to `LocalStorageTaskRepository.test.ts` for `updateTask` ensuring status change and persistence.
2.  **Implement (Green)**: Add `updateTask` method to `LocalStorageTaskRepository`.
3.  **Refactor**: Clean up any shared logic for finding tasks.

### 3.2 NFR hooks
- **Resilience**: Handle non-existent ID gracefully (throw error or return null/false). Decision: Throw error for explicit failure in mutation.

## 4) Atomic Task Breakdown

### Task 1: Repository Logic
- **Purpose**: Persistence logic.
- **Artifacts**: 
  - `src/features/task-management/api/TaskRepository.ts`
  - `src/features/task-management/api/LocalStorageTaskRepository.ts`
  - `src/features/task-management/api/__tests__/LocalStorageTaskRepository.test.ts`
- **Test types**: Unit.
- **BDD**: **Given** task exists **When** update status called **Then** data is updated.

## 5) Verification Plan
- **Automated**: `npm run test` (Repository tests).
- **Manual**: None.
