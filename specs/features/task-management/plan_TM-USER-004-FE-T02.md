# TM-USER-004-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-004-FE-T02**  
**Related user story**: **TM-USER-004** (Delete Task)  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Add UI for deletion (Delete button) and implement "Undo" capability via Toast notifications.
- **Impacted entities**: None.
- **Impacted services/modules**: `src/features/task-management/components/TaskItem.tsx`, `App.tsx` (Toaster).
- **Impacted tests**: Component & Integration tests.

## 2) Scope
- **In scope**: 
  - Delete Icon Button in `TaskItem`.
  - Integration with `sonner` (shadcn setup) for Toast.
  - Undo Action in Toast: Calls `createTask` with original data to "restore".
  - A11y: "Delete task 'Title'" label.
- **Out of scope**: 
  - E2E (T03).
- **Assumptions**: 
  - `shadcn/ui` `sonner` or `toast` needs to be installed. I will install `sonner` as it's standard in modern stacks.

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Install**: `npx shadcn@latest add sonner`.
2.  **Setup**: Add `Toaster` to `TaskLayout` or `App`.
3.  **Implement UI (Green)**: Add button to `TaskItem`.
4.  **Implement Logic**: On delete success -> `toast("Task deleted", { action: { label: 'Undo', onClick: () => restore() } })`.
5.  **Refactor**: Ensure "Restore" preserves ID if possible (LocalStorage allows setting ID manually if we expose it in repo, otherwise new ID is fine for MVP).

### 3.2 NFR hooks
- **Accessibility**: Focus management? Toast is usually accessible by default in shadcn.

## 4) Atomic Task Breakdown

### Task 1: Setup Toaster
- **Purpose**: Notifications.
- **Artifacts**: `src/components/ui/sonner.tsx` (auto), `src/app/App.tsx` (provider).
- **Test types**: Manual.

### Task 2: Update TaskItem
- **Purpose**: Delete interaction.
- **Artifacts**: `src/features/task-management/components/TaskItem.tsx`.
- **Test types**: Component Test.

### Task 3: Undo Logic
- **Purpose**: Restore data.
- **Artifacts**: `src/features/task-management/hooks/useDeleteTask.ts` (enhancement) or `TaskItem` logic.
- **Test types**: Manual.

## 5) Verification Plan
- **Automated**: `npm run test`.
- **Manual**: Delete task -> Click Undo -> Verify task returns.
