# QQ-TEACHER-002-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-002-DB-T01**  
**Related user story**: **QQ-TEACHER-002** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.1 — Antigravity Assistant, 2026-01-30  
**Traceability**: This plan satisfies the data storage requirements for Story QQ-TEACHER-002 (T/F Questions) and provides the foundation for QQ-TEACHER-003 (Multiple Choice).

---

## 1) Context & Objective
- **Ticket summary**: Create the database schema to support questions and their options. This includes a polymorphic `type` for questions to accommodate both True/False and Multiple Choice.
- **Impacted entities/tables**: `questions`, `options`.
- **Impacted services/modules**: `backend/app/infrastructure/models/`.
- **Impacted tests or business flows**: Foundation for all question-related BDD scenarios.

## 2) Scope
- **In scope**:
    - Creation of `questions` table with `id`, `quiz_id`, `type`, `content`, and `sequence`.
    - Creation of `options` table with `id`, `question_id`, `content`, and `is_correct`.
    - Relationship configuration (Cascade deletes).
    - Alembic migration.
- **Out of scope**: API endpoints, UI components.
- **Assumptions**: We are using SQLAlchemy 2.0+ with Mapped/mapped_column.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define Models**: Create/Update SQLAlchemy models.
2. **Integration Test**: Create a test in `backend/tests/integration/test_question_persistence.py` that attempts to save a Quiz with Questions and Options.
3. **Migration**: Generate and run Alembic migration.
4. **Verification**: Verify the tables exist in PostgreSQL.

### 3.2 NFR hooks
- **Security**: Cascade deletes to ensure no orphaned questions/options.
- **Performance**: Index on `quiz_id` and `question_id`.

## 4) Atomic Task Breakdown

### Task 1: Create Question and Option Models
- **Purpose**: Define the structure in code.
- **Artifacts impacted**: `backend/app/infrastructure/models/quiz.py` (or new files in `models/`).
- **Test types**: Unit.
- **BDD Acceptance**: `Given` I have a Quiz, `When` I try to add a Question, `Then` it should be valid in the ORM.

### Task 2: Generate and Run Migration
- **Purpose**: Update the actual database schema.
- **Prerequisites**: Models defined.
- **Artifacts impacted**: `backend/alembic/versions/`.
- **Verification**: `docker exec gaia-pruebacris-db psql -d app_db -c "\dt"`

### Task 3: Update Architectural and Data Model Docs
- **Purpose**: Keep documentation in sync.
- **Artifacts impacted**: `@/specs/DataModel.md`, `@/specs/ArchitecturalModel.md`.
- **Task**: 
    - Add `QUESTIONS` and `OPTIONS` to the Mermaid ER diagram in `DataModel.md`.
    - Update the Component diagram in `ArchitecturalModel.md` (PlantUML) if relevant.

# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Output the final file content directly.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion of the task, you MUST append a concise entry to @/specs/progress.md with the following format:
- **Date**: [2026-01-30]
- **Milestone**: Generated Implementation Plan QQ-TEACHER-002-DB-T01
- **Artifacts**: specs/features/quiz-management/plan_QQ-TEACHER-002-DB-T01.md
