# Global User Stories - QuizQuest

This file aggregates all user stories across all features of the QuizQuest platform. Each feature's detailed stories and Gherkin scenarios can be found in their respective `specs/features/<feature>/user-stories.md` files.

---

## Quiz Management & Editor
*Feature for teachers to design and organize assessments.*

| Story ID | Role | Title | Summary |
|---|---|---|---|
| **QQ-TEACHER-001** | TEACHER | Create Quiz Basic Metadata | Define Title and Description for a new assessment. |
| **QQ-TEACHER-002** | TEACHER | Manage True/False Questions | Add and configure binary choice questions. |
| **QQ-TEACHER-003** | TEACHER | Manage Multiple Choice Questions | Create questions with 2 to 6 options (default 4). |
| **QQ-TEACHER-004** | TEACHER | Organize and Reorder Questions | Pedagogically sequence questions via drag & drop. |
| **QQ-TEACHER-005** | TEACHER | Publish Quiz | Validate and set quiz status to published for classroom use. |

## User Authentication & Access Control
*Identify and protect teacher assets and pedagogical resources.*

| Story ID | Role | Title | Summary |
|---|---|---|---|
| **AUTH-TEACHER-001** | TEACHER | Teacher Registration | Create a secure account to start managing content. |
| **AUTH-TEACHER-002** | TEACHER | Teacher Login | Securely access the management dashboard. |
| **AUTH-TEACHER-003** | TEACHER | Resource Ownership | Ensure only owners can modify their own quizzes (BOLA). |
| **AUTH-TEACHER-004** | ENGINEER | DB Seeding for Testing | Pre-populate the environment with test actors and content. |
