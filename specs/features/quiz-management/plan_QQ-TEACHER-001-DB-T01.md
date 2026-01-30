# QQ-TEACHER-001-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-001-DB-T01**  
**Related user story**: **QQ-TEACHER-001** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-001-DB-T01` and support the persistence for scenario `Successfully defining quiz metadata`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Create the foundational database table for Quizzes. This table stores high-level metadata such as title, description, and the publishing status, linked to the teacher who created it.
- **Impacted entities/tables**: `quizzes` (New).
- **Impacted services/modules**: Infrastructure layer (SQLAlchemy models).
- **Impacted tests or business flows**: Enables persistence for all quiz-related stories, specifically the "Successfully defining quiz metadata" scenario.

## 2) Scope
- **In scope**: 
  - `quizzes` table creation with UUID primary key.
  - Foreign key to `users` table.
  - Title (Mandatory) and Description (Optional) fields.
  - Status enum (DRAFT, PUBLISHED).
  - Audit timestamps (created_at, updated_at).
- **Out of scope**: Question/Option tables (handled in T02).
- **Assumptions**: A `users` table already exists with a UUID primary key.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Create an integration test that attempts to insert a record into the `quizzes` table and validates constraints (e.g., trying to insert without a title should fail).
2. **Minimal implementation**
   - Create the SQLAlchemy model in `backend/app/infrastructure/models/quiz.py`.
   - Generate and run the Alembic migration.
3. **Refactor**
   - Ensure the model adheres to the hexagonal architecture patterns defined in `techstack-backend.md`.

### 3.2 NFR hooks
- **Security/Privacy**: Ensure `teacher_id` is indexed for efficient owner-based lookups (BOLA mitigation at the DB level).
- **Observability**: Migration logging.

## 4) Atomic Task Breakdown

### Task 1: Define Quiz SQLAlchemy Model
- **Purpose**: Define the structure of the `quizzes` table in the ORM (QQ-TEACHER-001-DB-T01).
- **Artifacts impacted**: `backend/app/infrastructure/models/quiz.py`.
- **Test types**: Unit (model definition).
- **BDD Acceptance**:
  - Given the `Quiz` model is defined
  - When I attempt to create an instance without a title
  - Then SQLAlchemy should raise a validation/integrity error.

### Task 2: Create and Execute Alembic Migration
- **Purpose**: Materialize the `quizzes` table in the PostgreSQL database (QQ-TEACHER-001-DB-T01).
- **Artifacts impacted**: `backend/alembic/versions/[timestamp]_create_quizzes_table.py`.
- **Test types**: Integration (schema validation).
- **BDD Acceptance**:
  - Given the migration is applied
  - When I check the database schema
  - Then the `quizzes` table should exist with all specified columns and constraints.

### Task 3: Update System Metadata
- **Purpose**: Reflect the new schema in the project's documentation (Traceability).
- **Artifacts impacted**: `@/.agent/rules/ModeloDatos.md`.
- **Test types**: N/A.
- **BDD Acceptance**:
  - Given the `quizzes` table is created
  - Then `ModeloDatos.md` should include the new table and its relationships.
