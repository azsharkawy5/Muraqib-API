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

## 🧠 Architectural Philosophy

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
