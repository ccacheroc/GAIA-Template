# User Authentication & Access Control — Implementation Tickets

## Feature Recap
This feature implements the identity layer for teachers. It provides registration, login, and secure ownership (BOLA protection) for quizzes. Students remain anonymous.

---

### Story: AUTH-TEACHER-001 — Teacher Registration
**Source**: `user-stories.md`
**Key Scenarios**: Successful Registration, Duplicate Email Registration.

#### Tickets for AUTH-TEACHER-001

1. - [x] (2026-01-31) **AUTH-TEACHER-001-DB-T01 — User Table & Migration**
   - **Type**: DB
   - **Description**: Create the persistence layer for teacher accounts.
   - **Scope**: `users` table with `id`, `name`, `email` (unique index), `password_hash`, and `created_at`.
   - **Dependencies**: None.
   - **Deliverables**: Alembic migration script.

2. - [x] (2026-01-31) **AUTH-TEACHER-001-BE-T02 — Teacher Signup API**
   - **Type**: BE
   - **Description**: Implement the business logic for creating new teacher accounts.
   - **Scope**: POST `/auth/register` endpoint, Argon2id password hashing, email uniqueness validation.
   - **Dependencies**: AUTH-TEACHER-001-DB-T01.
   - **Deliverables**: Signup UseCase, API Router, and Integration Tests.

3. - [x] (2026-01-31) **AUTH-TEACHER-001-FE-T03 — Signup Page Implementation**
   - **Type**: FE
   - **Description**: Create the user interface for teacher registration.
   - **Scope**: Reusable form components, Zod validation, Spanish translations, redirect to login.
   - **Dependencies**: AUTH-TEACHER-001-BE-T02.
   - **Deliverables**: `SignupPage.tsx`, Zod schema, and E2E test.

---

### Story: AUTH-TEACHER-002 — Teacher Login
**Source**: `user-stories.md`
**Key Scenarios**: Successful Login, Invalid Credentials.

#### Tickets for AUTH-TEACHER-002

1. - [x] (2026-01-31) **AUTH-TEACHER-002-BE-T01 — Authentication API (JWT)**
   - **Type**: BE
   - **Description**: Implement login logic and session token generation.
   - **Scope**: POST `/auth/login` endpoint, password verification, JWT issuance (short-lived).
   - **Dependencies**: AUTH-TEACHER-001-DB-T01.
   - **Deliverables**: Login UseCase, JWT helper, and API tests.

2. - [x] (2026-01-31) **AUTH-TEACHER-002-FE-T02 — Login Page & Auth State**
   - **Type**: FE
   - **Description**: Frontend login flow and session management.
   - **Scope**: `LoginPage.tsx`, `AuthContext` for global session state, secure token storage (HttpOnly cookie simulation or memory).
   - **Dependencies**: AUTH-TEACHER-002-BE-T01.
   - **Deliverables**: Login UI and Auth provider.

---

### Story: AUTH-TEACHER-003 — Resource Ownership (BOLA)
**Source**: `user-stories.md`
**Key Scenarios**: Unauthorized Edit Attempt, Student Access.

#### Tickets for AUTH-TEACHER-003

1. - [ ] **AUTH-TEACHER-003-DB-T01 — Quiz Ownership Migration**
   - **Type**: DB
   - **Description**: Link quizzes to their respective creators.
   - **Scope**: Add `owner_id` (FK to `users`) to the `quizzes` table. Update existing records if any.
   - **Dependencies**: AUTH-TEACHER-001-DB-T01.
   - **Deliverables**: Alembic migration script.

2. - [ ] **AUTH-TEACHER-003-BE-T02 — Auth Security Middleware & BOLA Check**
   - **Type**: BE
   - **Description**: Protect endpoints and enforce resource-level access control.
   - **Scope**: Backend middleware to validate JWT, ownership validator for all `/quizzes/{id}` operations.
   - **Dependencies**: AUTH-TEACHER-003-DB-T01, AUTH-TEACHER-002-BE-T01.
   - **Deliverables**: Auth middleware and Ownership decorator/service.

3. - [ ] **AUTH-TEACHER-003-FE-T03 — Secure API Client & Navigation Guard**
   - **Type**: FE
   - **Description**: Ensure all frontend requests are authenticated and routes are protected.
   - **Scope**: Axios/Http interceptor for tokens, Private Route wrapper for teacher dashboard.
   - **Dependencies**: AUTH-TEACHER-002-FE-T02.
   - **Deliverables**: Updated HTTP client and Protected routes.

---

### Story: AUTH-TEACHER-004 — Database Seeding
**Source**: `user-stories.md`
**Key Scenarios**: Seed Execution.

#### Tickets for AUTH-TEACHER-004

1. - [ ] **AUTH-TEACHER-004-OTH-T01 — Test Environment Seeding**
   - **Type**: OTH
   - **Description**: Populate the database with test teachers and quizzes for verification.
   - **Scope**: Create `profe.test1` and `profe.test2` with predefined quizzes as per specifications.
   - **Dependencies**: AUTH-TEACHER-003-DB-T01.
   - **Deliverables**: Seed script (Python).
