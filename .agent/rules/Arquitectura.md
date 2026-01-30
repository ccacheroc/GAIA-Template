# Architecture

## High-Level Overview
The system follows a **Clean Architecture** (also known as Hexagonal Architecture) approach to ensure separation of concerns, testability, and maintainability.

### Layers

1.  **Domain Layer**: Contains the core business logic and entities (e.g., `User` entity). It defines interfaces (Ports) for repositories but has no external dependencies.
2.  **Application Layer**: Contains Use Cases (e.g., `RegisterUser`, `Login`, `UpdateUserRole`). It orchestrates the domain logic and interacts with the infrastructure via interfaces.
3.  **Infrastructure Layer**: Implements the interfaces defined in the domain (Adapters). Includes Database access (SQLAlchemy), Auth services (Password hashing, JWT), and external integrations.
4.  **Presentation Layer**: Handles the HTTP interface (FastAPI Routers) and Data Transfer Objects (Pydantic Schemas). It maps HTTP requests to Use Case calls.

## Authentication & Authorization
- **Authentication**: Stateless, using **JWT (JSON Web Tokens)**.
    - User logs in -> Server validates credentials -> Returns JWT.
    - Client sends JWT in `Authorization: Bearer <token>` header.
- **Authorization**: Role-Based Access Control (RBAC).
    - Middleware/Dependency in FastAPI checks the user's role from the JWT payload or DB lookup against the required role for the endpoint.

## Component Diagram

```mermaid
C4Context
    title System Context Diagram - User Management

    Person(user, "User", "A user of the application (Admin, Member, etc.)")
    
    System_Boundary(app_boundary, "Neighborhood Association App") {
        Container(frontend, "Frontend", "React + Vite", "Provides the UI for users to interact with the system.")
        Container(backend, "Backend API", "FastAPI", "Handles business logic, auth, and data persistence.")
        ContainerDb(database, "Database", "PostgreSQL", "Stores user data, roles, and application state.")
    }

    Rel(user, frontend, "Uses", "HTTPS")
    Rel(frontend, backend, "API Calls (JSON/HTTPS)", "HTTPS")
    Rel(backend, database, "Reads/Writes", "SQL/TCP")
```

## Module Interaction: User Management

```mermaid
graph TD
    subgraph Presentation
        API[FastAPI Router]
    end

    subgraph Application
        UC[User Use Cases]
    end

    subgraph Domain
        Entity[User Entity]
        RepoInterface[UserRepository Interface]
    end

    subgraph Infrastructure
        RepoImpl[SQLAlchemy Repository]
        AuthService["Auth Service (Hash/JWT)"]
        DB[(PostgreSQL)]
    end

    API --> UC
    UC --> RepoInterface
    UC --> AuthService
    RepoImpl -.implements .-> RepoInterface
    RepoImpl --> DB
    UC --> Entity

```

## Module Interaction: Quiz Management

- **Quiz Lifecycle**: DRAFT -> PUBLISHED.
- **Authorization (BOLA)**: Strict ownership checks implemented in Presentation/Application layer. Teachers can only edit/view their own quizzes until published (student view).
- **Entities**: `Quiz`, `Question` (Polymorphic: TF, MultipleChoice), `Option`.
