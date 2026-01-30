# QQ-TEACHER-005-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-005-FE-T03**  
**Related user story**: **QQ-TEACHER-005** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-005-FE-T03`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Create a "Preview" mode for teachers to test their quiz as a student would. This ensures the question flow, formatting, and options are correct before publishing.
- **Impacted entities/tables**: N/A.
- **Impacted services/modules**: `frontend/src/features/quiz-management/components/QuizPreview.tsx`.
- **Impacted tests or business flows**: Quality assurance for teachers.

## 2) Scope
- **In scope**: 
  - Read-only "Preview" view.
  - Interactive selection (without persisting to backend).
  - Feedback simulation (showing "Correct/Incorrect" after mock answer).
- **Out of scope**: Actual student integration (handled in "Game Session" feature).
- **Assumptions**: Uses the same question rendering logic as the student app will use.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Component test ensuring that in preview mode, clicking an answer doesn't call any "save" API.
2. **Minimal implementation**
   - Build the `QuizPreview` layout.
   - Reuse existing question components in "Read Only" / "Interaction Only" mode.
3. **Refactor**
   - Share as much code as possible with the student app questions.

### 3.2 NFR hooks
- **a11y**: Ensure the preview is as accessible as the final game.

## 4) Atomic Task Breakdown

### Task 1: Preview Layout & Toggle
- **Purpose**: Switch between edit and preview (QQ-TEACHER-005-FE-T03).
- **Artifacts impacted**: `frontend/src/features/quiz-management/pages/EditQuizPage.tsx`.
- **Test types**: Component.
- **BDD Acceptance**:
  - Given the editor
  - When I click "Vista Previa"
  - Then the editor forms are hidden and the preview simulation is shown.
