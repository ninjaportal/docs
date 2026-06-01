# Portal API Package

`ninjaportal/portal-api` is the API-first package for NinjaPortal.

It sits on top of the core `portal` package and exposes the portal domain through versioned REST endpoints. Use it when you want NinjaPortal to provide the API layer for admin panels, developer portals, mobile apps, or other clients.

## What It Adds

| Capability | Description |
| --- | --- |
| Versioned routes | Routes are registered under `api/v1` by default. |
| Admin API | Endpoints for users, admins, products, categories, audiences, menus, settings, RBAC, activities, and dashboard stats. |
| Consumer API | Endpoints for developer registration, login, profile management, apps, credentials, and product access. |
| Public API | Public catalog and runtime config endpoints. |
| Authentication | JWT access tokens with opaque database-backed refresh tokens. |
| RBAC | Spatie permission middleware for admin routes. |
| Policies | Optional controller-level policy checks. |
| Activity logs | Records important portal domain activity into API activity logs. |
| Scribe docs | Generates interactive API documentation, OpenAPI, and Postman output. |

## Default Route Shape

| Area | Default path |
| --- | --- |
| Health | `/api/v1/health` |
| Public catalog | `/api/v1/api-products` |
| Public config | `/api/v1/config` |
| Consumer auth | `/api/v1/auth/*` |
| Consumer profile/apps | `/api/v1/me/*` |
| Admin auth | `/api/v1/admin/auth/*` |
| Admin resources | `/api/v1/admin/*` |

The base prefix and admin prefix are configurable through `config/portal-api.php`.

## Package Design

The API package keeps the same NinjaPortal design rules:

- Controllers stay thin.
- Domain work is delegated to `portal` services.
- Authentication is abstracted behind `AuthFlowInterface`.
- Token lifecycle is abstracted behind `TokenServiceInterface`.
- Authorization is abstracted behind `ApiAuthorizerInterface`.
- API responses use a consistent JSON envelope.
- Scribe annotations live close to controllers and requests.

This means you can use the shipped endpoints as-is, or replace selected pieces without forking the package.

## Pages In This Section

- [Installation](./installation.md)
- [How To Use](./how-to-use.md)
- [Authentication](./authentication.md)
