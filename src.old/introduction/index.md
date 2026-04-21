# Introduction

NinjaPortal is a developer portal solution built around two core Composer packages:

- `ninjaportal/portal` (domain models, services, repositories, events, policies, translations)
- `ninjaportal/portal-api` (REST API, auth/token flows, authorization integration, activity logging, docs)

These two packages form the core of the solution.

Optional packages (for example `ninjaportal/portal-mfa`) extend the authentication layer, but they are not required to understand the core architecture.

## What NinjaPortal gives you

- a domain-driven backend for portal/catalog/user management
- a prebuilt API package that exposes the domain through a consistent JSON contract
- extension points through contracts, events, listeners, observers, and service bindings
- Apigee-backed operations via `lordjoo/laraapigee`
- freedom to build any UI/client stack you want (NinjaPortal is not opinionated about frontend components)

## How it is built (high level)

NinjaPortal is installed into your Laravel project via Composer packages.

Your application provides:

- environment configuration
- framework bootstrapping
- deployment/runtime concerns
- your custom extensions (listeners, service replacements, custom auth flow, etc.)

The packages provide:

- reusable domain and API behavior
- stable extension contracts
- package configuration and migrations

## Design style (service pattern)

NinjaPortal uses a service-oriented backend style:

- **Models**: persistence structure and relationships
- **Repositories**: data access and query composition
- **Services**: business logic and orchestration
- **Events**: extension surface for side effects
- **Contracts**: safe replacement points

This is what makes the platform easy to adapt per client without forking the entire codebase.

## Start here next

1. [Configuration](/introduction/configuration)
2. [DB Design](/introduction/db-design)
3. [How to Use](/introduction/how-to-use)
4. [Apigee Backed Operations](/introduction/apigee-backed-operations)
5. [API](/introduction/api)
6. [Authentication & Authorization](/introduction/authentication-authorization)

## Related deeper docs

- [Foundations / Architecture](/foundations/architecture)
- [Portal Package Reference](/portal/)
- [Portal API Package Reference](/portal-api/)

