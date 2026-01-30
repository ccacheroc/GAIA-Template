---
trigger: always_on
description: Mandatory git conventions and workflow for all code changes.
---

# Git Conventions & Workflow (Strict Policy)

## 1. Branching Strategy

| Branch | Description | Source | Merge Into |
|---|---|---|---|
| `main` | Stable code (Production ready). | N/A | N/A |
| `develop` | Integration branch. | `main` | `main` |
| `feat/<ticket-id>` | New features (e.g. `feat/qq-teacher-001-be-t02`). | `develop` | `develop` (via PR) |
| `fix/<ticket-id>` | Bug fixes (e.g. `fix/qq-bug-001`). | `develop` | `develop` (via PR) |
| `refactor/<ticket-id>` | Significant refactors. | `develop` | `develop` (via PR) |
| `doc/<ticket-id>` | Documentation/Specs only. | `develop` | `develop` (via PR) |

## 2. Mandatory Workflow (Execution Protocol)

The following cycle **MUST** be followed for every task. Failure to execute these steps or verify state is a violation of the DoD.

1.  **Initial Awareness**: You **MUST** run `git status` and `git branch --show-current` before modifying ANY file.
2.  **Environment Preparation**:
    - If starting a new ticket: `git checkout develop && git pull origin develop && git checkout -b <prefix>/<ticket-id-lowercase>`
    - If continuing an existing ticket: Ensure you are on the correct branch. `git pull origin <current-branch>` if remote exists.
3.  **Atomic Development**: Perform changes and tests (TDD).
4.  **Commit Validation**: Commits **MUST** use the exact pattern: `type: (TICKET_ID) description`.
    - **TICKET_ID** must match the standard: `<ACRONYM>-<ROLE|TYPE>-<NNN>[-<LAYER>-T<NN>]`.
    - Example: `feat: (QQ-TEACHER-003-FE-T03) add multiple choice editor component`
5.  **Synchronization**: 
    - `git push origin <branch-name>`
    - (Optional) Local merge to `develop` only if explicitly requested by the project lead.

## 3. Nomenclature Constraints

### Branch Naming
- **Constraint**: The `ticket-id` in the branch name MUST be lowercase.
- **Example**: `feat/qq-teacher-003-fe-t03`

### Commit Messages
- **Constraint**: `TICKET_ID` is MANDATORY. The use of `NONE` is FORBIDDEN per `OperationalPhilosophy.md`.
- **Constraint**: Use **English** for types and descriptions to maintain consistency with the rest of the codebase/specs.
- **Allowed Types**: `feat`, `fix`, `refactor`, `doc`, `chore`, `test`, `perf`, `build`, `ci`.

### Verification Logic
- Before committing, the agent MUST verify:
  - Branch name matches Ticket ID prefix.
  - Ticket ID in message exists in `tickets.md`.
  - Message is in the present tense.
