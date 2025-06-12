# Muraqib

**Muraqib** (Arabic for _"observer"_ or _"monitor"_) is a backend API for managing and tracking digital subscriptions. Built with a modular architecture using **Node.js**, **Express**, and **Prisma**, the system is designed for scalability, maintainability, and security.

---

## 📌 Project Overview

The rapid growth of digital subscriptions — from SaaS platforms to media services — has made it difficult for individuals and teams to keep track of recurring payments and renewal schedules. **Muraqib** provides a clean and extendable backend system for managing these subscriptions efficiently.

Beyond its practical purpose, the project reflects an intentional approach to backend architecture, engineering discipline, and continuous technical growth.

---

## ⚙️ Tech Stack

- **Node.js** & **Express** – Core application and routing
- **Prisma ORM** – Type-safe and performant database access layer
- **PostgreSQL** – Relational database engine
- **ESLint** & **Prettier** – Linting and formatting consistency
- **Modular Architecture** – Feature isolation and code separation

---

## 🧭 Why Node.js and Express?

Muraqib is intentionally built using **Node.js** with **Express**, a minimalist and unopinionated framework. This decision reflects a commitment to exploring backend engineering fundamentals in depth — from request lifecycle and middleware composition to validation logic and layered architecture.

Unlike batteries-included frameworks like NestJS or Django, which abstract away much of the internal complexity, Express leaves room for deliberate design decisions. This creates space for deeper technical engagement with critical concepts such as authentication workflows, error handling, service isolation, and scalable modularity. The result is not only a working system, but a well-reasoned backend platform built from the ground up with clarity and intent.

---

## Architecture Evolution Strategy: From Prototype to Production

### Why Start with Object Literals?

This project deliberately begins with **object literal architecture** as a learning and development strategy, not due to lack of knowledge of better patterns. This approach serves multiple strategic purposes:

#### 1. Rapid Prototyping & Domain Discovery

Object literals allow for extremely fast iteration during the initial development phase. Without the overhead of dependency injection, interface design, or complex architectural patterns, we can:

- Quickly establish basic CRUD operations
- Understand the domain boundaries and data relationships
- Get a working application running in minimal time
- Validate business logic and user workflows

#### 2. Intentional Anti-Pattern Learning

By deliberately building with tight coupling and direct dependencies, we create a controlled environment to experience common architectural problems firsthand:

**Experienced Pain Points:**

- **Testing Difficulties**: Cannot easily unit test services without hitting the database
- **Tight Coupling**: Services directly import and depend on concrete implementations
- **Dependency Management**: No clean way to inject shared dependencies (logging, permissions)
- **State Management**: Singleton objects cannot handle request-specific state (transactions, user context)
- **Maintainability Issues**: Adding new features requires touching multiple files

#### 3. Contextual SOLID Principles Learning

Rather than learning SOLID principles in isolation, this approach provides concrete context for why each principle matters:

- **Single Responsibility** Feeling the pain when services handle multiple concerns
- **Open/Closed**: Struggling to extend behavior without modifying existing code
- **Liskov Substitution**: Can't easily swap implementations (cache layers, different databases)
- **Interface Segregation**: How direct imports create unnecessary dependencies
- **Dependency Inversion**: The rigidity of high-level modules depending on low-level details

### The Evolution Path

The project is designed to evolve through several architectural phases:

```
Phase 1: Object Literals (Current)
├── Fast prototyping
├── Working application
└── Identified pain points

Phase 2: Constructor Injection
├── Service classes with injected dependencies
├── Improved testability
└── Better separation of concerns

Phase 3: Dependency Injection Container
├── Automated dependency resolution
├── Configuration-based wiring
└── Cross-cutting concerns (logging, validation)

Phase 4: Domain-Driven Design
├── Rich domain models
├── Application services
└── Infrastructure abstractions
```

### Learning Outcomes

This deliberate progression provides several key learning benefits:

**Practical Understanding**: Experience why architectural principles exist by feeling their absence
**Refactoring Skills**: Learn to evolve architecture while maintaining functionality
**Decision Context**: Understand when to apply different patterns based on actual needs
**Problem Recognition**: Develop ability to identify architectural smells and technical debt

---

## 🧠 Architectural Philosophy (Our Final Goal)

Muraqib is built to be extensible, maintainable, and secure. Core design principles include:

- **Feature Isolation**: Each domain (e.g., subscriptions, categories) is encapsulated with its own routing, controller, service, and validation logic to promote separation of concerns.
- **Layered Design**: Clear boundaries between routing, business logic, and data access make the system testable and easy to reason about.
- **Security by Default**: Validation, sanitization, and access control are prioritized from early stages, with plans for integrating token-based authentication and RBAC patterns.
- **Forward-Compatible**: The architecture is adaptable for future migration to **TypeScript**, integration testing, containerization, and service decoupling — laying a foundation for a mature production system.

---

## 🚧 Work in Progress

This repository is under **active development**, and this README will be updated continuously to reflect:

- New features and modules
- Infrastructure and architectural upgrades
- Design decisions and rationale
- API usage and examples

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 🤝 Contributions

Muraqib is open to ideas, discussions, and future collaboration. Feel free to open issues, fork the repository, or suggest improvements.

---
