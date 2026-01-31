
# Plan: QQ-BUG-003 — Fix missing Edit access due to JWT sub/id mismatch

**Root Cause**: The backend JWT payload uses the `sub` key for the user ID, but the frontend `AuthContext` expects an `id` key in the decoded object. This results in `user.id` being `undefined`, which breaks ownership checks like `quiz.owner_id === user.id`.

## Task 1: Reproduction (Red)
- **Action**: Check current `AuthContext` behavior. Since it's a field parsing issue, a unit test for `AuthContext` or manually verifying the decoded object structure would confirm it.
- **Evidence**: `console.log(decoded)` in `AuthContext` shows no `id` field, but a `sub` field.

## Task 2: Fix (Green)
- **Action**: Update `AuthContext.tsx` to map `sub` to `id` during JWT decoding.
- **Traceability**: `// [Feature: User Authentication] [Story: AUTH-TEACHER-002] [Ticket: QQ-BUG-003]`

## Task 3: Regression Guard
- **Action**: Verify `QuizListPage` correctly shows "Editar Cuestionario" button for quizzes owned by the user.
- **Verification**: Run `npm run test` in frontend and check Playwright E2E tests (if they rely on real tokens, they might have been passing due to mocking, but real usage would fail).

## Task 4: Docs
- **Action**: Update `tickets.md` to `[x] (2026-02-01)`.
- **Status**: COMPLETED
