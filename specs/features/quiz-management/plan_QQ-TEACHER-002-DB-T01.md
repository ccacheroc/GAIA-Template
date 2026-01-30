# QQ-TEACHER-002-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-002-DB-T01**  
**Related user story**: **QQ-TEACHER-002** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-002-DB-T01` and scenario `Adding a T/F question`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Define the database schema for questions and their associated options. This structure must be flexible enough to support polymorphic question types (TF, MULTIPLE_CHOICE) and maintain the pedagogical sequence.
- **Impacted entities/tables**: `questions`, `options`.
- **Impacted services/modules**: Infrastructure layer (SQLAlchemy models).
- **Impacted tests or business flows**: Enables persistence for question content and correct answer validation.

## 2) Scope
- **In scope**: 
  - `questions` table with `type` (ENUM), `content` (TEXT), and `sequence` (INT).
  - `options` table with `content` (TEXT) and `is_correct` (BOOLEAN).
  - Foreign keys: `questions.quiz_id` and `options.question_id`.
  - Cascading deletes (if a question is deleted, its options go too).
- **Out of scope**: Multiple Choice specific constraints (handled in QQ-TEACHER-003).
- **Assumptions**: Quizzes already exist in the DB.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Integration test to create a Question and link multiple Options.
   - Verify that deleting a Question removes its Options in the DB.
2. **Minimal implementation**
   - Create models in `backend/app/infrastructure/models/question.py` and `backend/app/infrastructure/models/option.py`.
   - Run Alembic migration.
3. **Refactor**
   - Ensure relationships between Quiz -> Questions -> Options are efficiently loaded.

### 3.2 NFR hooks
- **Performance**: Index `questions.quiz_id` and `questions.sequence` for fast ordered retrieval.
- **Security**: N/A (at DB level).

## 4) Atomic Task Breakdown

### Task 1: Define Questions & Options Models
- **Purpose**: Define question and option structures (QQ-TEACHER-002-DB-T01).
- **Artifacts impacted**: `backend/app/infrastructure/models/question.py`, `backend/app/infrastructure/models/option.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - Given the models are defined
  - Then a Question can have multiple Options.

### Task 2: Migration Script
- **Purpose**: Apply schema changes (QQ-TEACHER-002-DB-T01).
- **Artifacts impacted**: Alembic versions.
- **Test types**: Integration.

### Task 3: Update Model Documentation
- **Purpose**: Traceability in `ModeloDatos.md`.
- **Artifacts impacted**: `@/.agent/rules/ModeloDatos.md`.
