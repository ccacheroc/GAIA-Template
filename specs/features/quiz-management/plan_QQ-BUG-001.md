# Plan: QQ-BUG-001 — Fix Quiz Creation Connectivity Error

## Problem Description
Frontend is unable to communicate with the Backend when creating a quiz.
- **Symptom**: `404 Not Found` on `OPTIONS /api/v1/quizzes` and `POST /api/v1/quizzes`.
- **Root Cause**: 
    1. Backend is missing the `/api/v1` prefix in its router inclusion.
    2. Backend is missing `CORSMiddleware` configuration, causing preflight (`OPTIONS`) failures.

## Proposed Fix
### Backend
1. Update `app/main.py` to include the quiz router under the `/api/v1` prefix.
2. Add `CORSMiddleware` to the FastAPI application to allow requests from `http://localhost:5188`.
3. (Optional) Verify if any other prefix is needed for other routers in the future.

### Frontend
1. Ensure `.env` is correctly pointing to `http://localhost:8005/api/v1`. (Already done in previous step, but will double check).

## Task Breakdown

### Task 1: Reproduction (Red)
- [ ] Run a `curl` or a small script to verify that `OPTIONS /api/v1/quizzes` returns 404 and lacks CORS headers.
- [ ] Run a `curl` to `POST /api/v1/quizzes` to verify 404.

### Task 2: Fix (Green)
- [ ] Modify `backend/app/main.py`:
    - Add `from fastapi.middleware.cors import CORSMiddleware`.
    - Configure CORS.
    - Change `app.include_router(quiz.router)` to `app.include_router(quiz.router, prefix="/api/v1")`.

### Task 3: Verification (Green)
- [ ] Run the reproduction script again to verify 200/201/204.
- [ ] Verify manually in the browser at `http://localhost:5188/quizzes/create`.

### Task 4: Documentation (Done)
- [ ] Update `tickets.md` to `[x] (2026-01-30)`.
- [ ] Add traceability comments to `backend/app/main.py`.
- [ ] Update `progress.md`.
