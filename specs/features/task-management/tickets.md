# Task Management — Implementation Tickets

**Feature**: Task Management  
**Slug**: `task-management`  
**Goal**: Implement a robust task manager using FastAPI (Backend) and React (Frontend).
**Dependencies**: PostgreSQL, Docker.

---

### Story: TM-USER-001 — List Pending Tasks
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Happy Path (View), Empty State, Responsive Layout.

#### Tickets for TM-USER-001

1. - [x] **TM-USER-001-DB-T01 — Database: Initial Tasks Schema** [x] (2026-02-04)
   - **Type**: DB
   - **Description**: Create the initial `tasks` table with fields: `id`, `title`, `description`, `status`, `priority`, `created_at`, `updated_at`, `completed_at`.
   - **Scope**: `backend/alembic/versions/`.
   - **Deliverables**: Alembic migration script.
   - **Dependencies**: None.

2. - [x] **TM-USER-001-BE-T02 — Backend: List Tasks API** [x] (2026-02-04)
   - **Type**: BE
   - **Description**: Implement Domain Entity, Repository Port, Infrastructure Adapter (SQLAlchemy), Use Case, and FastAPI Router to list tasks.
   - **Scope**: `backend/app/src/context/task_management`.
   - **Deliverables**: Domain model, Repository implementation, Use case, API Router.
   - **Dependencies**: T01.

3. - [x] **TM-USER-001-FE-T03 — Frontend: Connect to List API** [x] (2026-02-04)
   - **Type**: FE
   - **Description**: Connect the `TaskList` component to the backend API using TanStack Query.
   - **Scope**: `frontend/src/features/task-management`.
   - **Deliverables**: API client integration, state management update.
   - **Dependencies**: T02.

---

### Story: TM-USER-002 — Create New Task
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Happy Path (Create), Validation, XSS/Security.

#### Tickets for TM-USER-002

1. - [x] **TM-USER-002-BE-T01 — Backend: Create Task API** [x] (2026-02-04)
   - **Type**: BE
   - **Description**: Implement use case and endpoint to persist new tasks in the DB.
   - **Scope**: `backend/app/src/context/task_management`.
   - **Deliverables**: CreateTask use case, POST endpoint.
   - **Dependencies**: TM-USER-001-BE-T02.

2. - [x] **TM-USER-002-FE-T02 — Frontend: Create Task UI** [x] (2026-02-04)
   - **Type**: FE
   - **Description**: Wire the `TaskInput` component to the backend creation endpoint.
   - **Scope**: `frontend/src/features/task-management`.
   - **Dependencies**: T01.

---

### Story: TM-USER-003 — Complete/Uncomplete Task
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Happy Path (Toggle), Keyboard interaction, Persistence.

#### Tickets for TM-USER-003

1. - [ ] **TM-USER-003-BE-T01 — Backend: Update Task API (Status)**
   - **Type**: BE
   - **Description**: Implement use case and PATCH/PUT endpoint to update task status (pending/completed).
   - **Scope**: `backend/app/application/use_cases`, `backend/app/presentation/api`.
   - **Deliverables**: UpdateTask use case, status update endpoint.
   - **Dependencies**: TM-USER-002-BE-T01.

2. - [ ] **TM-USER-003-FE-T02 — Frontend: Toggle Task Status UI**
   - **Type**: FE
   - **Description**: Connect the checkbox in `TaskItem` to the update API.
   - **Scope**: `frontend/src/features/task-management`.
   - **Deliverables**: useUpdateTask mutation, checkbox integration.
   - **Dependencies**: T01.

---

### Story: TM-USER-004 — Delete Task
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Happy Path (Delete), Undo notification.

#### Tickets for TM-USER-004

1. - [ ] **TM-USER-004-BE-T01 — Backend: Delete Task API**
   - **Type**: BE
   - **Description**: Implement use case and DELETE endpoint to remove tasks.
   - **Scope**: `backend/app/src/context/task_management`.
   - **Deliverables**: DeleteTask use case, DELETE endpoint.
   - **Dependencies**: TM-USER-002-BE-T01.

2. - [ ] **TM-USER-004-FE-T02 — Frontend: Delete Task & Undo Toast**
   - **Type**: FE
   - **Description**: Implement delete button in `TaskItem` and "Undo" toast notification.
   - **Scope**: `frontend/src/features/task-management`.
   - **Deliverables**: useDeleteTask mutation, Toast component integration.
   - **Dependencies**: T01.

---

### Story: TM-USER-005 — Search Tasks
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Search filtering, Case insensitivity.

#### Tickets for TM-USER-005

1. - [ ] **TM-USER-005-BE-T01 — Backend: Search/Filter in List API**
   - **Type**: BE
   - **Description**: Add search query parameter to the tasks list endpoint.
   - **Scope**: `backend/app/src/context/task_management`.
   - **Deliverables**: Updated ListTasks use case and router.
   - **Dependencies**: TM-USER-001-BE-T02.

2. - [ ] **TM-USER-005-FE-T02 — Frontend: Search Bar Component**
   - **Type**: FE
   - **Description**: Add a search input that filters the list (via API or state).
   - **Scope**: `frontend/src/features/task-management`.
   - **Deliverables**: SearchInput component, query client update.
   - **Dependencies**: T01.
