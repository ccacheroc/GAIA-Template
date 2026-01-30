# QQ-TEACHER-002-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-002-BE-T02**  
**Related user story**: **QQ-TEACHER-002** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-002-BE-T02` and scenarios `Adding a T/F question` and `Correct answer selection is mandatory`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Implement the business logic to add True/False questions to a quiz. This includes ensuring that exactly two options are created ("True" and "False") and one is designated as correct.
- **Impacted entities/tables**: `questions`, `options`.
- **Impacted services/modules**: `presentation/routers/question_router.py`, `application/use_cases/question/create_tf_question.py`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-002` Gherkin scenarios for T/F question creation.

## 2) Scope
- **In scope**: 
  - `POST /quizzes/{id}/questions` endpoint for 'TF' type.
  - Automatic creation of "True" and "False" options.
  - Validation: exactly one correct answer.
  - Sequence management (append to end of list).
- **Out of scope**: Multiple Choice logic (T03).
- **Assumptions**: Quiz BOLA is already handled or reusable.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - **Unit tests**: Use case logic for TF creation.
   - **Integration tests**: Verify that sending a 'TF' question with one answer marked correct successfully creates a question with 2 options.
2. **Minimal implementation**
   - Create router and use case.
   - Implement "correct answer selection is mandatory" validation.
3. **Refactor**
   - DRY common question creation logic.

### 3.2 NFR hooks
- **Security**: Ownership check on the target Quiz.

## 4) Atomic Task Breakdown

### Task 1: TF Logic & Use Case
- **Purpose**: Implement the specific behavior for True/False questions (QQ-TEACHER-002-BE-T02).
- **Artifacts impacted**: `backend/app/application/use_cases/question/create_tf_question.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - Given a TF question payload
  - When the use case runs
  - Then it should create a question with sequence N+1 and 2 associated options.

### Task 2: Question Router Expansion
- **Purpose**: Expose the endpoint to the frontend (QQ-TEACHER-002-BE-T02).
- **Artifacts impacted**: `backend/app/presentation/routers/quiz.py`.
- **Test types**: Integration.
- **BDD Acceptance**:
  - Given an authenticated teacher
  - When they `POST` a valid TF question to their quiz
  - Then they get a 201 Created response.
