# Core Concepts

NinjaPortal is built on top of a core Laravel package named `portal`.

The `portal` package is the foundation of the project. It owns the base domain models, repositories, services, events, listeners, migrations, package conventions, and Apigee synchronization mechanisms used by the rest of the solution.

You can use it directly inside your own Laravel application, build your own controllers and APIs on top of it, or install the out-of-the-box packages that ship with NinjaPortal.

## The Core Package

The core package provides the building blocks for a developer portal:

| Building block | Purpose |
| --- | --- |
| Models | Store portal developers, admins, products, categories, audiences, menus, settings, and translations. |
| Repositories | Keep data access behind interfaces so implementations can be replaced. |
| Services | Hold business actions such as creating users, syncing audiences, managing apps, and managing catalog data. |
| Events | Publish domain changes such as user creation, updates, and app actions. |
| Listeners | React to events, including syncing portal users with Apigee developers. |
| Migrations | Create the database schema required by the portal domain. |

The package is intentionally not tied to a specific UI or API style. It gives you the domain layer and extension points; your project decides how to expose them.

## Service First Design

Most application code should talk to services, not directly to models.

For example, creating a developer through `UserServiceInterface` does more than insert a row:

- It applies default user data.
- It stores the developer through the configured repository.
- It runs service hooks such as `beforeCreate` and `afterCreate`.
- It fires the matching domain event.
- It allows listeners to sync the developer with Apigee.

This keeps controllers thin and makes custom behavior easier to add without rewriting the core package.

## Apigee Sync

NinjaPortal treats Apigee as the API management system and keeps portal-facing data in the portal database.

When a portal developer is created or updated, the core package can dispatch events that are handled by Apigee sync listeners. Those listeners prepare the Apigee developer payload and create or update the developer in the configured Apigee platform.

This gives you a clean split:

| Layer | Responsibility |
| --- | --- |
| Portal database | Portal profiles, product catalog metadata, translations, audiences, menus, and settings. |
| Apigee | API products, apps, credentials, rate plans, and gateway-side developer records. |
| LaraApigee | The Apigee client used by NinjaPortal packages. |

## Out Of The Box Packages

The core package is only the foundation. NinjaPortal also ships packages that add ready-made capabilities on top of it.

| Package | Role |
| --- | --- |
| `portal-api` | Adds API-first support, versioned endpoints, authentication flows, response standards, and Scribe API documentation. |
| `shadow-theme` | Adds the full-stack/frontend theme layer for teams that want a ready-made portal experience. |
| `portal-mfa` | Adds configurable multi-factor authentication support. |
| `portal-mint` | Adds monetization-domain foundations. |
| `portal-xmint` | Adds Apigee X monetization integration. |

You can start with only `portal`, or install the higher-level packages when you want more of the platform prebuilt.

## Extension Model

NinjaPortal is designed to be extended through interfaces, hooks, and events.

Common extension points include:

- Swap a repository implementation.
- Decorate or replace a service implementation.
- Listen to domain events.
- Add service hooks for project-specific behavior.
- Build custom controllers using the same service contracts.
- Use `portal-api` endpoints as-is, or build your own API layer on top of `portal`.

The important idea is simple: the portal package owns the domain standards, while your application owns the experience.
