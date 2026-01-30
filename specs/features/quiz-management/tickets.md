# Quiz Management & Editor — Implementation Tickets

This feature allows teachers to create and edit quizzes with different question types (True/False, Multiple Choice).

---
### Bug Tracking
- [x] (2026-01-30) **QQ-BUG-001**: Fix quiz creation connectivity error (CORS & API Prefix).
- [x] (2026-01-30) **QQ-BUG-002**: Fix 405 Method Not Allowed on GET /quizzes.
---

### Story: QQ-TEACHER-001 — Create Quiz Basic Metadata
**Source**: `user-stories.md`
**Key Scenarios**: 
- Successfully defining quiz metadata
- Title is mandatory

#### Tickets for QQ-TEACHER-001

1. - [x] (2026-01-30) **QQ-TEACHER-001-DB-T01 — Migration for Quizzes table**
   - **Type**: DB
   - **Description**: Create the `quizzes` table to store basic metadata and status.
   - **Scope**: 
     - Table `quizzes`: `id` (UUID), `teacher_id` (UUID, foreign key to users), `title` (VARCHAR, mandatory), `description` (TEXT, optional), `status` (ENUM: DRAFT, PUBLISHED).
     - Audit fields: `created_at`, `updated_at`.
   - **Dependencies**: None.
   - **Deliverables**: Alembic migration script.

2. - [x] (2026-01-30) **QQ-TEACHER-001-BE-T02 — CRUD API for Quiz metadata**
   - **Type**: BE
   - **Description**: Implement basic endpoints to create and retrieve quiz metadata.
   - **Scope**: 
     - `POST /quizzes`: Create new quiz with Title/Description.
     - `GET /quizzes/{id}`: Get quiz details.
     - `PUT /quizzes/{id}`: Update Title/Description.
     - Ownership validation: ensure `teacher_id` matches current authenticated user.
   - **Dependencies**: QQ-TEACHER-001-DB-T01.
   - **Deliverables**: FastAPI routers, Use Cases, Repository implementation, Pydantic DTOs, Unit tests.

3. - [x] (2026-01-30) **QQ-TEACHER-001-FE-T03 — Quiz Creation Shell and Header Form**
   - **Type**: FE
   - **Description**: UI to start a new quiz and edit its header information.
   - **Scope**: 
     - "Create Quiz" page/modal.
     - Form for Title and Description using React Hook Form + Zod.
     - Integration with `POST /quizzes` and `PUT /quizzes/{id}` via React Query.
   - **Dependencies**: QQ-TEACHER-001-BE-T02.
   - **Deliverables**: React components, Zod schema, Query/Mutation hooks, basic styling with Tailwind/shadcn.

---

### Story: QQ-TEACHER-002 — Manage True/False Questions
**Source**: `user-stories.md`
**Key Scenarios**: 
- Adding a T/F question
- Correct answer selection is mandatory

#### Tickets for QQ-TEACHER-002

1. - [x] (2026-01-30) **QQ-TEACHER-002-DB-T01 — Schema for Questions and Options**
   - **Type**: DB
   - **Description**: Create tables to support polymorphic question types and their options.
   - **Scope**: 
     - Table `questions`: `id` (UUID), `quiz_id` (UUID, FK), `type` (ENUM: TF, MULTIPLE_CHOICE), `content` (TEXT), `sequence` (INT).
     - Table `options`: `id` (UUID), `question_id` (UUID, FK), `content` (TEXT), `is_correct` (BOOLEAN).
   - **Dependencies**: QQ-TEACHER-001-DB-T01.
   - **Deliverables**: Alembic migration script.

2. - [x] (2026-01-30) **QQ-TEACHER-002-BE-T02 — API for True/False Questions**
   - **Type**: BE
   - **Description**: Logic to create T/F questions with exactly two options.
   - **Scope**: 
     - `POST /quizzes/{id}/questions`: Support 'TF' type.
     - Domain validation: ensure exactly 2 options are created ("True", "False") and exactly one is `is_correct`.
   - **Dependencies**: QQ-TEACHER-002-DB-T01.
   - **Deliverables**: Question Use Cases, Repository methods for Questions/Options, Unit tests.

3. - [x] (2026-01-30) **QQ-TEACHER-002-FE-T03 — True/False Question UI**
   - **Type**: FE
   - **Description**: Component to render and edit T/F questions in the editor.
   - **Scope**: 
     - "Add Question" button (TF option).
     - UI displaying "True" / "False" with radio buttons for correct answer.
     - Logic to handle changes and persist state.
   - **Dependencies**: QQ-TEACHER-002-BE-T02.
   - **Deliverables**: React components, integration with question mutations.

---

### Story: QQ-TEACHER-003 — Manage Multiple Choice Questions
**Source**: `user-stories.md`
**Key Scenarios**:
- Default state of Multiple Choice question
- Adjusting the number of options (Limit 2-6)
- Marking correct answer

#### Tickets for QQ-TEACHER-003

1. - [x] (2026-01-30) **QQ-TEACHER-003-DB-T01 — Options Validation Constraints**
   - **Type**: DB
   - **Description**: Ensure data integrity for options at the database level.
   - **Scope**: 
     - Check constraints if possible or indices to prevent multiple correct answers in single-choice questions (if architecture allows).
   - **Dependencies**: QQ-TEACHER-002-DB-T01.
   - **Deliverables**: Alembic migration (adding constraints/indices if applicable).

2. - [x] (2026-01-30) **QQ-TEACHER-003-BE-T02 — API for Multiple Choice Questions**
   - **Type**: BE
   - **Description**: Support dynamic option management for Multiple Choice type.
   - **Scope**: 
     - `POST /quizzes/{id}/questions` with 'MULTIPLE_CHOICE' type.
     - Domain validation: 2 <= options <= 6.
     - Ownership check.
   - **Dependencies**: QQ-TEACHER-003-DB-T01.
   - **Deliverables**: Use cases for Multiple Choice creation/update.

3. - [x] (2026-01-30) **QQ-TEACHER-003-FE-T03 — Multiple Choice Question UI**
   - **Type**: FE
   - **Description**: Dynamic form to handle 2 to 6 options.
   - **Scope**: 
     - Input fields for each option text.
     - "Add Option" and "Remove Option" buttons with boundary logic (2-6).
     - Radio selector for the single correct answer.
   - **Dependencies**: QQ-TEACHER-003-BE-T02.
   - **Deliverables**: React components, dynamic form handling logic.

---

### Story: QQ-TEACHER-004 — Organize and Reorder Questions
**Source**: `user-stories.md`
**Key Scenarios**:
- Reordering via drag and drop

#### Tickets for QQ-TEACHER-004

1. - [ ] **QQ-TEACHER-004-BE-T01 — Batch Reorder API**
   - **Type**: BE
   - **Description**: Endpoint to update the sequence of all questions in a quiz in a single transaction.
   - **Scope**: 
     - `PATCH /quizzes/{id}/reorder`: Payload with `[{question_id, sequence}]`.
     - Ensures all questions listed belong to the quiz.
   - **Dependencies**: QQ-TEACHER-002-BE-T02.
   - **Deliverables**: Reorder Use Case, atomic DB transaction implementation.

2. - [ ] **QQ-TEACHER-004-FE-T02 — Drag and Drop Question Sorting**
   - **Type**: FE
   - **Description**: Implementing visual reordering in the queston list using `dnd-kit` or similar.
   - **Scope**: 
     - Draggable question cards.
     - Optimistic UI updates during drag.
     - Integration with `PATCH /quizzes/{id}/reorder` on drop.
   - **Dependencies**: QQ-TEACHER-004-BE-T01.
   - **Deliverables**: DnD wrapper components, sorting logic, visual indicators.

3. - [ ] **QQ-TEACHER-004-OTH-T03 — Sequence Integrity Audit**
   - **Type**: OTH
   - **Description**: Script/Task to verify and repair sequence gaps if any.
   - **Scope**: Ensure questions are always indexed from 1 to N without holes.
   - **Dependencies**: QQ-TEACHER-004-BE-T01.
   - **Deliverables**: Maintenance script or background task check.

---

### Story: QQ-TEACHER-005 — Publish Quiz
**Source**: `user-stories.md`
**Key Scenarios**:
- Publishing a valid quiz
- Preventing publication of empty/invalid quizzes

#### Tickets for QQ-TEACHER-005

1. - [ ] **QQ-TEACHER-005-BE-T01 — Quiz Validation & Publish Service**
   - **Type**: BE
   - **Description**: Business logic to verify quiz completeness before changing status.
   - **Scope**: 
     - Check Title, at least 1 Question, and each Question has options + correct answer.
     - `POST /quizzes/{id}/publish`.
   - **Dependencies**: QQ-TEACHER-004-BE-T01.
   - **Deliverables**: Validation service, Status update Use Case, Integration tests.

2. - [ ] **QQ-TEACHER-005-FE-T02 — Publish Workflow and Feedback**
   - **Type**: FE
   - **Description**: Publish button with confirmation and validation error display.
   - **Scope**: 
     - "Publish" button with visual feedback.
     - Error summary display if backend validation fails.
     - Guarding the UI against editing published quizzes.
   - **Dependencies**: QQ-TEACHER-005-BE-T01.
   - **Deliverables**: React components, validation handling UI.

3. - [ ] **QQ-TEACHER-005-FE-T03 — Quiz Preview Mode**
   - **Type**: FE
   - **Description**: Read-only preview to see how the student will experience the quiz.
   - **Scope**: 
     - Toggle between "Editor" and "Preview".
     - Mock response flow for testing.
   - **Dependencies**: QQ-TEACHER-003-FE-T03.
   - **Deliverables**: Preview component, state management.
