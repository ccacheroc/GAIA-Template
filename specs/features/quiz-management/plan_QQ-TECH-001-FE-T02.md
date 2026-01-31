# QQ-TECH-001-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TECH-001-FE-T02**  
**Related user story**: **QQ-TECH-001**  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `QQ-TECH-001-FE-T02`.

---

## 1) Context & Objective
- **Ticket summary**: Refactor all components in the `quiz-management` feature to use brand-compliant tokens and translate all user-facing text to Spanish.
- **Impacted files**: 
    - `frontend/src/features/quiz-management/pages/CreateQuizPage.tsx`
    - `frontend/src/features/quiz-management/pages/QuizEditorPage.tsx`
    - `frontend/src/features/quiz-management/components/QuizHeaderForm.tsx`
    - `frontend/src/features/quiz-management/components/PublishButton.tsx`
    - `frontend/src/features/quiz-management/components/QuizPreview.tsx`
- **Impacted tests**: E2E tests will need to look for Spanish text.

## 2) Scope
- **In scope**: 
    - Translating all labels and buttons.
    - Applying `primary` (Terracotta AA) to main buttons.
    - Applying `secondary` or `outline` to secondary actions.
    - Ensuring 8pt grid (spacing multiples of 4/8).
- **Out of scope**: Navigation logic (covered in T03).
- **Assumptions**: Components rely on Tailwind classes derived from the CSS variables updated in T01.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Verification**: Run the app and check each screen for English text.
2. **Visual Check**: Ensure buttons use the new Terracotta color.

### 3.2 Brand & Visuals (FE)
- **Buttons**:
    - Guardar/Continuar: `bg-primary text-primary-foreground`
    - Cancelar/Volver: `variant="outline"` or `variant="ghost"`
- **Typography**: Verify `text-4xl`, `text-lg` usage matches guidelines.
- **Microcopy**: Use actionable Spanish verbs ("Guardar", "Publicar", "Añadir").

## 4) Atomic Task Breakdown

### Task 1: Refactor CreateQuizPage
- **Artifacts impacted**: `frontend/src/features/quiz-management/pages/CreateQuizPage.tsx`.
- **Changes**: Translate title and description.

### Task 2: Refactor QuizHeaderForm
- **Artifacts impacted**: `frontend/src/features/quiz-management/components/QuizHeaderForm.tsx`.
- **Changes**: Translate labels, placeholders, and toasts.

### Task 3: Refactor QuizEditorPage
- **Artifacts impacted**: `frontend/src/features/quiz-management/pages/QuizEditorPage.tsx`.
- **Changes**: Translate buttons, status badges, and titles.

### Task 4: Refactor PublishButton & Preview
- **Artifacts impacted**: 
    - `frontend/src/features/quiz-management/components/PublishButton.tsx`
    - `frontend/src/features/quiz-management/components/QuizPreview.tsx`
- **Changes**: Complete translation and styling.
