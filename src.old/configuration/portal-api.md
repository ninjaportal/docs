# Portal API Configuration (`portal-api`)

Portal API reads configuration from `config/portal-api.php`.

## `prefix` and `admin_prefix`

- `prefix` default: `api/v1`
- `admin_prefix` default: `admin`

This yields the default admin base path: `/api/v1/admin`.

## `middleware`

Default package middleware stack includes:

- `api`
- `ForceJsonResponse`
- `ApiExceptionMiddleware`

If you customize the stack, preserve JSON/error behavior unless you intentionally replace it.

## `auth`

### Models

- `consumer_model`
- `admin_model`

These can be overridden via env or config and are resolved by `PortalApiContext`.

### Guards

- `consumer` (default `api`)
- `admin` (default `portal_api_admin`)

`ApiServiceProvider` extends Laravel auth config at runtime to register JWT guards/providers for these contexts.

## `tokens`

JWT access + opaque refresh token settings:

- `access_ttl_minutes`
- `refresh_ttl_days`
- `jwt_secret` (falls back to `APP_KEY` if empty)
- `prune` schedule settings

Refresh tokens are stored hashed in `portal_api_refresh_tokens`.

## `pagination`

- `per_page`
- `max_per_page`

These values are used by list endpoints through controller helpers (`listParams`, `perPage`).

## `activity`

- `enabled`

Controls audit logging subscriber behavior (`PortalDomainActivitySubscriber`).

## `rbac`

Controls admin-route RBAC middleware behavior:

- `enabled`
- `bypass_roles`
- route permission names:
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

## Extending config-driven behavior

- Replace API authorization logic by binding `ApiAuthorizerInterface`
- Replace auth flow by binding `AuthFlowInterface`
- Replace token service by binding `TokenServiceInterface`

See [Portal API / Extending Portal API](/portal-api/extending).
