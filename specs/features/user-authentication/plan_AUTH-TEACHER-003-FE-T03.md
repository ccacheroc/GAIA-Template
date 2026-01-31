# AUTH-TEACHER-003-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-003-FE-T03**  
**Related user story**: **AUTH-TEACHER-003** (Resource Ownership)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-003-FE-T03`.

---

## 1) Context & Objective
- **Ticket summary**: Implement navigation guards and API interceptors to secure the frontend. Prevent teachers from seeing content they don't own and ensure students cannot access management screens.
- **Impacted entities/tables**: N/A (Frontend).
- **Impacted services/modules**: Networking (Axios Interceptors), UI (ProtectedRoute), Navigation (Router).
- **Impacted tests or business flows**: `Student Access` UI restriction.

## 2) Scope
- **In scope**: 
    - `ProtectedRoute.tsx` component to wrap restricted routes.
    - Axios/HTTP interceptor to add `Authorization: Bearer <token>` header to all requests.
    - Automatic logout on 401 response (session expired).
    - Hiding "Edit" or "Delete" actions in the UI if the current user is not the owner (defensive UI).
- **Out of scope**: 
    - Backend security (BE ticket).
- **Assumptions**: 
    - JWT is stored in `AuthContext` and accessible.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Tests**: Create a test for `ProtectedRoute`. Verify it redirects to `/login` if no user is authenticated.
2. **Minimal implementation**: 
    - Wrap routes in `router/index.tsx` with `<ProtectedRoute>`.
    - Update `frontend/src/api/http.ts` to use a request interceptor.
3. **Refactor**: Ensure the "Back" links still work correctly after redirection.

## 4) Atomic Task Breakdown

### Task 1: API Request Interceptor
- **Purpose**: Automate token attachment (`AUTH-TEACHER-003-FE-T03`).
- **Artifacts impacted**: `frontend/src/api/http.ts`.
- **Test types**: Integration.

### Task 2: Protected Route Wrapper
- **Purpose**: Guard management pages (`AUTH-TEACHER-003-FE-T03`, Scenario: `Student Access`).
- **Artifacts impacted**: `frontend/src/features/auth/components/ProtectedRoute.tsx`, `frontend/src/app/router/index.tsx`.
- **BDD Acceptance**:
    - **Given** I am not logged in
    - **When** I attempt to access `/quizzes/create`
    - **Then** I am redirected to `/login`.

### Task 3: Defensive UI - Ownership check
- **Purpose**: Wow factor & UX polish (`AUTH-TEACHER-003-FE-T03`).
- **Brand Rules**: Maintain clean layout; only show actions relevant to the user's role.
- **Artifacts impacted**: `frontend/src/features/quiz-management/pages/QuizListPage.tsx`.
