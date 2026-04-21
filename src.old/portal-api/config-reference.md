# Portal API: Config Reference

This is the package-specific configuration reference for `ninjaportal/portal-api`.

Primary config file:

- `config/portal-api.php`

## Overview

Portal API configuration controls:

- route prefixes
- middleware stack
- auth models and guards
- token settings
- pagination defaults
- activity logging behavior
- RBAC middleware behavior
- policy authorization behavior
- public settings exposure

## `prefix` and `admin_prefix`

- `prefix` default: `api/v1`
- `admin_prefix` default: `admin`

These combine to form the default admin base path:

- `/api/v1/admin`

## `middleware`

Default package middleware stack typically includes:

- `api`
- `ForceJsonResponse`
- `ApiExceptionMiddleware`

If you customize this stack, preserve JSON/error behavior unless you intentionally replace it.

## `auth`

### Models

- `consumer_model`
- `admin_model`

These are resolved by `PortalApiContext`, allowing model/table-aware behavior across requests/controllers.

### Guards

- `consumer` (default `api`)
- `admin` (default `portal_api_admin`)

`ApiServiceProvider` extends Laravel auth config at runtime to register JWT guards/providers for these contexts.

## `tokens`

JWT access + opaque refresh token settings:

- `access_ttl_minutes`
- `refresh_ttl_days`
- `jwt_secret` (falls back to `APP_KEY` if empty)
- prune scheduling settings

Notes:

- access tokens are JWTs
- refresh tokens are stored hashed in `portal_api_refresh_tokens`
- refresh tokens are rotated on refresh

## `pagination`

- `per_page`
- `max_per_page`

These are used by controller helpers (for example `listParams()` / `perPage()` patterns) to keep list endpoints consistent.

## `activity`

- `enabled`

Controls audit logging subscriber behavior (`PortalDomainActivitySubscriber`).

## `rbac`

Controls admin-route RBAC middleware behavior:

- `enabled`
- `bypass_roles`
- route permission names such as:
  - `access_admin`
  - `manage_rbac`
  - `manage_admins`
  - `view_activities`

## `authorization`

- `use_policies`

When enabled, controllers call the bound `ApiAuthorizerInterface` (default `PolicyApiAuthorizer`) for model-level authorization checks.

## `public_settings`

Controls which settings are exposed through the public config endpoint.

- `groups`
- `keys`

Use this as an allowlist and avoid exposing sensitive settings.

## Extending config-driven behavior

You can change behavior without controller forks by binding:

- `AuthFlowInterface`
- `TokenServiceInterface`
- `ApiAuthorizerInterface`

See:

- [Portal API / How to Extend](/portal-api/extending)

## Related pages

- [Portal API / Installation & Configuration](/portal-api/installation-configuration)
- [Portal API / How to Use](/portal-api/how-to-use)
- [Reference / Environment Variables](/configuration/env-reference)

