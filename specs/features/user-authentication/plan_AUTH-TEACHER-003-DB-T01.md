# AUTH-TEACHER-003-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-003-DB-T01**  
**Related user story**: **AUTH-TEACHER-003** (Resource Ownership)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-003-DB-T01`.

---

## 1) Context & Objective
- **Ticket summary**: Establish the database link between quizzes and their creators (teachers). This enables multi-tenancy and data isolation.
- **Impacted entities/tables**: `quizzes`.
- **Impacted services/modules**: Infrastructure (SQLAlchemy model).
- **Impacted tests or business flows**: All authenticated teacher flows.

## 2) Scope
- **In scope**: 
    - Adding `owner_id` (UUID) column to `quizzes` table.
    - Defining Foreign Key constraint to `users.id`.
    - Automated Alembic migration for the schema change.
- **Out of scope**: 
    - Enforcement logic in the API (reserved for BE ticket).
- **Assumptions**: 
    - Existing quizzes (if any) will need a default owner or be cleared (acceptable for dev stage).
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Tests**: Create a test verifying that the `Quiz` model has an `owner_id` attribute and correctly points to a `User`.
2. **Minimal implementation**: 
    - Update `backend/app/infrastructure/models/quiz.py`.
    - Run `alembic revision --autogenerate`.
3. **Refactor**: Ensure relationships are properly named in SQLAlchemy.

## 4) Atomic Task Breakdown

### Task 1: Update Quiz Model
- **Purpose**: Add ownership field (`AUTH-TEACHER-003-DB-T01`).
- **Artifacts impacted**: `backend/app/infrastructure/models/quiz.py`.
- **BDD Acceptance**:
    - **When** a new quiz is created
    - **Then** it must be possible to associate it with a `User` ID via `owner_id`.

### Task 2: Migration Generation
- **Purpose**: Sync DB structure (`AUTH-TEACHER-003-DB-T01`).
- **Artifacts impacted**: `backend/alembic/versions/*.py`.
- **Test types**: Integration.

### Task 3: Documentation Update
- **Artifacts impacted**: `@/specs/DataModel.md`.
- **Purpose**: Verify Mermaid diagram reflects the relationship.
