# Getting Started

This page gives you the shortest path to a working NinjaPortal developer environment, then points you to the deeper package docs.

## Quick start checklist

1. Read [Prerequisites](/installation/prerequisites)
2. Read [Foundations Overview](/foundations/overview) to understand the architecture and extension model
3. Install and configure the core domain package: [Portal / Installation & Configuration](/portal/installation-configuration)
4. Install and configure the API package: [Portal API / Installation & Configuration](/portal-api/installation-configuration)
5. Run migrations and verify the application: [First Run & Verification](/installation/first-run)
6. Explore extension points:
   - [Portal Hooks & Events](/portal/hooks-events)
   - [Portal API Extending](/portal-api/extending)
   - [Authentication & Authorization](/introduction/authentication-authorization)

## Core concepts you should know first

- **Portal package** owns the domain models and business services.
- **Portal API package** exposes REST APIs and auth/token infrastructure.
- **Events are first-class**: domain actions fire events to support auditing and custom integrations.
- **Repositories + services** are the default backend pattern for portal domain logic.

## Where endpoint documentation lives

- REST endpoint reference is generated with **Scribe** in the backend app.
- This VitePress site explains architecture, configuration, extension patterns, and operational behavior.

See [Portal API / Scribe & API Docs](/portal-api/scribe).
