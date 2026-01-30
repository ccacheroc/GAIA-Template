# QQ-TEACHER-002-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-002-BE-T02**  
**Related user story**: **QQ-TEACHER-002** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.1 — Antigravity Assistant, 2026-01-30  
**Traceability**: Satisfies Scenario 1 (Adding T/F question) and Scenario 2 (Mandatory correct answer) of Story QQ-TEACHER-002.

---

## 1) Context & Objective
- **Ticket summary**: Implement the backend logic to add True/False questions to an existing quiz. This includes schema validation to ensure exactly 2 options are provided and one is correct.
- **Impacted entities/tables**: `questions`, `options`.
- **Impacted services/modules**: `backend/app/presentation/routers/quiz.py`, `backend/app/application/use_cases/question/`.
- **Impacted tests or business flows**: `QQ-TEACHER-002` BDD scenarios.

## 2) Scope
- **In scope**:
    - `POST /quizzes/{id}/questions` endpoint.
    - `QuestionCreate` and `OptionCreate` DTOs.
    - Use case `AddQuestion` with TF-specific validation.
    - Ownership validation (BOLA check on Quiz).
- **Out of scope**: Multiple choice handling (will be T03), UI.
- **Assumptions**: The DB schema from T01 is already applied.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Unit Test (Schema)**: Validate `QuestionCreate` for TF type (exactly 2 options).
2. **Unit Test (Use Case)**: Verify `AddQuestion` correctly calculates the next `sequence` and saves options.
3. **Integration Test**: Verify `POST /quizzes/{id}/questions` creates the question and supports BOLA.
4. **Implementation**: Fill the use case and router handler.

### 3.2 NFR hooks
- **Security**: Double-check BOLA (Teacher A cannot add question to Teacher B's quiz).
- **Data Integrity**: Enforce exactly one correct answer for TF.

## 4) Atomic Task Breakdown

### Task 1: DTOs and Logic
- **Purpose**: Define input/output structures.
- **Artifacts impacted**: `backend/app/presentation/schemas/question.py`.
- **Test types**: Unit.

### Task 2: Use Case and Repository
- **Purpose**: Business logic and persistence.
- **Artifacts impacted**: `backend/app/application/use_cases/question/add_question.py`, `backend/app/domain/repositories/question_repository.py`.
- **Test types**: Unit.

### Task 3: API Endpoint
- **Purpose**: Expose the functionality.
- **Artifacts impacted**: `backend/app/presentation/routers/quiz.py`.
- **Test types**: Integration.

### Task 4: Documentation Update
- **Purpose**: Update architectural diagrams if the new use case changes the interaction profile.
- **Artifacts impacted**: `@/specs/ArchitecturalModel.md` (Update Component diagram in PlantUML).

# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Output the final file content directly.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion of the task, you MUST append a concise entry to @/specs/progress.md with the following format:
- **Date**: [2026-01-30]
- **Milestone**: Generated Implementation Plan QQ-TEACHER-002-BE-T02
- **Artifacts**: specs/features/quiz-management/plan_QQ-TEACHER-002-BE-T02.md
