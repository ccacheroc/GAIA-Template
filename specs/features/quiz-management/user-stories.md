# User Stories: Quiz Creation & Editing Form

## Introduction
This document defines the user stories and acceptance criteria for the Quiz Creation and Editing interface. These stories directly support the objective of enabling teachers to efficiently prepare high-quality assessments for their students, contributing to the overall KPI of **"Number of quizzes created"** and **"User efficiency"** defined in the [Feature Description](./feature-descr.md).

---

## User Stories

### QQ-TEACHER-001: Create Quiz Basic Metadata
**As a** Teacher  
**I want to** define the basic information of a quiz (Title, Description)  
**So that** I can identify it in my library and provide context to my students.

**Acceptance Criteria:**

**Scenario 1: Successfully defining quiz metadata**
- **Given** I am on the "Create Quiz" page
- **When** I enter "Unit 1: Solar System" in the Title field
- **And** I enter "Basic concepts about planets and the sun" in the Description field
- **And** I click "Save Header"
- **Then** the quiz header should be saved as a draft
- **And** I should see a success notification

**Scenario 2: Title is mandatory**
- **Given** I am on the "Create Quiz" page
- **When** I leave the Title field empty
- **And** I try to save
- **Then** I should see an error message "Title is required"
- **And** the quiz should not be saved

---

### QQ-TEACHER-002: Manage True/False Questions
**As a** Teacher  
**I want to** add questions where the answer is either True or False  
**So that** I can assess binary knowledge points.

**Acceptance Criteria:**

**Scenario 1: Adding a T/F question**
- **Given** I am editing a quiz
- **When** I select "Add Question" and choose "True/False" type
- **Then** a new question appears with two fixed options: "True" and "False"
- **And** I must select one of them as the correct answer.

**Scenario 2: Correct answer selection is mandatory**
- **Given** I have added a T/F question with the text "The moon is made of cheese"
- **When** I try to save the question without marking "True" or "False" as correct
- **Then** I should see an error "Please mark the correct answer."

---

### QQ-TEACHER-003: Manage Multiple Choice Questions
**As a** Teacher  
**I want to** add questions with up to 6 options (defaulting to 4)  
**So that** I can create more complex assessments.

**Acceptance Criteria:**

**Scenario 1: Default state of Multiple Choice question**
- **Given** I am editing a quiz
- **When** I select "Add Question" and choose "Multiple Choice"
- **Then** a new question appears with 4 empty answer fields.

**Scenario 2: Adjusting the number of options (Limit 2-6)**
- **Given** a new Multiple Choice question with 4 default options
- **When** I click "Add Option"
- **Then** a 5th option field appears
- **When** I click "Add Option" again
- **Then** a 6th option field appears
- **And** the "Add Option" button becomes disabled.
- **When** I click "Remove Option" on an existing option
- **Then** the option is deleted, provided there are at least 2 options remaining.

**Scenario 3: Marking correct answer**
- **Given** I have a Multiple Choice question with 4 options
- **When** I select the radio button next to Option B
- **Then** Option B is marked as the correct answer
- **And** any previously marked correct answer for this question is unmarked (single choice).

---

### QQ-TEACHER-004: Organize and Reorder Questions
**As a** Teacher  
**I want to** change the order of the questions in my quiz  
**So that** I can control the pedagogical sequence of the assessment.

**Acceptance Criteria:**

**Scenario 1: Reordering via drag and drop**
- **Given** a quiz with 3 questions (Q1, Q2, Q3)
- **When** I drag Q3 to the top position
- **Then** the new order should be Q3, Q1, Q2
- **And** the internal sequence index of the questions should be updated and saved.

---

### QQ-TEACHER-005: Publish Quiz
**As a** Teacher  
**I want to** validate and publish my quiz  
**So that** it can be used in live sessions.

**Acceptance Criteria:**

**Scenario 1: Publishing a valid quiz**
- **Given** a quiz with a Title and at least one question (and all questions have text and a marked correct answer)
- **When** I click "Publish"
- **Then** the quiz status changes to "Published"
- **And** I can no longer edit the question structure while it has active sessions (unless I create a new version).

**Scenario 2: Preventing publication of empty/invalid quizzes**
- **Given** a quiz draft with no questions
- **When** I click "Publish"
- **Then** I see an error "A quiz must have at least one question to be published."
- **And** the status remains "Draft".

---

## Non-Functional Requirements (Validation Scenarios)

### Q-NFR-001: Autosave Persistence
- **Given** I have been editing long questions for 5 minutes
- **When** I accidentally refresh the page or lose connection
- **Then** when I return, my changes should be restored from the last heartbeat/autosave.

### Q-SEC-001: Ownership Protection
- **Given** Teacher A has a quiz with ID `123`
- **When** Teacher B tries to access the edit URL `/quizzes/123/edit`
- **Then** Teacher B should receive a "403 Forbidden" or be redirected to their library.
