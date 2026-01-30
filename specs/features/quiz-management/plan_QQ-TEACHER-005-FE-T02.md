# QQ-TEACHER-005-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-005-FE-T02**  
**Related user story**: **QQ-TEACHER-005** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-005-FE-T02` and scenarios for publishing workflow.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Implement the "Publish" action in the quiz editor. This includes the confirmation dialog, display of validation errors returned by the API, and success feedback.
- **Impacted entities/tables**: N/A.
- **Impacted services/modules**: `frontend/src/features/quiz-management/components/PublishButton.tsx`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-005` UI scenarios for publication.

## 2) Scope
- **In scope**: 
  - "Publish" button with loading state.
  - Confirmation dialog.
  - Handling of 422/400 validation error responses and displaying them to the user.
  - Redirecting or updating UI state after successful publication.
- **Out of scope**: Preview mode (T03).
- **Assumptions**: shadcn `AlertDialog` is used for confirmation.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Component test for button states (idle, loading, success).
   - Mock error response and verify error alert display.
2. **Minimal implementation**
   - Create `PublishButton` component.
   - Use `useMutation` with `onError` handling.
3. **Refactor**
   - Polishing accessibility and focus traps for the dialog.

### 3.2 NFR hooks
- **Observability**: Track "Publish" attempts and successes/failures.

## 4) Atomic Task Breakdown

### Task 1: Publish Button & Mutation
- **Purpose**: Action to trigger publication (QQ-TEACHER-005-FE-T02).
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/PublishButton.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - Given the Publish button
  - When clicked and confirmed
  - Then the backend `publish` endpoint is called.

### Task 2: Validation Error Display
- **Purpose**: Show why a quiz cannot be published (QQ-TEACHER-005-FE-T02).
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/ValidationErrorDisplay.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - Given a 422 error "Missing questions"
  - Then a clear alert message "A quiz must have at least one question" is shown.
