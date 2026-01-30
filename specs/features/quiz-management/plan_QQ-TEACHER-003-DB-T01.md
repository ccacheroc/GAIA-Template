# QQ-TEACHER-003-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-003-DB-T01**  
**Related user story**: **QQ-TEACHER-003** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-003-DB-T01` and scenario `Adjusting the number of options (Limit 2-6)`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Reinforce data integrity for questions with multiple options. Ensure that the database level validates or facilitates the business rule of having between 2 and 6 options per question.
- **Impacted entities/tables**: `options`.
- **Impacted services/modules**: N/A (DB Level).
- **Impacted tests or business flows**: Guarantees consistent state even if application-level checks fail.

## 2) Scope
- **In scope**: 
  - Verification of existing foreign keys and constraints.
  - Adding a check constraint (if feasible in Postgres via trigger or application-level transaction checks) to ensure 2 <= options <= 6 per question.
- **Out of scope**: UI validation.
- **Assumptions**: Using Postgres 13+.
- **Open questions**: Does SQLAlchemy support cross-row constraints easily? (Likely handled via domain logic in BE, but DB can have a trigger for safety).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Integration test attempting to insert a 7th option for a question. 
   - Verify that the DB or repository layer blocks this.
2. **Minimal implementation**
   - Implement the domain validation in the Repository/Use Case (as DB-level cross-row constraints are complex).
   - *Alternative*: Implement a DB Trigger for strict enforcement.
3. **Refactor**
   - Ensure clear error messaging.

## 4) Atomic Task Breakdown

### Task 1: Domain-Level Option Count Enforcement
- **Purpose**: Enforce the 2-6 boundary at the boundary of the domain (QQ-TEACHER-003-DB-T01).
- **Artifacts impacted**: `backend/app/domain/entities/question.py`.
- **BDD Acceptance**:
  - Given a Question with 6 options
  - When trying to add a 7th
  - Then a DomainError should be raised.
