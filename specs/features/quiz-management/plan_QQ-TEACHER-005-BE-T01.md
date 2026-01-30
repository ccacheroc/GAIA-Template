# QQ-TEACHER-005-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-005-BE-T01**  
**Related user story**: **QQ-TEACHER-005** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-005-BE-T01` and scenario `Publishing a valid quiz`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Implement the final validation and publishing logic for quizzes. This service ensures that a quiz is pedogogically complete (has title, questions, and valid answers) before allowing it to be used in live sessions.
- **Impacted entities/tables**: `quizzes`, `questions`, `options`.
- **Impacted services/modules**: `application/use_cases/quiz/publish_quiz.py`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-005` Gherkin scenarios for publication.

## 2) Scope
- **In scope**: 
  - `POST /quizzes/{id}/publish` endpoint.
  - Deep validation service: 
    - Quiz must have a Title.
    - Quiz must have at least 1 Question.
    - Each Question must have the required number of options.
    - Each Question must have exactly 1 correct answer.
  - Status transition: DRAFT -> PUBLISHED.
- **Out of scope**: Versioning (Phase 2).
- **Assumptions**: Published quizzes become read-only for certain structural properties.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Integration tests: Attempt to publish an empty quiz (fail), attempt to publish a quiz with a question missing a correct answer (fail), attempt to publish a valid quiz (success).
2. **Minimal implementation**
   - Create `PublishQuiz` use case.
   - Implement the `ValidationService`.
3. **Refactor**
   - Centralize business error codes for better frontend handling.

### 3.2 NFR hooks
- **Security**: Ownership check.
- **Resilience**: Ensure state remains consistent if validation fails.

## 4) Atomic Task Breakdown

### Task 1: Quiz Validation Service
- **Purpose**: Deep check of quiz completeness (QQ-TEACHER-005-BE-T01).
- **Artifacts impacted**: `backend/app/domain/services/quiz_validation_service.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - Given a quiz without questions
  - When validated for publishing
  - Then it should return "A quiz must have at least one question".

### Task 2: Publish Use Case
- **Purpose**: Update quiz status (QQ-TEACHER-005-BE-T01).
- **Artifacts impacted**: `backend/app/application/use_cases/quiz/publish_quiz.py`.
- **Test types**: Integration.
- **BDD Acceptance**:
  - Given a valid quiz draft
  - When published
  - Then its status in DB should be "PUBLISHED".
