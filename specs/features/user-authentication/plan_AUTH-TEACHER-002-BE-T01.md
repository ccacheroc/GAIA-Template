# AUTH-TEACHER-002-BE-T01 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-002-BE-T01**  
**Related user story**: **AUTH-TEACHER-002** (Teacher Login)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-002-BE-T01`.

---

## 1) Context & Objective
- **Ticket summary**: Implement the Teacher Login logic and JWT session management. Verify credentials and issue tokens for authenticated sessions.
- **Impacted entities/tables**: `users`.
- **Impacted services/modules**: Presentation (Router), Application (UseCase), Core (Security/JWT).
- **Impacted tests or business flows**: `Successful Login`, `Invalid Credentials`.

## 2) Scope
- **In scope**: 
    - POST `/auth/login` endpoint.
    - Password verification against Argon2id hash.
    - JWT generation (HS256 with secret from env).
    - Session expiration configuration.
- **Out of scope**: 
    - MFA or Password reset.
    - Token revocation list.
- **Assumptions**: 
    - `PyJWT` or `python-jose` will be used for token handling.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Red Tests**: Create test cases for valid login (returns token) and invalid login (returns 401/403).
2. **Minimal implementation**: 
    - Implement `verify_password` in Security service.
    - Implement `create_access_token` helper.
    - Implement `AuthenticateTeacherUseCase`.
3. **Refactor**: Ensure JWT secret handling is centralized in `core/config.py`.

## 4) Atomic Task Breakdown

### Task 1: JWT Helper Logic
- **Purpose**: Unified token creation token (`AUTH-TEACHER-002-BE-T01`).
- **Artifacts impacted**: `backend/app/core/security.py`.
- **Test types**: Unit.

### Task 2: Login Use Case
- **Purpose**: Verify identity (`AUTH-TEACHER-002-BE-T01`, Scenario: `Successful Login`).
- **Artifacts impacted**: `backend/app/application/use_cases/auth/login_teacher.py`.
- **BDD Acceptance**:
    - **Given** registered credentials
    - **When** authenticating
    - **Then** a JSON response with `access_token` and `token_type: bearer` is returned.

### Task 3: Login API Route
- **Purpose**: Expose login flow (`AUTH-TEACHER-002-BE-T01`).
- **Artifacts impacted**: `backend/app/presentation/routers/auth.py`.
- **Test types**: Integration.
- **BDD Acceptance**:
    - **When** POSTing incorrect password
    - **Then** return 401 Unauthorized with generic message "Correo o contraseña incorrectos."
