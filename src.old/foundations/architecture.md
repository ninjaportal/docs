# Architecture

## High-level package architecture

```mermaid
flowchart LR
  CLIENTS[Client Applications\nWeb / Mobile / Custom Admin] --> API[portal-api package\nREST + Auth + RBAC + Docs]
  API --> PORTAL[portal package\nDomain Models + Services + Repositories]
  PORTAL --> APIGEE[LaraApigee\nApigee Edge / X client]
  API --> DB[(MySQL)]
  PORTAL --> DB
```

## Backend layering

### Laravel application

The application is the runtime container. It provides:

- environment configuration (`.env`)
- framework bootstrapping
- package discovery / loading
- app-specific overrides and extensions
- deployment/runtime concerns

### `ninjaportal/portal` (core)

The core package defines:

- Eloquent models (users, admins, categories, API products, menus, settings, audiences)
- repositories (data access)
- services (business logic)
- domain events
- policies (RBAC authorization integration)
- translation system (`HasTranslations`)

### `ninjaportal/portal-api`

The API package provides:

- versioned API routes (`api/v1`)
- JSON response contract and API request helpers
- JWT access + opaque refresh token flow
- admin and consumer auth endpoints
- RBAC middleware composition for admin endpoints
- policy authorizer abstraction
- activity logging subscriber and storage
- Scribe integration for endpoint reference docs

## Request-to-domain flow (CRUD path)

```mermaid
sequenceDiagram
  participant Client
  participant Controller as API Controller (portal-api)
  participant Service as Portal Service (portal)
  participant Repo as Repository (portal)
  participant Model as Eloquent Model
  participant EventBus as Laravel Events
  participant Listener as Listener/Subscriber

  Client->>Controller: HTTP request
  Controller->>Service: validate + call domain action
  Service->>Service: optional hooks (before*)
  Service->>Repo: create/update/delete/find
  Repo->>Model: DB operations
  Model-->>Repo: persisted model
  Repo-->>Service: model/result
  Service->>Service: optional hooks (after*)
  Service->>EventBus: dispatch domain event
  EventBus->>Listener: handle (audit/sync/notifications)
  Service-->>Controller: model/result
  Controller-->>Client: standardized JSON response
```

## Authentication extensibility note

Authentication behavior is exposed behind interfaces in `portal-api`, which makes the auth flow replaceable/decoratable without changing controller signatures.

See [Deepdive / Add Custom Auth Flow](/deepdive/custom-auth-flow).
