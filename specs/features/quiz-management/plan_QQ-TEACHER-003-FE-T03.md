# QQ-TEACHER-003-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-003-FE-T03**  
**Related user story**: **QQ-TEACHER-003** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-003-FE-T03` and scenarios for Multiple Choice UI.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Develop the dynamic UI component for Multiple Choice questions. It must allow teachers to add/remove options (within the 2-6 limit), enter text for each, and select one correct answer.
- **Impacted entities/tables**: N/A.
- **Impacted services/modules**: `frontend/src/features/quiz-management/components/MCQuestionEditor.tsx`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-003` UI scenarios.

## 2) Scope
- **In scope**: 
  - Dynamic list of input fields for options.
  - Controls to add/remove options.
  - Radio button selection for correct answer.
  - Zod validation for option count and non-empty text.
- **Out of scope**: Drag and drop of options (unless standard input reordering is required).
- **Assumptions**: Using `useFieldArray` from `react-hook-form` to manage options.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Component test checking that "Add Option" disappears or disables at 6 options.
   - Verify that and "Remove" is disabled at 2 options.
2. **Minimal implementation**
   - Implement the `MCQuestionEditor` using `useFieldArray`.
   - Connect radio buttons to the `isCorrect` boolean in the array.
3. **Refactor**
   - Polishing UI spacing and focus management.

### 3.2 NFR hooks
- **Accessibility**: Ensure each input has a descriptive label for screen readers (e.g., "Opción 1", "Opción 2").

## 4) Atomic Task Breakdown

### Task 1: MC Editor with useFieldArray
- **Purpose**: Manage dynamic options (QQ-TEACHER-003-FE-T03).
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/MCQuestionEditor.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - Given 4 options
  - When clicking "Eliminar" on one
  - Then the list should reduce to 3.

### Task 2: Correct Answer Radio Integration
- **Purpose**: Allow marking the right choice (QQ-TEACHER-003-FE-T03).
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/MCQuestionEditor.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - Given 3 options
  - When selecting the 2nd one as correct
  - Then it should update the form state accordingly.
