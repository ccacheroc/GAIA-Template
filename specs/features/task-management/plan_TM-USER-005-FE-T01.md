# TM-USER-005-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-005-FE-T01**  
**Related user story**: **TM-USER-005** (Search Tasks)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Implement the logic to filter tasks by title. Since the data set is small (local), filtering can be efficient on the client side.
- **Impacted entities**: `Task`.
- **Impacted services/modules**: `src/features/task-management/hooks/useTasks.ts` (selector/filter).
- **Impacted tests**: Unit tests.

## 2) Scope
- **In scope**: 
  - Update `useTasks` to accept a `search` parameter or return raw data to be filtered by consumer.
  - *Decision*: Pass filter to `useTasks` hook to keep logic encapsulated.
  - Case-insensitive matching.
  - Handling empty search string (return all).
- **Out of scope**: 
  - UI Component (T02).
  - Advanced filters (status, date).

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Write Tests (Red)**: Update `useTasks.test.tsx` (or new logic test `filter.test.ts`) to check filtering logic.
2.  **Implement (Green)**: Add `search` param to `useTasks` (or create selector function).
3.  **Refactor**: Optimize if needed.

### 3.2 NFR hooks
- **Performance**: Filter array operation is negligible < 1000 items.

## 4) Atomic Task Breakdown

### Task 1: Filter Logic
- **Purpose**: Core logic.
- **Artifacts**: `src/features/task-management/utils/filter.ts` (optional) or `hooks/useTasks.ts`.
- **Test types**: Unit.
- **BDD**: **Given** tasks ["Milk", "Eggs"] **When** search "egg" **Then** return ["Eggs"].

## 5) Verification Plan
- **Automated**: `npm run test`.
