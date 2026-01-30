# QQ-TEACHER-003-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-003-BE-T02**  
**Related user story**: **QQ-TEACHER-003** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-003-BE-T02` and scenarios related to dynamic option management.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Implement the backend logic for Multiple Choice questions. This includes handling a variable number of options (2 to 6) and ensuring only one correct answer is selected.
- **Impacted entities/tables**: `questions`, `options`.
- **Impacted services/modules**: `application/use_cases/question/create_mc_question.py`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-003` Gherkin scenarios for Multiple Choice content.

## 2) Scope
- **In scope**: 
  - `POST /quizzes/{id}/questions` for 'MULTIPLE_CHOICE' type.
  - Validation: 2 <= options count <= 6.
  - Validation: exactly one option must be marked `is_correct`.
  - Atomicity: Question and its options are created in a single transaction.
- **Out of scope**: UI drag and drop (handled in T04).
- **Assumptions**: Question metadata (content) is passed in the same request.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Unit tests for the MC creation use case.
   - Integration tests with valid (4 options) and invalid (1 or 7 options) payloads.
2. **Minimal implementation**
   - Implement `CreateMultipleChoiceQuestion` use case.
   - Attach to the existing quiz router.
3. **Refactor**
   - Generalize option validation across question types.

### 3.2 NFR hooks
- **Observability**: Log question type distribution for analytics.

## 4) Atomic Task Breakdown

### Task 1: MC Question Use Case
- **Purpose**: Implement the specific behavior for Multiple Choice (QQ-TEACHER-003-BE-T02).
- **Artifacts impacted**: `backend/app/application/use_cases/question/create_mc_question.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - Given an MC payload with 4 options
  - When the use case runs
  - Then it should successfully persist all 4 options.

### Task 2: Option Validation Logic
- **Purpose**: Enforce the 2-6 limit and single-correct rule (QQ-TEACHER-003-BE-T02).
- **Artifacts impacted**: `backend/app/domain/validators/question_validator.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - Given an MC payload with 2 correct answers
  - When validated
  - Then it should return "Only one correct answer is allowed".
