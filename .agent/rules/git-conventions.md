---
trigger: always_on
description: Git branching strategy, commit conventions, and development workflow. Use when performing git operations.
---

# Git Conventions & Workflow

## 1. Branching Strategy

| Branch | Description | Source | Merge Into |
|---|---|---|---|
| `main` | Stable code (Production ready). | N/A | N/A |
| `develop` | Base development branch. | `main` | `main` |
| `feat/...` | New features. | `develop` | Pull Request to `develop` |
| `fix/...` | Bug fixes. | `develop` | Pull Request to `develop` |
| `refactor/...` | Internal improvements. | `develop` | Pull Request to `develop` |
| `doc/...` | Documentation & Specs. | `develop` | Pull Request to `develop` |

## 2. General Workflow (Policy)

The following cycle **MUST** be followed for every task:

1.  **Sync**: Ensure `develop` is up to date (`git checkout develop && git pull origin develop`).
2.  **Branch**: Create a new branch from `develop` with the correct prefix.
    - Example: `git checkout -b feat/event-calendar`
3.  **Work**: Make atomic commits with descriptive messages.
4.  **Integrate**:
    - Switch back to `develop`: `git checkout develop`
    - Update `develop` (in case of remote changes): `git pull origin develop`
    - Merge local branch: `git merge feat/event-calendar`
5.  **Push**: Push the updated `develop` to remote.
    - `git push origin develop`

## 3. Nomenclature Constraints

### Branch Naming
- **Format**: `prefix/description-kebab-case`
- **Prefixes**:
    - `feat/`: New features
    - `fix/`: Bug fixes
    - `refactor/`: Refactoring
    - `doc/`: Documentation updates

### Commit Messages
- **Format**: `type: (TICKET_ID) description` 
- **Types**: `feat`, `fix`, `refactor`, `doc`
- **Rules**:
    - TICKET_ID is MANDATORY (e.g., `INC-001`). Use `NONE` if no ticket exists.
    - Use present tense ("add" not "added").
- **Example**:
    - `feat: (UM-001) aggregate register form with validation`
    - `fix: (BUG-42) fix login error in navbar`