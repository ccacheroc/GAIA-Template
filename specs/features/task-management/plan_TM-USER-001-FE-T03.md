# TM-USER-001-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-001-FE-T03**  
**Related user story**: **TM-USER-001** (List pending tasks)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Implement the UI components (`TaskListView`, `TaskItem`) and State Management (`useTasks`) to display the list of tasks. This connects the Presentation layer to the Data layer implemented in T02.
- **Impacted entities**: `Task`.
- **Impacted services/modules**: `src/features/task-management/components`, `src/features/task-management/hooks`.
- **Impacted tests**: Unit tests for components & hooks.

## 2) Scope
- **In scope**: 
  - `useTasks` hook (fetching from `TaskRepository`).
  - `TaskList` component (container).
  - `TaskItem` component (presentation).
  - Empty state handling.
  - Sorting (client-side, newest first).
  - Basic error state handling.
  - Integration with `TaskPage`.
- **Out of scope**: 
  - Task creation (T04/User Story 002).
  - Task deletion (TM-USER-004).
  - Complex filtering (TM-USER-005).
- **Assumptions**: 
  - `TanStack Query` should be installed as per Tech Stack, or we use a clean "Service Hook" pattern if we want to keep it lighter for MVP 1.0. *Decision*: To strictly follow the "Tech Stack: planned" and "Ticket: Connect ... using React Query", I will interpret this as **installing TanStack Query** is part of this ticket or a prerequisite. I will add it as a step.

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Install Dependencies**: `npm install @tanstack/react-query`.
2.  **Setup QueryClient**: Configure global `QueryClientProvider` in `App.tsx` or `main.tsx`.
3.  **Define Hook**: Create `useTasks.ts` that uses `useQuery` interacting with `TaskRepository.getAll()`.
4.  **Write Tests (Red)**: `TaskList.test.tsx` checking for "No tasks yet" (empty) and "Task Title" (populated).
5.  **Implement Components (Green)**: 
    - `TaskItem`: Renders title and status.
    - `TaskList`: Uses `useTasks` and renders list or empty state.
6.  **Integrate**: Mount `TaskList` in `TaskPage`.

### 3.2 NFR hooks
- **Performance**: `useQuery` handles caching/stale-time.
- **Accessibility**: List should use `<ul>`/`<li>` structure.
- **Visuals**: Use `shadcn/ui` Card or simple styled divs using Tailwind/Brand tokens.

## 4) Atomic Task Breakdown

### Task 1: Setup React Query
- **Purpose**: Enable state management.
- **Artifacts**: `src/lib/react-query.ts` (client config), `src/main.tsx` (provider).
- **Test types**: Manual (app runs without crash).

### Task 2: Implement useTasks Hook
- **Purpose**: Data fetching abstraction.
- **Artifacts**: `src/features/task-management/hooks/useTasks.ts`.
- **Test types**: Unit (mock repository).
- **BDD**: **Given** tasks exist **When** hook runs **Then** returns data.

### Task 3: Implement UI Components (TDD)
- **Purpose**: Visual presentation.
- **Artifacts**: 
  - `src/features/task-management/components/TaskItem.tsx`
  - `src/features/task-management/components/TaskList.tsx`
  - `src/features/task-management/components/__tests__/TaskList.test.tsx`
- **Test types**: Component Testing (React Testing Library).
- **BDD**: 
  - **Given** empty repo, **Then** show "No tasks yet".
  - **Given** tasks, **Then** show list of `TaskItem`s.

### Task 4: Integration
- **Purpose**: Show list on page.
- **Artifacts**: `src/features/task-management/pages/TaskPage.tsx`.
- **Test types**: Manual / Browser.

## 5) Verification Plan
- **Automated**: `npm run test` (Hooks & Components).
- **Manual**: Open `http://localhost:5173/tasks`. Manually allow some dummy data in `localStorage` via console and refresh to see if it appears.
