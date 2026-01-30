# QQ-TEACHER-001-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-001-BE-T02**  
**Related user story**: **QQ-TEACHER-001** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-001-BE-T02` and scenarios `Successfully defining quiz metadata` and `Title is mandatory`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Implement the REST API endpoints to manage quiz metadata. This includes creating a quiz, fetching its details, and updating its title/description, ensuring strict ownership validation.
- **Impacted entities/tables**: `quizzes`.
- **Impacted services/modules**: `presentation/routers/quiz_router.py`, `application/use_cases/quiz/`, `domain/repositories/quiz_repository.py`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-001` Gherkin scenarios for metadata creation and validation.

## 2) Scope
- **In scope**: 
  - API Routes: `POST /quizzes`, `GET /quizzes/{id}`, `PUT /quizzes/{id}`.
  - Pydantic models for request/response validation.
  - Use Case logic for CRUD operations.
  - BOLA (Broken Object Level Authorization) protection: verifying that only the creator can access/modify their quiz.
- **Out of scope**: Question management (handled in QQ-TEACHER-002).
- **Assumptions**: Auth middleware is available to provide the `current_user` (Teacher).
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - **Unit tests**: Use cases for create/update (mocking repository).
   - **Integration tests**: API endpoints using `TestClient`, checking 201 Created, 200 OK, 422 Unprocessable Entity (missing title), and 403 Forbidden (BOLA).
2. **Minimal implementation**
   - Define Pydantic schemas.
   - Implement empty Repository interface in `domain`.
   - Implement Use Cases.
   - Implement Repository implementation in `infrastructure`.
   - Mount router in `main.py`.
3. **Refactor**
   - Ensure clean separation between schema validation and business logic.

### 3.2 NFR hooks
- **Security**: Verify `current_user.id == quiz.teacher_id` for GET/PUT.
- **Performance**: P95 < 200ms for metadata retrieval.
- **Observability**: Log quiz creation events (info level).

## 4) Atomic Task Breakdown

### Task 1: DTOs & Repository Port
- **Purpose**: Define data contracts and the repository interface (QQ-TEACHER-001-BE-T02).
- **Artifacts impacted**: `backend/app/presentation/schemas/quiz.py`, `backend/app/domain/repositories/quiz_repository.py`.
- **Test types**: Unit (Schema validation).
- **BDD Acceptance**:
  - Given the `QuizCreate` schema
  - When a payload without `title` is received
  - Then Pydantic should raise a validation error (Scenario: Title is mandatory).

### Task 2: Use Cases Implementation
- **Purpose**: Implement business logic for creating and updating quizzes (QQ-TEACHER-001-BE-T02).
- **Artifacts impacted**: `backend/app/application/use_cases/quiz/create_quiz.py`, `backend/app/application/use_cases/quiz/get_quiz.py`, `backend/app/application/use_cases/quiz/update_quiz.py`.
- **Test types**: Unit (Use case logic).
- **BDD Acceptance**:
  - Given a teacher ID and valid data
  - When `CreateQuiz` use case is executed
  - Then it should return a consolidated Quiz entity.

### Task 3: API Router & Ownership Guards
- **Purpose**: Expose HTTP endpoints and enforce BOLA protection (QQ-TEACHER-001-BE-T02).
- **Artifacts impacted**: `backend/app/presentation/routers/quiz.py`.
- **Test types**: Integration (API Tests).
- **BDD Acceptance**:
  - Given Teacher A owns Quiz 1
  - When Teacher B tries to `GET /quizzes/1`
  - Then the API must return 403 Forbidden.

### Task 4: Update Architecture Docs
- **Purpose**: Document the new API surface and layer usage.
- **Artifacts impacted**: `@/.agent/rules/Arquitectura.md`.
- **Test types**: N/A.
