# Foundations

This page explains what NinjaPortal is, how it is built, the core concepts you should keep in mind when working with it, and how Apigee integration fits into the platform.

## What is NinjaPortal?

NinjaPortal is a modular developer portal platform for API providers.

It provides a domain layer (`ninjaportal/portal`) and a REST API layer (`ninjaportal/portal-api`) to support developer onboarding, API catalog management, access control, and portal operations.

NinjaPortal is designed so teams can adopt it as:

- a full developer portal backend
- an API + domain platform behind a custom frontend
- a package-based foundation for client-specific solutions

## Design principles

### 1. Modular packaging

Core features are delivered as Composer packages so teams can:

- ship features independently
- override bindings without forking the whole app
- add optional packages (auth extensions, monetization, themes, admin tools)

### 2. Domain-first backend

The `portal` package owns domain models and business services. Transport layers (REST APIs, internal tools, custom frontends, future channels) should depend on the domain layer instead of duplicating logic.

### 3. Event-driven extensibility

Important domain actions fire events. This enables:

- custom notifications
- audit trails
- external syncs (Apigee, analytics, downstream systems)
- feature add-ons in separate packages

### 4. Configurable models and guards

Portal and Portal API support configurable model classes and guards. This is critical for client-specific deployments and white-label scenarios.

### 5. Clear contracts for replacement

Portal API (and optional extension packages) expose interfaces for pluggable behavior, making package-level extension practical.

## How NinjaPortal is built

At runtime, NinjaPortal is typically installed into a Laravel application through Composer packages.

Core building blocks:

- **Laravel application**: deployment/runtime shell, environment, queue/scheduler, application-specific customizations
- **`ninjaportal/portal`**: domain models, repositories, services, events, policies, translations
- **`ninjaportal/portal-api`**: versioned HTTP API, auth/token flows, response contract, activity logging, Scribe integration
- **optional packages**: feature-specific extensions that plug into defined interfaces/events

This means production deployments should think in terms of Composer package installation and configuration, not repository-local paths.

## Core concepts (the mental model)

### Service pattern and code style

NinjaPortal follows a service-oriented backend style with clear responsibilities:

- **Models** define persistence structure and relationships
- **Repositories** encapsulate data access and query composition
- **Services** implement business rules and orchestration
- **Events** expose important actions for extension
- **Contracts** (interfaces) make replacement safe and explicit

This pattern keeps domain behavior testable and reusable across HTTP APIs and custom application code.

See also:

- [Portal / Models, Repositories & Services](/portal/models-services)
- [Portal / Hooks & Events](/portal/hooks-events)
- [Portal API / Extending Portal API](/portal-api/extending)

### Not opinionated on UI/components

NinjaPortal is intentionally not opinionated about your frontend component stack.

You can use any frontend/client implementation you want as long as it speaks to the API contract, for example:

- Nuxt + PrimeVue
- Vue + any UI kit
- React + any component library
- mobile apps
- internal admin tools

The platform focuses on the backend domain + API contracts, not enforcing a specific component system.

### Apigee integration model (foundational view)

NinjaPortal integrates with Apigee through `lordjoo/laraapigee`, which abstracts Apigee management APIs (Edge and Apigee X) behind serviceable PHP clients/contracts.

At the Portal layer, Apigee integration is used for flows such as:

- developer app management
- app credential/key lifecycle operations
- product synchronization and related orchestration

This separation keeps Apigee implementation details out of most application code and lets the portal layer expose domain-friendly services/events.

See:

- [Portal / Apigee Integration](/portal/apigee-integration)
- [Package Map](/foundations/package-map)

## Main runtime components

- **Laravel backend app** (`backend/`)
  - hosts the application runtime
  - installs NinjaPortal packages through Composer
  - owns environment and deployment configuration
- **Portal package** (`ninjaportal/portal`)
  - core models/services/repositories/events/policies
- **Portal API package** (`ninjaportal/portal-api`)
  - versioned REST API, auth, tokens, audit/activity logging, Scribe docs
## Related reading

- [Introduction](/introduction/)
- [Introduction / API](/introduction/api)
- [Introduction / Authentication & Authorization](/introduction/authentication-authorization)
