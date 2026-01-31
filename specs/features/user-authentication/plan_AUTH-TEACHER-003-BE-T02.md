# AUTH-TEACHER-003-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-003-BE-T02**  
**Related user story**: **AUTH-TEACHER-003** (Resource Ownership)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-003-BE-T02`.

---

## 1) Context & Objective
- **Ticket summary**: Implement the authorization layer to prevent "Broken Object Level Authorization" (BOLA). Ensure teachers can only access their own quizzes and that public routes remain strictly limited.
- **Impacted entities/tables**: `users`, `quizzes`.
- **Impacted services/modules**: Core (Dependencies), Application (All Quiz Use Cases).
- **Impacted tests or business flows**: `Unauthorized Edit Attempt`, `Student Access`.

## 2) Scope
- **In scope**: 
    - `get_current_user` FastAPI dependency for JWT validation.
    - `OwnershipService` or logic within Use Cases to verify `quiz.owner_id == user.id`.
    - Blocking write/delete requests if the owner doesn't match.
    - Ensuring public endpoints (PIN-based) don't require Teacher auth but are restricted in scope.
- **Out of scope**: 
    - Frontend protection (FE ticket).
- **Assumptions**: 
    - Use Cases will be updated to receive `current_user_id`.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Red Tests**: Create an integration test where Teacher A tries to DELETE a quiz owned by Teacher B. Expect `403 Forbidden`.
2. **Minimal implementation**: 
    - Create `get_current_user` dependency in `backend/app/core/deps.py`.
    - Inject `current_user` into `UpdateQuiz` and `DeleteQuiz` use cases.
    - Add the ownership check logic.
3. **Refactor**: Abstract ownership check into a reusable utility.

## 4) Atomic Task Breakdown

### Task 1: Auth Dependency (get_current_user)
- **Purpose**: Validate JWT and extract user context (`AUTH-TEACHER-003-BE-T02`).
- **Artifacts impacted**: `backend/app/core/deps.py`.
- **Test types**: Unit.

### Task 2: Implement Ownership Logic
- **Purpose**: Enforce BOLA protection (`AUTH-TEACHER-003-BE-T02`, Scenario: `Unauthorized Edit Attempt`).
- **Artifacts impacted**: `backend/app/application/use_cases/quiz/update_quiz.py`, `backend/app/application/use_cases/quiz/delete_quiz.py`.
- **BDD Acceptance**:
    - **Given** Teacher A is logged in
    - **When** attempting to update Quiz B (owner: Teacher B)
    - **Then** the application raises an `UnauthorizedException` (which translates to HTTP 403).

### Task 3: Secure Quiz Router
- **Purpose**: Link endpoints to security logic (`AUTH-TEACHER-003-BE-T02`).
- **Artifacts impacted**: `backend/app/presentation/routers/quiz.py`.
- **Test types**: Integration.
