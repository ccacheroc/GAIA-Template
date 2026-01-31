# Implementation Plan - Publish Quiz UI

Ticket: QQ-TEACHER-005-FE-T01
Feature: Quiz Management
Story: QQ-TEACHER-005 - Publish Quiz

## Objective
Enable teachers to publish a quiz from the Quiz Editor page, providing visual feedback on success or validation errors.

## Proposed Changes

### Frontend

1. **API Hook (`quizQueries.ts`)**
   - Implement `usePublishQuiz` mutation hook calling `POST /quizzes/{id}/publish`.
   - Invalidate `['quiz', id]` and `['quizzes']` on success.

2. **Component (`QuizEditorPage.tsx`)**
   - Add "Publish" button to the header (top right).
   - Button should be disabled if no questions or title (basic client-side check) or if loading.
   - On click, trigger `usePublishQuiz`.
   - On error, display toast with validation message (e.g., "Must have at least one correct answer").
   - On success, show success toast and update UI (e.g. redirect to list or show "Published" badge).

3. **Status Indicator**
   - Display current status (DRAFT/PUBLISHED) in the editor header.
   - If PUBLISHED, maybe make the editor read-only? (Specification doesn't strictly say read-only, but it implies "Ready for students". Usually published quizzes shouldn't be edited structurally without unpublishing, but for now we focus on the transition).

## Verification Plan

### Automated Tests
- **E2E Test**: `tests/e2e/specs/publish-quiz.spec.ts`
  - Create quiz with 1 question.
  - Click Publish.
  - Verify success toast and status change.
  - Create invalid quiz (no questions).
  - Click Publish.
  - Verify error toast.

### Manual Verification
- Open Quiz Editor.
- Try publishing empty quiz -> Error.
- Add question -> Publish -> Success.
