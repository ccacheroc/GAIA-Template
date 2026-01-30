# QQ-TEACHER-004-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-004-BE-T01**  
**Related user story**: **QQ-TEACHER-004** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-004-BE-T01` and scenario `Reordering via drag and drop`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Implement a batch update endpoint to reorder questions within a quiz. This ensures the pedagogical sequence is preserved and updated atomically in a single transaction.
- **Impacted entities/tables**: `questions`.
- **Impacted services/modules**: `application/use_cases/question/reorder_questions.py`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-004` Gherkin scenario for sequence updates.

## 2) Scope
- **In scope**: 
  - `PATCH /quizzes/{id}/reorder` endpoint.
  - Payload: list of `{question_id, sequence}`.
  - Validation: ensure all IDs belong to the specified quiz and current user.
  - Performance: efficient batch updates using SQLAlchemy.
- **Out of scope**: Visual DnD (handled in FE).
- **Assumptions**: The frontend sends the complete list or at least all affected questions.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Integration test with 3 questions. Send a new order and verify DB values.
   - Verify that trying to update a question that doesn't belong to the quiz returns 422/403.
2. **Minimal implementation**
   - Implement the use case using a transaction to ensure all-or-nothing updates.
3. **Refactor**
   - Optimize query to minimize DB roundtrips.

### 3.2 NFR hooks
- **Resilience**: Transactional integrity is mandatory.

## 4) Atomic Task Breakdown

### Task 1: Reorder Use Case & Repository
- **Purpose**: Atomic sequence updates (QQ-TEACHER-004-BE-T01).
- **Artifacts impacted**: `backend/app/application/use_cases/question/reorder_questions.py`.
- **Test types**: Unit / Integration.
- **BDD Acceptance**:
  - Given 3 questions in order 1, 2, 3
  - When reordered to 3, 1, 2
  - Then the DB should reflect the new sequences.

### Task 2: Patch Endpoint Integration
- **Purpose**: Expose reordering to the web client (QQ-TEACHER-004-BE-T01).
- **Artifacts impacted**: `backend/app/presentation/routers/quiz.py`.
- **Test types**: Integration.
