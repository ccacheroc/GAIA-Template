# AUTH-TEACHER-001-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-001-FE-T03**  
**Related user story**: **AUTH-TEACHER-001** (Teacher Registration)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-001-FE-T03`.

---

## 1) Context & Objective
- **Ticket summary**: Implement the Teacher Registration user interface. Provide a secure and brand-aligned form for teachers to create their accounts.
- **Impacted entities/tables**: N/A (Frontend).
- **Impacted services/modules**: UI (SignupPage), Navigation (Router).
- **Impacted tests or business flows**: `Successful Registration` UI flow.

## 2) Scope
- **In scope**: 
    - `SignupPage.tsx` with name, email, and password fields.
    - Zod validation for inputs.
    - Spanish translations for all labels and errors.
    - Integration with Registration API (POST `/auth/register`).
    - Redirection to `/login` after success.
- **Out of scope**: 
    - Login page implementation (separate ticket).
- **Assumptions**: 
    - Layout components (`AuthLayout` or similar) can be reused if they exist.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Tests**: Create a component test for `SignupForm`. Verify validation messages in Spanish.
2. **Minimal implementation**: 
    - Create the UI using `shadcn/ui` components (Inter font, Navy/Terracotta colors).
    - Link to the API using a React Query mutation.
3. **Refactor**: Abstract form logic into a reusable pattern if needed.

## 4) Atomic Task Breakdown

### Task 1: Create Signup Schema & Page
- **Purpose**: Define validation and UI structure (`AUTH-TEACHER-001-FE-T03`).
- **Brand Tokens**: 
    - Font: `Inter`. 
    - Primary Button: `bg-[#E07A5F]` (Terracotta).
- **Artifacts impacted**: `frontend/src/features/auth/pages/SignupPage.tsx`, `frontend/src/features/auth/schemas/signupSchema.ts`.
- **BDD Acceptance**:
    - **When** I leave the fields empty
    - **Then** I should see "El correo es obligatorio" and "La contraseña es obligatoria" in Spanish.

### Task 2: API Hook & Integration
- **Purpose**: Connect UI to Backend (`AUTH-TEACHER-001-FE-T03`).
- **Artifacts impacted**: `frontend/src/features/auth/api/authQueries.ts`.
- **Test types**: Integration (MSW).

### Task 3: Route Registration & Navigation
- **Purpose**: Make the page reachable (`AUTH-TEACHER-001-FE-T03`).
- **Entry point**: Link from Login page (once created) or direct URL `/auth/register`.
- **Exit point**: Redirect to `/auth/login`.
- **Artifacts impacted**: `frontend/src/app/router/index.tsx`.
