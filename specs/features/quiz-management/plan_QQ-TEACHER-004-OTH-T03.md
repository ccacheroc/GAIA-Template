# QQ-TEACHER-004-OTH-T03 — Implementation Plan

**Source ticket**: `specs/features/quiz-management/tickets.md` → **QQ-TEACHER-004-OTH-T03**  
**Related user story**: **QQ-TEACHER-004** (from `specs/features/quiz-management/user-stories.md`)  
**Plan version**: v1.0 — (Antigravity, 2026-01-30)  
**Traceability**: All tasks address `QQ-TEACHER-004-OTH-T03`.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Maintain data integrity by ensuring question sequences remain continuous (no gaps or duplicates) after deletions or reordering failures.
- **Impacted entities/tables**: `questions`.
- **Impacted services/modules**: Maintenance tasks / Repository hooks.
- **Impacted tests or business flows**: Guarantees that the pedagogical order is always recoverable and valid.

## 2) Scope
- **In scope**: 
  - Implementation of a sequence normalization service.
  - Automatic triggering after question deletion.
- **Out of scope**: UI logic.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Integration test: Delete a question in the middle of a list and verify that subsequent questions have their sequence updated to close the gap.
2. **Minimal implementation**
   - Implement `normalize_sequences` function in the Question Repository.
3. **Refactor**
   - Use a single SQL query for normalization if possible.

## 4) Atomic Task Breakdown

### Task 1: Sequence Normalization Logic
- **Purpose**: Close sequence gaps (QQ-TEACHER-004-OTH-T03).
- **Artifacts impacted**: `backend/app/domain/services/sequence_service.py`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - Given sequences [1, 2, 4, 5]
  - When normalized
  - Then they should become [1, 2, 3, 4].
