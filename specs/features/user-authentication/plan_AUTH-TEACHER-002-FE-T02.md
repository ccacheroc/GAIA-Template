# AUTH-TEACHER-002-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-002-FE-T02**  
**Related user story**: **AUTH-TEACHER-002** (Teacher Login)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-002-FE-T02`.

---

## 1) Context & Objective
- **Ticket summary**: Implement the Teacher Login page and global authentication state management (AuthContext) in the frontend. Ensure sessions persist and users are redirected appropriately.
- **Impacted entities/tables**: N/A (Frontend).
- **Impacted services/modules**: UI (LoginPage), State (AuthContext), Navigation (Router).
- **Impacted tests or business flows**: `Successful Login` UI flow.

## 2) Scope
- **In scope**: 
    - `LoginPage.tsx` with email/password and brand styling.
    - `AuthContext` to store the token and user info.
    - Token persistence (localStorage or secure Cookies).
    - Auto-redirect to `/` (Quiz List) after login.
    - Displaying login errors in Spanish.
- **Out of scope**: 
    - Password recovery UI.
- **Assumptions**: 
    - `shadcn/ui` components for card and form layout.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Tests**: Create an integration test for `LoginPage` using MSW. Verify the token is saved in the store.
2. **Minimal implementation**: 
    - Scaffold `AuthContext`.
    - Build `LoginPage` using `Form` and `Input` components.
    - Implement the "Log in" action using a mutation.
3. **Refactor**: Ensure clean separation of concern between the Auth state and the components.

## 4) Atomic Task Breakdown

### Task 1: AuthContext & Provider
- **Purpose**: Manage global session state (`AUTH-TEACHER-002-FE-T02`).
- **Artifacts impacted**: `frontend/src/features/auth/context/AuthContext.tsx`.
- **Test types**: Unit.

### Task 2: Build Login Page
- **Purpose**: User entry point for authentication (`AUTH-TEACHER-002-FE-T02`, Scenario: `Successful Login`).
- **Brand Tokens**: 
    - Font: `Inter`. 
    - Heading: `text-[#3D405B]` (Navy).
- **Artifacts impacted**: `frontend/src/features/auth/pages/LoginPage.tsx`.
- **BDD Acceptance**:
    - **When** I log in with valid credentials
    - **Then** the `AuthContext` status changes to `authenticated`
    - **And** I am sent to the home page.

### Task 3: Token Interceptor Integration
- **Purpose**: Persist the session across reloads (`AUTH-TEACHER-002-FE-T02`).
- **Artifacts impacted**: `frontend/src/api/http.ts`, `frontend/src/main.tsx`.
- **Test types**: Integration.
- **BDD Acceptance**:
    - **Given** a stored token
    - **When** I refresh the page
    - **Then** I remain logged in.
