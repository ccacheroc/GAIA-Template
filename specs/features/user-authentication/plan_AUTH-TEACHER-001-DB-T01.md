# AUTH-TEACHER-001-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/user-authentication/tickets.md` → **AUTH-TEACHER-001-DB-T01**  
**Related user story**: **AUTH-TEACHER-001** (Teacher Registration)  
**Plan version**: v1.0 — (Antigravity, 2026-01-31)  
**Traceability**: All tasks must include inline references to `AUTH-TEACHER-001-DB-T01`.

---

## 1) Context & Objective
- **Ticket summary**: Enable the persistence layer for teacher accounts by defining the `User` table and generating the corresponding database migration. This is the foundation for authentication.
- **Impacted entities/tables**: `users` (New/Updated).
- **Impacted services/modules**: Infrastructure layer (SQLAlchemy models).
- **Impacted tests or business flows**: `Successful Registration` scenario.

## 2) Scope
- **In scope**: 
    - Extending `backend/app/infrastructure/models/user.py` with necessary fields.
    - Creating an Alembic migration script for the `users` table.
    - Ensuring indexing on `email` for fast lookups and uniqueness.
- **Out of scope**: 
    - Implementing the registration API (Signup BE ticket).
    - Implementing password hashing logic (Signup BE ticket).
- **Assumptions**: 
    - Database container is running and healthy.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)
### 3.1 Test-first sequencing
1. **Define tests**: Create an integration test to verify the `users` table schema can be successfully instantiated and saved to the DB.
2. **Minimal implementation**: 
    - Add `password_hash` and `created_at` fields to the `User` model.
    - Run `alembic revision --autogenerate` to create the migration.
3. **Refactor**: Ensure naming conventions match `specs/DataModel.md`.

## 4) Atomic Task Breakdown

### Task 1: Update User SQLAlchemy Model
- **Purpose**: Add persistence fields for authentication (`AUTH-TEACHER-001-DB-T01`).
- **Prerequisites**: Verify `docker compose ps` shows `gaia-pruebacris-db` as healthy.
- **Artifacts impacted**: `backend/app/infrastructure/models/user.py`.
- **Test types**: Unit | Integration.
- **BDD Acceptance**:
    - **Given** a new teacher account is defined
    - **When** the model is instantiated
    - **Then** it must support `id`, `email`, `full_name`, `password_hash`, and `created_at`.

### Task 2: Generate Alembic Migration
- **Purpose**: Sync the database schema with the new model.
- **Prerequisites**: Environment healthy.
- **Artifacts impacted**: `backend/alembic/versions/*.py`.
- **Test types**: Integration.

### Task 3: Update documentation
- **Artifacts impacted**: `@/specs/DataModel.md`.
- **Purpose**: Reflect the new fields in the ER diagram.
