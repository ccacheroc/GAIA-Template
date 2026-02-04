# Implementation Plan - [TM-USER-003-BE-T01] Backend: Update Task API (Status)

**Goal**: Implement the backend logic to toggle task status (pending/completed) and update the `completed_at` timestamp.

## Proposed Changes

### [Domain Layer]

#### [MODIFY] [task_repository.py](backend/app/domain/repositories/task_repository.py)
- Add `update(self, task: Task) -> Task` method to the repository interface.

### [Application Layer]

#### [CREATE] [update_task.py](backend/app/application/use_cases/task_management/update_task.py)
- Implement `UpdateTaskUseCase`.
- It should fetch the existing task, update its status, and set `completed_at` if status is `COMPLETADA`.
- Use the repository to persist changes.

### [Infrastructure Layer]

#### [MODIFY] [task_repository_impl.py](backend/app/infrastructure/repositories/task_repository_impl.py)
- Implement `update` method in `SqlAlchemyTaskRepository`.
- It should merge the updated model and commit.

#### [MODIFY] [task_mapper.py](backend/app/infrastructure/db/mappers/task_mapper.py)
- Ensure mapper handles all fields including `completed_at`.

### [Presentation Layer]

#### [MODIFY] [task.py](backend/app/presentation/schemas/task.py)
- Create `TaskUpdate` schema (with optional status).

#### [MODIFY] [tasks.py](backend/app/presentation/api/tasks.py)
- Add `PATCH /tasks/{task_id}` endpoint.
- Support updating the status.

---

## Verification Plan

### Automated Tests
- **Unit Test**: `test_update_task_use_case.py` to verify status toggle and timestamp logic.
- **Integration Test**: Verify endpoint updates the DB correctly via FastAPI TestClient.

### Manual Verification
- Use Swagger UI (/docs) to PATCH a task and verify status changes in the DB.
