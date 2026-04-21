# Portal: Features Covered

This page summarizes the functional scope of `ninjaportal/portal` (the domain package).

## Core domain coverage

`ninjaportal/portal` covers the backend domain model and business logic for:

- **Users (developers/consumers)** and admin actors (domain models)
- **API product catalog** (local portal catalog records mapped to Apigee products)
- **Categories** for catalog organization
- **Audiences** (logical user groupings) and audience/product relationships
- **Menus and menu items** for portal navigation/content structures
- **Settings and setting groups** for runtime configurable values
- **RBAC conventions + policies** (model policy classes and naming conventions)
- **Translations** for translatable content models
- **Apigee app + credential domain orchestration** (via Portal services)
- **Domain events** for CRUD and sync operations

## What Portal intentionally does not cover

These concerns are handled by other layers/packages:

- **REST API endpoints** → `ninjaportal/portal-api`
- **JWT/refresh-token auth flows** → `ninjaportal/portal-api`
- **MFA challenge/factor flows** → `ninjaportal/portal-mfa`
- **Frontend UI components / design system** → your chosen client application

## Feature style (how features are implemented)

Portal favors consistent service-oriented implementation:

- repositories for persistence/query logic
- services for business logic and orchestration
- events for extensibility
- contracts for replacement

This makes it easy to add client-specific behavior without forking core package code.

## Feature-to-page map

- Domain patterns: [Models, Repositories & Services](/portal/models-services)
- Events and hooks: [Hooks & Events](/portal/hooks-events)
- Translation system: [Translations](/portal/translations)
- Authorization model: [RBAC & Policies](/portal/rbac)
- Apigee-facing domain logic: [Apigee Integration](/portal/apigee-integration)
- Extension examples: [How to Extend](/portal/extending)

