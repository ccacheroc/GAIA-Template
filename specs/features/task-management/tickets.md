# Task Management — Implementation Tickets

**Feature**: Task Management  
**Slug**: `task-management`  
**Goal**: Implement a lightweight, local-storage based task manager for "Productive Solo" users.  
**Dependencies**: none (Frontend-only MVP).

---

### Story: TM-USER-001 — List Pending Tasks
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Happy Path (View), Empty State, Responsive Layout.

#### Tickets for TM-USER-001

1. - [x] **TM-USER-001-FE-T01 — Feature Skeleton & Layout** [x] (2026-02-03)
   - **Type**: FE
   - **Description**: Create the feature directory structure and the main layout for the Task Management feature. Implement the responsive container and "Task Dashboard" shell.
   - **Scope**: `src/features/task-management`, `layout`, `router`.
   - **Deliverables**: 
     - Feature folder scaffolding (`features/task-management/{components,hooks,types,pages}`).
     - Router configuration for `/tasks` (home).
     - Responsive shell (mobile-first).
   - **Dependencies**: None.

2. - [x] **TM-USER-001-FE-T02 — Local Storage Service & Domain Model** [x] (2026-02-03)
   - **Type**: FE (Data)
   - **Description**: Implement the `Task` domain entity, TypeScript interfaces, and the `LocalStorage` adapter. This serves as the "Backend" for the MVP.
   - **Scope**: `features/task-management/types.ts`, `features/task-management/api/storage.ts`.
   - **Deliverables**: 
     - `Task` interface (`id`, `title`, `status`, `createdAt`, `updatedAt`).
     - `TaskRepository` interface (get, save, delete).
     - `LocalStorageAdapter` implementation.
     - Unit tests for the adapter.
   - **Dependencies**: None.

3. - [x] **TM-USER-001-FE-T03 — Task List UI & State** [x] (2026-02-03)
   - **Type**: FE
   - **Description**: Implement the `TaskListView` and `TaskItem` components. Connect them to the data service using React Query (or simple hooks if RQ is overkill, but sticking to Tech Stack: use React Query).
   - **Scope**: `TaskList`, `TaskItem`, `useTasks` hook.
   - **Deliverables**: 
     - `useTasks` custom hook (wrapping `useQuery`).
     - `TaskList` component (rendering data or empty state).
     - Empty state UI ("No tasks yet").
     - Sorting logic (Newest first).
   - **Dependencies**: T01, T02.

---

### Story: TM-USER-002 — Create New Task
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Happy Path (Create), Validation, XSS/Security, Performance.

#### Tickets for TM-USER-002

1. - [x] **TM-USER-002-FE-T01 — Create Task Logic (Service)** [x] (2026-02-03)
   - **Type**: FE (Data)
   - **Description**: Extend the storage service to support `createTask`. Implement Zod validation for title constraints.
   - **Scope**: `features/task-management/api/storage.ts`, `features/task-management/schema.ts`.
   - **Deliverables**: 
     - `createTask` method in adapter.
     - Zod schema for Task creation (title length, required).
     - XSS sanitization check (if not handled by React automatically, ensure inputs are safe).
   - **Dependencies**: TM-USER-001-FE-T02.

2. - [x] **TM-USER-002-FE-T02 — Task Input Component** [x] (2026-02-03)
   - **Type**: FE
   - **Description**: Implement `TaskInput` component with validation and visual feedback.
   - **Scope**: `features/task-management/components/TaskInput.tsx`.
   - **Deliverables**: 
     - Input field with Zod validation.
     - "Add" button and "Enter" key support.
     - Loading state / Error state (shake animation).
   - **Dependencies**: T01, TM-USER-001-FE-T01.

3. - [ ] **TM-USER-002-FE-T03 — Mutation Integration**
   - **Type**: FE
   - **Description**: Integrate `useMutation` for creating tasks and updating the `TaskList` optimistically or via invalidation.
   - **Scope**: `useCreateTask` hook.
   - **Deliverables**: 
     - `useCreateTask` hook.
     - Integration with `TaskInput` and global `TaskList`.
     - Performance check (<100ms perceived latency).
   - **Dependencies**: T02, TM-USER-001-FE-T03.

---

### Story: TM-USER-003 — Complete/Uncomplete Task
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Toggle Status, Persistence, A11y.

#### Tickets for TM-USER-003

1. - [ ] **TM-USER-003-FE-T01 — Toggle Status Logic**
   - **Type**: FE (Data)
   - **Description**: Add `updateTask` capability to the storage adapter to handle status changes.
   - **Scope**: `storage.ts`.
   - **Deliverables**: 
     - `updateTask(id, { status })` method.
     - Unit tests for status toggling.
   - **Dependencies**: TM-USER-001-FE-T02.

2. - [ ] **TM-USER-003-FE-T02 — Task Item Interactions**
   - **Type**: FE
   - **Description**: Update `TaskItem` to include a checkbox. Wire up the interaction to the mutation.
   - **Scope**: `TaskItem.tsx`.
   - **Deliverables**: 
     - Checkbox UI (shadcn or custom accessible checkbox).
     - Strikethrough style for completed items.
     - Keyboard navigation support (`Tab`, `Space` to toggle).
   - **Dependencies**: TM-USER-001-FE-T03, T01.

3. - [ ] **TM-USER-003-FE-T03 — Mutation & Feedback**
   - **Type**: FE
   - **Description**: Implement `useToggleTask` mutation. Ensure UI updates instantly.
   - **Scope**: `hooks/useTasks.ts`.
   - **Deliverables**: 
     - Optimistic UI update implementation in React Query (optional but recommended for speed).
     - Integration verification.
   - **Dependencies**: T02.

---

### Story: TM-USER-004 — Delete Task
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Delete, Undo (Toast), Persistence.

#### Tickets for TM-USER-004

1. - [ ] **TM-USER-004-FE-T01 — Delete Logic**
   - **Type**: FE (Data)
   - **Description**: Add `deleteTask` to storage adapter and `useDeleteTask` mutation.
   - **Scope**: `storage.ts`, `hooks`.
   - **Deliverables**: 
     - `deleteTask(id)` method.
     - `useDeleteTask` mutation.
   - **Dependencies**: TM-USER-001-FE-T02.

2. - [ ] **TM-USER-004-FE-T02 — Delete UI & Undo Toast**
   - **Type**: FE
   - **Description**: Add delete button to `TaskItem`. Implement "Undo" toast notification system using `sonner` or shadcn `toast`.
   - **Scope**: `TaskItem.tsx`, `Toast` integration.
   - **Deliverables**: 
     - Delete icon button (A11y labelled).
     - Toast trigger on success.
     - "Undo" action in Toast that calls `createTask` (restore) or specific undo logic.
     - **Note**: "Undo" might need a temporary state or Soft Delete in storage to be robust. For MVP, re-creating or soft-delete flag is acceptable. *Decision*: Soft Delete flag in DB ticket T01 is better, or just re-insert. Let's assume re-insert for simplicity or Soft Delete. 
     - *Correction*: Let's implement Soft Delete in T01 if possible, or keep it simple.
   - **Dependencies**: T01.

3. - [ ] **TM-USER-004-FE-T03 — E2E Tests for Deletion**
   - **Type**: FE (QA)
   - **Description**: Create Playwright tests for the full delete + undo flow.
   - **Scope**: `e2e/tasks.spec.ts`.
   - **Deliverables**: 
     - Test: Delete task -> Verify gone.
     - Test: Delete -> Undo -> Verify returns.
   - **Dependencies**: T02.

---

### Story: TM-USER-005 — Search Tasks
**Source**: `specs/features/task-management/user-stories.md`  
**Key Scenarios**: Filter, Case Insensitivity, Clear.

#### Tickets for TM-USER-005

1. - [ ] **TM-USER-005-FE-T01 — Filter Logic**
   - **Type**: FE (Data)
   - **Description**: Implement filtering logic. Since it's client-side, this can be done in the `useTasks` selector or a client-side filter helper.
   - **Scope**: `hooks/useTasks.ts` or `utils/filter.ts`.
   - **Deliverables**: 
     - Filter function (case insensitive).
     - Integration into `useTasks` (if filtering at query level) or UI state.
   - **Dependencies**: TM-USER-001-FE-T03.

2. - [ ] **TM-USER-005-FE-T02 — Search Bar Component**
   - **Type**: FE
   - **Description**: Create `TaskSearch` component.
   - **Scope**: `components/TaskSearch.tsx`.
   - **Deliverables**: 
     - Search input field.
     - Clear button (X) when text exists.
     - Bind to URL state or local state (per Tech Stack, "Prefer URL state for filters").
   - **Dependencies**: T01.

3. - [ ] **TM-USER-005-FE-T03 — Integration & Layout**
   - **Type**: FE
   - **Description**: Place the search bar in the layout. Ensure list updates in real-time.
   - **Scope**: `features/task-management/pages/TaskPage.tsx`.
   - **Deliverables**: 
     - Responsive placement of search bar.
     - Verify empty results state ("No tasks match...").
   - **Dependencies**: T02.
