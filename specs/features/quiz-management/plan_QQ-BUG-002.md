# Plan: QQ-BUG-002 — Fix 405 Method Not Allowed on GET /quizzes

## Problem Description
Accessing `GET /api/v1/quizzes` returns `405 Method Not Allowed`.
- **Root Cause**: The route `GET /quizzes` is not defined in the `quiz.py` router. Only `POST`, `GET /{id}` and `PUT /{id}` are implemented.

## Proposed Fix
Implement the missing "List Quizzes" functionality.

### Backend
1. **Repository**: Add `list_by_teacher(teacher_id)` to `QuizRepository` protocol and `SQLAlchemyQuizRepository`.
2. **Use Case**: Create `ListQuizzes` use case.
3. **Router**: Add `@router.get("")` endpoint.

## Task Breakdown

### Task 1: Reproduction (Red)
- [ ] Run `curl -X GET http://localhost:8005/api/v1/quizzes` and verify it returns 405.

### Task 2: Implementation (Green)
- [ ] Update `backend/app/domain/repositories/quiz_repository.py` with `list_by_teacher`.
- [ ] Update `backend/app/infrastructure/repositories/quiz_repository.py` with implementation.
- [ ] Create `backend/app/application/use_cases/quiz/list_quizzes.py`.
- [ ] Update `backend/app/presentation/routers/quiz.py` to include the GET endpoint.

### Task 3: Verification (Green)
- [ ] Run `curl -X GET http://localhost:8005/api/v1/quizzes` and verify it returns 200 with a list.

### Task 4: Documentation (Done)
- [ ] Update `tickets.md` to `[x] (2026-01-30)`.
- [ ] Add traceability comments.
- [ ] Update `progress.md`.
