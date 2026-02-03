# TM-USER-002-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-002-FE-T02**  
**Related user story**: **TM-USER-002** (Create New Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Implement the `TaskInput` component. It must provide a user-friendly interface for adding tasks, including validation feedback and accessibility features.
- **Impacted entities**: None (UI only).
- **Impacted services/modules**: `src/features/task-management/components/TaskInput.tsx`.
- **Impacted tests**: Component tests.

## 2) Scope
- **In scope**: 
  - Input field with placeholder "What needs to be done?".
  - "Add" button.
  - Integration with Zod schema for client-side validation (immediate or on blur).
  - Error state styling (red border/text).
  - Keyboard accessibility (Enter to submit).
  - Loading state (disabled while submitting - prop controlled).
- **Out of scope**: 
  - API Mutation (T03).
  - Layout placement (handled in Page or List container integration).
- **Assumptions**: 
  - Using `shadcn/ui` Input and Button components (or `lucide-react` icons).

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Write Tests (Red)**: `TaskInput.test.tsx` checking for input rendering, error on empty submit, and `onSave` callback firing on valid submit.
2.  **Implement (Green)**: Create `TaskInput.tsx`.
3.  **Refactor**: Polish styles using Tailwind.

### 3.2 NFR hooks
- **Accessibility**: Input must have `aria-label` or label. Button needs `aria-label` if icon-only.
- **UX**: Auto-focus (maybe, optional). clear input after successful add.

## 4) Atomic Task Breakdown

### Task 1: Component Implementation
- **Purpose**: UI implementation.
- **Artifacts**: `src/features/task-management/components/TaskInput.tsx`.
- **Test types**: Component Test.
- **BDD**: 
  - **Given** empty input **When** Enter pressed **Then** show error.
  - **Given** "Buy Milk" **When** button clicked **Then** call onSave("Buy Milk").

## 5) Verification Plan
- **Automated**: `npm run test` (Vitest + RTL).
- **Manual**: Mount in a temporary Storybook or Page to check visuals (hover states, focus ring).
