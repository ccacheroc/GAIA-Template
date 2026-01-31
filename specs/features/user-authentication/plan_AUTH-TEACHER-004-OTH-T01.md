# AUTH-TEACHER-004-OTH-T01 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-004-OTH-T01**  
**Related user story**: **AUTH-TEACHER-004** (Database Seeding)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-004-OTH-T01`.

---

## 1) Context & Objective
- **Ticket summary**: Populate the test environment with realistic data. Create two teacher accounts and associate them with specific quizzes to verify the ownership and data isolation logic.
- **Impacted entities/tables**: `users`, `quizzes`, `questions`, `options`.
- **Impacted services/modules**: Infrastructure (Seeding scripts).
- **Impacted tests or business flows**: Verification of Multi-tenancy.

## 2) Scope
- **In scope**: 
    - Creating a Python script to seed the database.
    - User 1: `profe.test1@gaia.edu` with 1 quiz.
    - User 2: `profe.test2@gaia.edu` with 1 quiz.
    - Passwords must be hashed correctly using the same service as the BE.
- **Out of scope**: 
    - Production data migration.
- **Assumptions**: 
    - The backend environment (Docker) is ready to run the script.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define Tests**: Create a smoke test that counts the number of users and quizzes after the seed run.
2. **Minimal implementation**: 
    - Create `backend/scripts/seed_auth.py`.
    - Use SQLAlchemy sessions to insert records.
3. **Refactor**: Ensure the script is idempotent (can be run multiple times without duplicates).

## 4) Atomic Task Breakdown

### Task 1: Create Seed Script logic
- **Purpose**: Automate environment readiness (`AUTH-TEACHER-004-OTH-T01`, Scenario: `Seed Execution`).
- **Artifacts impacted**: `backend/scripts/seed_auth.py`.
- **BDD Acceptance**:
    - **When** the seed script is executed
    - **Then** `profe.test1@gaia.edu` exists in the `users` table
    - **And** they own at least one quiz.

### Task 2: Integration with Make/Docker
- **Purpose**: Easy execution for engineers (`AUTH-TEACHER-004-OTH-T01`).
- **Artifacts impacted**: `backend/app/main.py` (if using an init hook) or a dedicated CLI command.
- **Test types**: Integration.
