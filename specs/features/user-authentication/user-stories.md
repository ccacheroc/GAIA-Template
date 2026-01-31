# User Stories — User Authentication & Access Control

## Introduction
This document defines the user stories for the Authentication and Access Control feature. These stories ensure that teachers can securely manage their quizzes while students maintain anonymous access.

## User Stories

### AUTH-TEACHER-001: Teacher Registration
**As a** Docente  
**I want to** create a secure account with my email and a strong password  
**So that** I can start creating and saving my own quizzes in a private space.

#### Acceptance Criteria
- **Scenario: Successful Registration**
  - **Given** I am in the registration form
  - **When** I enter a valid name, a unique email, and a password complying with Gaia security rules
  - **Then** the system hashes my password using Argon2id
  - **And** creates my teacher account in the database
  - **And** redirects me to the login page with a success message in Spanish.

- **Scenario: Duplicate Email Registration (Edge Case)**
  - **Given** a teacher account already exists with the email `test@gaia.edu`
  - **When** I try to register with the same email
  - **Then** the system shows an error message: "Este correo electrónico ya está registrado."

---

### AUTH-TEACHER-002: Teacher Login
**As a** Docente  
**I want to** log in with my credentials  
**So that** I can access my private dashboard and manage my quizzes.

#### Acceptance Criteria
- **Scenario: Successful Login**
  - **Given** I have a registered account
  - **When** I enter my correct email and password
  - **Then** the system generates a valid JWT session token
  - **And** grants me access to my list of quizzes.

- **Scenario: Invalid Credentials (Security)**
  - **Given** I am on the login page
  - **When** I enter an incorrect password
  - **Then** the system denies access with a generic message: "Correo o contraseña incorrectos."
  - **And** no sensitive information about the user existence is revealed.

---

### AUTH-TEACHER-003: Resource Ownership (BOLA Protection)
**As a** Docente  
**I want to** ensure that only I can modify or delete the quizzes I have created  
**So that** my academic content is protected from unauthorized changes by other teachers or students.

#### Acceptance Criteria
- **Scenario: Unauthorized Edit Attempt (Security)**
  - **Given** Teacher A has created Quiz #123
  - **And** Teacher B is logged in
  - **When** Teacher B attempts to edit Quiz #123 via API or direct URL
  - **Then** the system returns a `403 Forbidden` error
  - **And** the operation is blocked.

- **Scenario: Student Access (Security)**
  - **Given** a student is participating in a quiz via PIN
  - **When** the student attempts to access the `/api/v1/quizzes` management endpoint
  - **Then** the system rejects the request as "Unauthorized".

---

### AUTH-TEACHER-004: Database Seeding for Testing (Technical)
**As an** Engineer  
**I want to** have pre-configured teacher accounts and quizzes in the database  
**So that** I can verify the multi-tenant ownership logic during development and testing.

#### Acceptance Criteria
- **Scenario: Seed Execution**
  - **Given** the database is being initialized
  - **When** the seeding script runs
  - **Then** two teachers (`profe.test1@gaia.edu` and `profe.test2@gaia.edu`) are created with hashed passwords
  - **And** each teacher has at least 1 unique quiz associated with their ID.
