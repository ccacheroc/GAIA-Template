# QQ-TEACHER-004-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-004-BE-T01**  
**Related user story**: **QQ-TEACHER-004** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.1 — Antigravity Assistant, 2026-01-30  
**Traceability**: Satisfies Story QQ-TEACHER-004 (Reorder questions).

---

## 1) Context & Objective
- **Ticket summary**: Implement a batch update endpoint to change the sequence of questions within a quiz. This ensures that the frontend can save the state after a Drag and Drop operation in one atomic transaction.
- **Impacted entities/tables**: `questions`.
- **Impacted services/modules**: `backend/app/presentation/routers/quiz.py`, `backend/app/application/use_cases/question/reorder_questions.py`.
- **Impacted tests or business flows**: Draggable ordering BDD scenario.

## 2) Scope
- **In scope**:
    - `PATCH /quizzes/{id}/reorder` endpoint.
    - Transactional use case that updates `sequence` fields based on a list of `question_id`.
    - Safety checks: ensure all question IDs belong to the quiz and no duplicates/holes are introduced.
- **Out of scope**: UI integration.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Unit Test (Use Case)**: Fail if IDs don't match the quiz.
2. **Integration Test**: Verify `PATCH` updates 3 questions correctly in order.
3. **Implementation**: Use a single transaction with `SQLAlchemy`.

### 3.2 NFR hooks
- **Atomicity**: Failure to update one sequence must rollback all.
- **Security**: Strict BOLA on Quiz ID.

## 4) Atomic Task Breakdown

### Task 1: Reorder Use Case
- **Purpose**: Atomic sequence logic.
- **Artifacts impacted**: `backend/app/application/use_cases/question/reorder_questions.py`.
- **Test types**: Unit.

### Task 2: Router Integration
- **Purpose**: Expose PATCH endpoint.
- **Artifacts impacted**: `backend/app/presentation/routers/quiz.py`.
- **Test types**: Integration.

### Task 3: Documentation Update
- **Purpose**: Reflect the batch operation in the Component diagram.
- **Artifacts impacted**: `@/specs/ArchitecturalModel.md` (PlantUML Component).

# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Output the final file content directly.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion of the task, you MUST append a concise entry to @/specs/progress.md with the following format:
- **Date**: [2026-01-30]
- **Milestone**: Generated Implementation Plan QQ-TEACHER-004-BE-T01
- **Artifacts**: specs/features/quiz-management/plan_QQ-TEACHER-004-BE-T01.md
