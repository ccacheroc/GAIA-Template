# QQ-TEACHER-004-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-004-FE-T02**  
**Related user story**: **QQ-TEACHER-004** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.1 — Antigravity Assistant, 2026-01-30  
**Traceability**: This plan implements Scenario 1 (DND) of Story QQ-TEACHER-004.

---

## 1) Context & Objective
- **Ticket summary**: Implement visual drag-and-drop reordering for the list of questions in the quiz editor. This involves integrating a DnD library and synchronizing the UI state with the backend via optimistic updates.
- **Impacted entities/tables**: N/A (Frontend).
- **Impacted services/modules**: `frontend/src/features/quiz-management/components/QuestionList.tsx`.
- **Impacted tests or business flows**: `QQ-TEACHER-004` BDD scenario.

## 2) Scope
- **In scope**:
    - Integration of `@dnd-kit/core` or `@dnd-kit/sortable`.
    - Draggable wrapper for Question cards.
    - Optimistic update logic in React Query `useReorderQuestions`.
    - Visual drag handles and drop indicators.
- **Out of scope**: Individual question internal reordering.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Unit Test (Utility)**: Verify sequence calculation after moving array items.
2. **E2E Test (Playwright)**: Simulate drag operation and verify network request to `PATCH /quizzes/{id}/reorder`.
3. **Implementation**: Build the DnD wrapper.

### 3.2 NFR hooks
- **UX**: Smooth animations (layout transition).
- **a11y**: Support keyboard-based reordering (Tab + Arrows) as per DnD-kit accessibility features.

## 4) Atomic Task Breakdown

### Task 1: DND Integration
- **Purpose**: Allow visual sorting.
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/QuestionList.tsx`.
- **Test types**: Unit | E2E.

### Task 2: Optimistic Mutation Hook
- **Purpose**: Fast UI feedback.
- **Artifacts impacted**: `frontend/src/features/quiz-management/api/questionQueries.ts`.
- **Test types**: Integration (MSW).

### Task 3: Documentation Update
- **Purpose**: Reference visual interaction components in Architectural diagram.
- **Artifacts impacted**: `@/specs/ArchitecturalModel.md` (PlantUML Component).

# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Output the final file content directly.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion of the task, you MUST append a concise entry to @/specs/progress.md with the following format:
- **Date**: [2026-01-30]
- **Milestone**: Generated Implementation Plan QQ-TEACHER-004-FE-T02
- **Artifacts**: specs/features/quiz-management/plan_QQ-TEACHER-004-FE-T02.md
