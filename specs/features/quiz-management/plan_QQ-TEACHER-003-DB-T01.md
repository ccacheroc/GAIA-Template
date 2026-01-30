# QQ-TEACHER-003-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-003-DB-T01**  
**Related user story**: **QQ-TEACHER-003** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.1 — Antigravity Assistant, 2026-01-30  
**Traceability**: Provides database integrity for Story QQ-TEACHER-003 (Multiple Choice).

---

## 1) Context & Objective
- **Ticket summary**: Ensure data integrity for options at the database level. Add constraints to prevent more than one correct answer per question for single-choice types.
- **Impacted entities/tables**: `options`.
- **Impacted services/modules**: `backend/app/infrastructure/models/quiz.py`.
- **Impacted tests or business flows**: Foundation for Multiple Choice reliability.

## 2) Scope
- **In scope**:
    - Addition of partial index or check constraint (if DB supports it) to ensure only one `is_correct=True` per `question_id`.
    - Alembic migration.
- **Out of scope**: API Logic.
- **Assumptions**: Using PostgreSQL (supports partial indices).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Integration Test**: Create a test attempt to insert two correct options for one question and verify DB error.
2. **Migration**: Generate Alembic migration with `Index('ix_one_correct', 'question_id', postgres_where=(is_correct == True), unique=True)`.
3. **Verification**: Run migration and observe test pass.

### 3.2 NFR hooks
- **Security**: Data integrity is a security concern (prevents malformed quiz states).

## 4) Atomic Task Breakdown

### Task 1: Migration and Index
- **Purpose**: Enforce single correct answer at DB level.
- **Artifacts impacted**: `backend/alembic/versions/`.
- **Test types**: Integration.

### Task 2: Documentation Update
- **Purpose**: Document the constraint in the data model.
- **Artifacts impacted**: `@/specs/DataModel.md`. (Update Entity constraints).

# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Output the final file content directly.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion of the task, you MUST append a concise entry to @/specs/progress.md with the following format:
- **Date**: [2026-01-30]
- **Milestone**: Generated Implementation Plan QQ-TEACHER-003-DB-T01
- **Artifacts**: specs/features/quiz-management/plan_QQ-TEACHER-003-DB-T01.md
