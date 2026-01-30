# QQ-TEACHER-004-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-004-FE-T02**  
**Related user story**: **QQ-TEACHER-004** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-004-FE-T02` and scenario `Reordering via drag and drop`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Implement the drag-and-drop interface for reordering questions in the quiz editor. This provides an intuitive way for teachers to organize their assessment flow.
- **Impacted entities/tables**: N/A.
- **Impacted services/modules**: `frontend/src/features/quiz-management/components/QuestionList.tsx`.
- **Impacted tests or business flows**: Satisfies `QQ-TEACHER-004` UI scenario for reordering.

## 2) Scope
- **In scope**: 
  - Draggable wrappers for question cards.
  - Sorting logic using `@dnd-kit/core` and `@dnd-kit/sortable`.
  - Optimistic UI updates (the list moves instantly before the API call finishes).
  - Integration with `PATCH /quizzes/{id}/reorder`.
- **Out of scope**: Dragging options within a question (unless explicitly requested later).
- **Assumptions**: Question items have stable UUIDs to use as keys.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - E2E test using Playwright to drag the last item to the top and verify the new order.
2. **Minimal implementation**
   - Setup `DndContext` and `SortableContext`.
   - Wrap question items with `useSortable`.
   - Handle `onDragEnd` to update state and trigger mutation.
3. **Refactor**
   - Add visual transitions and drag handles.

### 3.2 NFR hooks
- **Performance**: Ensure smooth drag interactions (> 30 FPS).
- **Accessibility**: Provide keyboard shortcuts (e.g., Space to grab, Up/Down to move) as per WCAG.

## 4) Atomic Task Breakdown

### Task 1: DnD Infrastructure
- **Purpose**: Add sorting capabilities to the list (QQ-TEACHER-004-FE-T02).
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/QuestionList.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - Given 3 questions
  - When dragging the 3rd to position 1
  - Then the local state should update to [3, 1, 2].

### Task 2: Reorder Mutation Integration
- **Purpose**: Persist the new order in the backend (QQ-TEACHER-004-FE-T02).
- **Artifacts impacted**: `frontend/src/features/quiz-management/hooks/useReorderQuestions.ts`.
- **Test types**: Integration.
