# Architectural Model

This document describes the high-level architecture of the **Gaia Quiz Management** system.

## System Context (C4)

```plantuml
@startuml C4_Elements
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

title System Context Diagram for Gaia Quiz Management

Person(user, "Professor", "A teacher who manages quizzes")

System_Boundary(gaia_boundary, "Gaia Quiz Management System") {
    Container(frontend, "Frontend", "React / Vite", "Provides the UI for quiz creation and management.")
    Container(backend, "Backend API", "FastAPI (Python)", "Handles business logic, auth, and data persistence.")
    ContainerDb(database, "Database", "PostgreSQL", "Stores user data, quizzes, and questions.")
}

Rel(user, frontend, "Uses", "HTTPS")
Rel(frontend, backend, "API Calls", "JSON/HTTPS")
Rel(backend, database, "Reads/Writes", "SQL/TCP")

@enduml
```

## Component Diagram (Hexagonal Architecture)

```plantuml
@startuml Gaia_Components
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

title Component Diagram (Hexagonal Architecture)

Container_Boundary(backend_boundary, "Backend API (FastAPI)") {
    Component(router, "Presentation (Routers/DTOs)", "FastAPI", "Handles HTTP requests and response serialization.")
    Component(use_cases, "Application (Use Cases)", "Domain Logic", "Orchestrates quiz & question creation.")
    Component(domain, "Domain (Entities)", "Core Models", "Defines Quiz, Question, Option rules.")
    Component(validator, "Domain Services", "QuizValidator", "Validates publishing rules (check completeness).")
    Component(infra, "Infrastructure (Repositories)", "Adapters", "SQLAlchemy Quiz & Question storage.")
}

ContainerDb(db, "Database", "PostgreSQL", "Data storage")

Rel(router, use_cases, "Calls (AddQuestion, ReorderQuestions, etc.)")
Rel(use_cases, domain, "Uses Entities")
Rel(use_cases, validator, "Uses (Publish)")
Rel(use_cases, infra, "Calls via Ports (QuestionRepo)")
Rel(infra, db, "SQL", "TCP")
 
@enduml
```
 
## Frontend Components
 
```plantuml
@startuml Frontend_Components
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml
 
title Frontend Component Diagram
 
Container_Boundary(frontend_boundary, "Frontend (React)") {
    Component(pages, "Pages", "React Components", "QuizEditorPage")
    Component(queries, "API Layer (React Query)", "Hooks", "useReorderQuestions, useCreateQuestion")
    Component(editors, "Question Editors", "React Components", "TFQuestionEditor, MCQuestionEditor")
    Component(lists, "Question Lists", "React Components", "QuestionList (DnD)")
    Component(forms, "Form Management", "React Hook Form + Zod", "Validates input (questionSchema)")
}
 
Rel(pages, lists, "Renders")
Rel(pages, editors, "Renders")
Rel(editors, queries, "Uses")
Rel(lists, queries, "Uses (Reorder)")
Rel(editors, forms, "Uses")
 
@enduml
```
