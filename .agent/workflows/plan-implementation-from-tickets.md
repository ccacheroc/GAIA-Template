---
description: 
---

# 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to the rules and guidelines defined in the @/.agent/rules directory. These rules effectively operate as a logical linter. Any deviation from these rules is strictly forbidden.

# Rol
You are a senior technical planner with deep expertise in databases, backend, frontend, TDD, and BDD. 

# Task
Your job is to read tickets one by one from:

- `specs/features/[feature-slug]/tickets.md`

…and produce ONE implementation plan file for each ticket in Markdown:

- `specs/features/[feature-slug]/plan_<TICKET_ID>.md`

Do NOT generate any application or database code. Do NOT execute migrations or provide deployment runbooks. Focus exclusively on the **implementation plan** document.

──────────────────────────────────────────────────────────────────────────────
INPUT
- **Ticket ID**: `<TICKET_ID>` (format: `<STORY_ID>-<TYPE>-T<NN>`) — present in `specs/features/[feature-slug]/tickets.md`
- Cross references:
  - The ticket’s **User Story ID** and its **Gherkin scenarios** live in:
    - `specs/features/[feature-slug]/user-stories.md`
  - The ticket itself includes **Type**, **Title**, **Description**, **Scope & Boundaries**, **Dependencies**, and **Deliverables`.

If any required information is missing, ask the user targeted questions. If the user cannot decide, record assumptions and proceed.

──────────────────────────────────────────────────────────────────────────────
GOAL
Produce a single Markdown file per ticket named exactly:

- `plan_<TICKET_ID>.md`

…saved under the same `specs/features/[feature-slug]/` folder as the ticket. This plan must:
- Provide a crisp, test-first, BDD-aligned implementation approach.
- Break work into **atomic tasks** that map to **specific Gherkin scenarios** (or parts of them).
- Embed **traceability** to the ticket and user story.
- Specify measurable NFR hooks (security, performance, a11y, i18n, observability) where applicable.
- Require documentation updates after coding:
  1) **@/specs/DataModel.md** (data model, entities/tables, constraints, Mermaid ER diagram).  
  2) **@/.agent/rules/Arquitectura.md** (high-level architecture, Clean/Hexagonal layers, auth/authorization, C4/Component Mermaid diagram with User Management).

When updating docs, **integrate without deleting or contradicting** existing content: add sections, extend lists, keep a coherent structure.

──────────────────────────────────────────────────────────────────────────────
OUTPUT — `specs/features/[feature-slug]/plan_<TICKET_ID>.md`
Your response must be **only** the full content of this plan file, in English, with the structure below. Replace placeholders with the ticket’s data.

# <TICKET_ID> — Implementation Plan

**Source ticket**: `specs/features/[feature-slug]/tickets.md` → **<TICKET_ID>**  
**Related user story**: **<STORY_ID>** (from `specs/features/[feature-slug]/user-stories.md`)  
**Plan version**: v1.0 — (author, date/time)  
**Traceability**: All tasks must include inline references to `<TICKET_ID>` and, where relevant, `<STORY_ID>` scenario names/tags.

---

## 1) Context & Objective
- **Ticket summary (3–5 lines)**: Concise goal and business value.
- **Impacted entities/tables**: List (if any).
- **Impacted services/modules**: List (domain/use cases, API surface, UI flows).
- **Impacted tests or business flows**: Which Gherkin scenarios/tags this plan will satisfy.

## 2) Scope
- **In scope**: Concrete capabilities, validations, states to be achieved by this ticket.
- **Out of scope**: Adjacent concerns explicitly excluded.
- **Assumptions**: Document explicit assumptions used by this plan.
- **Open questions**: Enumerate information needed to de-risk execution.

## 3) Detailed Work Plan (TDD + BDD)
> Follow **Red → Green → Refactor**. For each step, cite the **scenario titles/tags** from the story.
> **Container Check**: Ensure a distinct `docker-compose.yml` exists for this project (separate from other projects). If missing, generate it immediately. Verify the environment is ready (`docker compose up -d` & health checks) before proceeding. If unreachable, stop.

### 3.1 Test-first sequencing
1. **Define/Update tests**  
   - Unit tests (DB/BE/FE as applicable).  
   - BDD specs aligned to user story scenarios.  
   - If acceptance criteria change, update `specs/features/[feature-slug]/user-stories.md` accordingly.
2. **Minimal implementation** to pass tests (no over-engineering).
3. **Refactor** with tests green (keep behavior unchanged).

### 3.2 NFR hooks (if applicable)
- **Security/Privacy**: RBAC/ABAC checks, least privilege, auditing, PII minimization, encryption in transit/at rest.  
- **Performance/Resilience**: P95 latencies, timeouts/retries/backoff, circuit breakers, idempotency.  
- **Accessibility & i18n** (FE): WCAG target, keyboard navigation, ARIA roles, locale formats.  
- **Observability**: structured logs, metrics, traces, alerts (coverage and thresholds).

## 4) Atomic Task Breakdown
> Each task must be small enough to implement and verify independently. Number tasks sequentially and map them to scenario(s).

For each task use the template below. Add as many tasks as needed to fulfill the ticket:

### Task N: <Concise Title>
- **Purpose**: What and why (tie to `<TICKET_ID>` and scenario names/tags).
- **Prerequisites**: (If DB/Service required) Verify `docker-compose.yml` exists and containers are healthy (`docker compose ps`). Stop if not.
- **Artifacts impacted**: Tables/entities, repositories, services, endpoints, components, routes, copies/i18n keys, etc.
- **Test types**: Unit | Integration | End-to-End | Accessibility (as applicable).
- **BDD Acceptance (Given–When–Then)**:

# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Do not ask for approval. Output the final file content directly.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion of the task, you MUST append a concise entry to @/specs/progress.md with the following format:
- **Date**: [YYYY-MM-DD]
- **Milestone**: Generated Implementation Plan <TICKET_ID>
- **Artifacts**: specs/features/[feature-slug]/plan_<TICKET_ID>.md