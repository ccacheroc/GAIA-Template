# TM-USER-004-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-004-FE-T01**  
**Related user story**: **TM-USER-004** (Delete Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Implement the logic to delete tasks. This requires updating the repository interface and implementation, and adding a `useDeleteTask` mutation.
- **Impacted entities**: `Task`.
- **Impacted services/modules**: `src/features/task-management/api/storage.ts` (Repo), `hooks`.
- **Impacted tests**: Unit tests.

## 2) Scope
- **In scope**: 
  - `deleteTask(id)` in Repository.
  - `useDeleteTask` mutation hook.
  - Soft-delete consideration: Ticket says "Soft Delete flag in DB ticket T01 is better... Let's implement Soft Delete in T01 if possible".
  - *Decision*: Since T02 (DB) is already implemented *without* soft delete (hard delete was implemented), I will stick to **Hard Delete** for MVP simplicity unless I want to refactor T02. The ticket says "Let's implement Soft Delete in T01 if possible". Since T02 is executed, adding soft delete now is a schema change.
  - *Refined Plan*: I will implement **Hard Delete** as per standard MVP practices and simplicity, unless "Undo" requirement strictly demands Soft Delete. "Undo" can be done by re-creating the task if we have the data.
  - Implementation: Hard delete in repo. Undo logic (in T02) will handle restoration via `createTask`.

- **Out of scope**: 
  - UI (T02).
  - Toast Loop (T02).

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Write Tests (Red)**: `LocalStorageTaskRepository.test.ts` already has delete tests! (Checked in T02 verification).
    - So Repo task is done? "UseDeleteTask" hook is needed.
    - I should create `useDeleteTask.ts` and test it.
2.  **Implement (Green)**: Create `useDeleteTask` hook using `useMutation` and `repo.deleteTask`.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Resilience**: Optimistic update or fast invalidation.

## 4) Atomic Task Breakdown

### Task 1: useDeleteTask Hook
- **Purpose**: API.
- **Artifacts**: `src/features/task-management/hooks/useDeleteTask.ts`.
- **Test types**: Unit.
- **BDD**: **Given** task **When** delete **Then** removed from list.

## 5) Verification Plan
- **Automated**: `npm run test`.
