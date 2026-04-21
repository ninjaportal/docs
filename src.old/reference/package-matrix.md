# Package Matrix

This page gives a quick overview of the major packages/components in the NinjaPortal project and where to find their documentation.

## Core packages (solution foundation)

| Package | Type | Responsibility | Docs |
| --- | --- | --- | --- |
| `ninjaportal/portal` | Backend package | Core domain models/services/repos/events/policies/translations | [Portal](/portal/) |
| `ninjaportal/portal-api` | Backend package | REST API, auth/tokens, RBAC middleware, activity logs, Scribe | [Portal API](/portal-api/) |

## Optional extensions and supporting packages

| Package / Component | Type | Responsibility | Status / Notes | Docs |
| --- | --- | --- | --- | --- |
| `ninjaportal/portal-mfa` | Backend package | Optional authentication extension (MFA factors/challenges/drivers) | Optional add-on | [Portal MFA](/portal-mfa/) |
| `lordjoo/laraapigee` | Backend package | Apigee Edge/X client abstractions used by Portal Apigee-backed operations | Supporting dependency | Project package docs / source |
| `ninjaportal/portal-xmint` | Backend package | Monetization features on top of LaraApigee | Optional add-on | Project docs (future/expanded) |
| `backend/` | Laravel app | Runtime application, env, deployment, package wiring | Project root application | This site + app code |
| `docs/` | VitePress site | Architecture/config/extensibility/reference docs | This documentation project | You are here |

## Documentation coverage notes

This VitePress site documents the platform foundations and the packages currently most relevant for backend customization and API integration (`portal`, `portal-api`), plus selected optional extensions (for example `portal-mfa`).

Where a package is only referenced (for example `laraapigee`, `portal-xmint`), this site documents its role in the architecture and integration points, not a complete API reference.
