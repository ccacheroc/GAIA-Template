# AUTH-TEACHER-001-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-001-BE-T02**  
**Related user story**: **AUTH-TEACHER-001** (Teacher Registration)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-001-BE-T02`.

---

## 1) Context & Objective
- **Ticket summary**: Implement the Teacher Registration logic in the backend. This includes exposing an endpoint for signups, validating input, and securely hashing passwords before storage.
- **Impacted entities/tables**: `users`.
- **Impacted services/modules**: Presentation (Router), Application (UseCase), Infrastructure (Repository).
- **Impacted tests or business flows**: `Successful Registration`, `Duplicate Email Registration`.

## 2) Scope
- **In scope**: 
    - POST `/auth/register` endpoint.
    - Password hashing using Argon2id.
    - Email uniqueness validation at the business layer.
    - Pydantic models for request/response validation.
- **Out of scope**: 
    - Frontend implementation.
    - JWT token generation (reserved for login).
- **Assumptions**: 
    - Argon2id is available via a library like `passlib[argon2]`.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Red Tests**: Create a test for `RegisterTeacher` Use Case and a functional test for the API endpoint. Verify failure when email already exists.
2. **Minimal implementation**:
    - Implement `PasswordHasher` service.
    - Implement `UserRepository` with `get_by_email` and `create`.
    - Implement `RegisterTeacherUseCase`.
3. **Refactor**: Ensure clean separation between Domain and Infrastructure.

## 4) Atomic Task Breakdown

### Task 1: Security Setup — Password Hasher
- **Purpose**: Securely handle passwords (`AUTH-TEACHER-001-BE-T02`).
- **Artifacts impacted**: `backend/app/domain/services/security.py`.
- **Test types**: Unit.

### Task 2: Register Teacher Use Case
- **Purpose**: Business logic for account creation (`AUTH-TEACHER-001-BE-T02`, Scenario: `Successful Registration`).
- **Artifacts impacted**: `backend/app/application/use_cases/auth/register_teacher.py`.
- **BDD Acceptance**:
    - **Given** valid registration data
    - **When** the register action is executed
    - **Then** the password is hashed and the user is saved.

### Task 3: API Endpoint Implementaton
- **Purpose**: Expose registration to the world (`AUTH-TEACHER-001-BE-T02`).
- **Artifacts impacted**: `backend/app/presentation/routers/auth.py`, `backend/app/main.py`.
- **Test types**: Integration.
- **BDD Acceptance**:
    - **When** POSTing to `/api/v1/auth/register` with duplicate email
    - **Then** return 400 Bad Request with "Este correo electrónico ya está registrado."
