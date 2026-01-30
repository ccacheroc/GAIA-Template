# QQ-TEACHER-001-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-001-FE-T03**  
**Related user story**: **QQ-TEACHER-001** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-001-FE-T03` and scenarios `Successfully defining quiz metadata` and `Title is mandatory`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Build the user interface for initiating quiz creation and managing high-level metadata. Includes the form to set/edit the quiz title and description using valid BDD scenarios for success and validation errors.
- **Impacted entities/tables**: N/A (Frontend).
- **Impacted services/modules**: `frontend/src/features/quiz-management/`, `frontend/src/app/router/`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-001` UI scenarios for metadata management.

## 2) Scope
- **In scope**: 
  - Routing to Quiz Creation page.
  - Quiz Header Form using React Hook Form + Zod.
  - Integration with TanStack Query (mutations for create/update).
  - Validation feedback (Scenario: Title is mandatory).
  - Success/Error toast notifications.
- **Out of scope**: Question editor UI (handled in QQ-TEACHER-002-FE and beyond).
- **Assumptions**: A `Button` and `Input` component from shadcn/ui are available.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - **Component tests**: Render `QuizHeaderForm` and verify that submitting empty title shows error message.
   - **E2E tests**: Mock API response and verify that submitting valid data navigates to the next step or shows success message.
2. **Minimal implementation**
   - Define Zod schema for quiz metadata.
   - Create `QuizHeaderForm` component.
   - Create `useCreateQuiz` and `useUpdateQuiz` hooks.
   - Connect form to hooks.
3. **Refactor**
   - Extract form logic to a custom hook if it grows.
   - Ensure a11y (ARIA labels, keyboard focus).

### 3.2 NFR hooks
- **Accessibility**: Use `aria-invalid` and ensure labels are correctly linked to inputs.
- **Performance**: Optimistic updates for metadata edits.
- **i18n**: Use Spanish labels as per techstack rules.

## 4) Atomic Task Breakdown

### Task 1: Scaffolding and Zod Schema
- **Purpose**: Define the types and validation rules for the quiz metadata (QQ-TEACHER-001-FE-T03).
- **Artifacts impacted**: `frontend/src/features/quiz-management/types.ts`, `frontend/src/features/quiz-management/schema.ts`.
- **Test types**: Unit (Validation logic).
- **BDD Acceptance**:
  - Given the Zod schema
  - When an empty object is parsed
  - Then it should return an error for the `title` field.

### Task 2: Quiz Header Form Component
- **Purpose**: Build the visual form for title and description (QQ-TEACHER-001-FE-T03).
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/QuizHeaderForm.tsx`.
- **Test types**: Component (RTL).
- **BDD Acceptance**:
  - Given the form is displayed
  - When the user types a title and clicks "Save"
  - Then the `onSubmit` callback should be triggered with the form data.

### Task 3: API Integration Hooks
- **Purpose**: Connect the UI to the backend metadata endpoints (QQ-TEACHER-001-FE-T03).
- **Artifacts impacted**: `frontend/src/features/quiz-management/api/quizQueries.ts`.
- **Test types**: Integration (Mock Service Worker).
- **BDD Acceptance**:
  - Given the `useCreateQuiz` hook
  - When it successfully executes
  - Then it should invalidate the 'quizzes' query cache.

### Task 4: Page Routing & Navigation
- **Purpose**: Allow users to reach the creation page (QQ-TEACHER-001-FE-T03).
- **Artifacts impacted**: `frontend/src/features/quiz-management/pages/CreateQuizPage.tsx`, `frontend/src/app/router/index.tsx`.
- **Test types**: E2E (Playwright).
