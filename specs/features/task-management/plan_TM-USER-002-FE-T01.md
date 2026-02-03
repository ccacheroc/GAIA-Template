# TM-USER-002-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-002-FE-T01**  
**Related user story**: **TM-USER-002** (Create New Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Extend the data layer to support task creation. This involves adding the `createTask` method to the repository and implementing Zod schema validation to ensure data integrity before persistence.
- **Impacted entities**: `Task`.
- **Impacted services/modules**: `src/features/task-management/api/storage.ts` (Repository), `src/features/task-management/schema.ts` (Validation).
- **Impacted tests**: Unit tests for repository and validation logic.

## 2) Scope
- **In scope**: 
  - `createTask(title: string)` method in `TaskRepository` & `LocalStorageAdapter`.
  - Zod schema `createTaskSchema` (min 1 char, max 100 chars, required).
  - Validation logic wrapping the repository call or pre-call.
  - XSS check (via auto-sanitization or explicit check if needed, though React handles display sanitization).
- **Out of scope**: 
  - UI Components (T02).
  - Hook/Mutation (T03).
- **Assumptions**: 
  - `zod` needs to be installed.

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Install Dependencies**: `npm install zod`.
2.  **Define Schema**: Create `schema.ts`.
3.  **Write Tests (Red)**: 
    - `LocalStorageTaskRepository.test.ts`: Test `createTask` persistence.
    - `schema.test.ts`: Test validation rules (empty string, too long).
4.  **Implement (Green)**: 
    - Update `TaskRepository` interface.
    - Implement `createTask` in `LocalStorageTaskRepository`.
    - Implement Zod schema.
5.  **Refactor**: Ensure IDs are generated (UUID or simple random for MVP).

### 3.2 NFR hooks
- **Security**: Validate input length to prevent storage abuse.
- **Data Integrity**: Ensure `createdAt` and `status='pending'` are set automatically on creation.

## 4) Atomic Task Breakdown

### Task 1: Validation Schema
- **Purpose**: Enforce constraints.
- **Artifacts**: `src/features/task-management/types/schema.ts`.
- **Test types**: Unit.
- **BDD**: **Given** invalid title **When** validated **Then** returns error.

### Task 2: Repository Update
- **Purpose**: Persistence logic.
- **Artifacts**: 
  - `src/features/task-management/api/TaskRepository.ts`
  - `src/features/task-management/api/LocalStorageTaskRepository.ts`
  - Testing: Update existing `LocalStorageTaskRepository.test.ts`.
- **Test types**: Unit.
- **BDD**: **Given** repository **When** createTask called **Then** new task appears in getAll.

## 5) Verification Plan
- **Automated**: `npm run test`.
- **Manual**: None (pure logic ticket).
