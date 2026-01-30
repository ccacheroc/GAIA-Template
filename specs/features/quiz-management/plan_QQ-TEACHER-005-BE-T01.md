# QQ-TEACHER-005-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-005-BE-T01**  
**Related user story**: **QQ-TEACHER-005** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.1 — Antigravity Assistant, 2026-01-30  
**Traceability**: Satisfies Scenario 1 (Successful Publish) and Scenario 2 (Preventing invalid publish) of Story QQ-TEACHER-005.

---

## 1) Context & Objective
- **Ticket summary**: Implement a publication service that validates a quiz's completeness (Title exists, >=1 question, all questions valid) before allowing a status change to `PUBLISHED`.
- **Impacted entities/tables**: `quizzes`.
- **Impacted services/modules**: `backend/app/application/use_cases/quiz/publish_quiz.py`.
- **Impacted tests or business flows**: `QQ-TEACHER-005` BDD scenarios.

## 2) Scope
- **In scope**:
    - `POST /quizzes/{id}/publish` endpoint.
    - `PublishQuiz` use case with comprehensive validation logic.
    - Error responses for specific validation failures (e.g., "Empty quiz").
- **Out of scope**: UI logic.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Unit Test (Validator)**: Verify it rejects quizzes with 0 questions.
2. **Unit Test (Validator)**: Verify it rejects quizzes with questions missing a correct answer.
3. **Integration Test**: Verify successful publish updates status to `PUBLISHED` and BOLA is respected.
4. **Implementation**: Build the service and use case.

### 3.2 NFR hooks
- **Resilience**: Ensure status change is atomic.
- **Security**: Strict check that only the owner can publish.

## 4) Atomic Task Breakdown

### Task 1: Validation Engine
- **Purpose**: Centralize publishing rules.
- **Artifacts impacted**: `backend/app/domain/services/quiz_validator.py`.
- **Test types**: Unit.

### Task 2: Publish Use Case & Router
- **Purpose**: Orcherstrate validation and status update.
- **Artifacts impacted**: `backend/app/application/use_cases/quiz/publish_quiz.py`, `backend/app/presentation/routers/quiz.py`.
- **Test types**: Unit | Integration.

### Task 3: Documentation Update
- **Purpose**: Reflect the status transition logic in the Architectural model.
- **Artifacts impacted**: `@/specs/ArchitecturalModel.md` (PlantUML Component).

# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Output the final file content directly.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion of the task, you MUST append a concise entry to @/specs/progress.md with the following format:
- **Date**: [2026-01-30]
- **Milestone**: Generated Implementation Plan QQ-TEACHER-005-BE-T01
- **Artifacts**: specs/features/quiz-management/plan_QQ-TEACHER-005-BE-T01.md
