# Portal API: Installation & Configuration

This page covers installing `ninjaportal/portal-api` and wiring it into a Laravel application that already uses `ninjaportal/portal`.

## What this package adds

`ninjaportal/portal-api` provides:

- versioned REST routes (`api/v1` by default)
- public, consumer, and admin route groups
- auth endpoints and token lifecycle
- response envelope macros
- RBAC middleware composition
- policy authorization adapter
- activity logging
- Scribe API docs integration

## Installation

Install the API package:

```bash
composer require ninjaportal/portal-api
```

> `ninjaportal/portal` should be installed first because `portal-api` exposes the Portal domain.

## Publish configuration (optional but recommended)

```bash
php artisan vendor:publish --tag=portal-api-config
```

This creates `config/portal-api.php`.

## Migrations

Run migrations to create API package tables (refresh tokens, activity logs):

```bash
php artisan migrate
```

## Required configuration decisions

Review `config/portal-api.php` before production use:

### 1. Route prefixes

- `prefix` (default `api/v1`)
- `admin_prefix` (default `admin`)

### 2. Auth models and guards

Define/verify:

- `auth.consumer_model`
- `auth.admin_model`
- `auth.guards.consumer`
- `auth.guards.admin`

These are resolved through `PortalApiContext`.

### 3. Token settings

Configure:

- JWT access token TTL
- refresh token TTL
- JWT secret strategy
- refresh token pruning settings

### 4. RBAC and authorization behavior

Review:

- `rbac.enabled`
- route permission names in `rbac.*`
- `authorization.use_policies`

### 5. Public settings exposure

Review the allowlist in:

- `public_settings.groups`
- `public_settings.keys`

## Scribe docs setup (optional but recommended)

If you generate endpoint docs with Scribe:

```bash
php artisan scribe:generate --no-interaction
```

See:

- [Portal API / Scribe & API Docs](/portal-api/scribe)

## Verification checklist

1. API routes are registered (`php artisan route:list`)
2. `/api/v1/health` (or equivalent prefix path) responds
3. Consumer/admin auth routes resolve
4. `portal_api_refresh_tokens` and `portal_api_activity_logs` tables exist
5. Response envelope shape matches documented contract

## Related pages

- [Portal API / Features Covered](/portal-api/features-covered)
- [Portal API / DB Design](/portal-api/db-design)
- [Portal API / How to Use](/portal-api/how-to-use)
- [Portal API / Config Reference](/portal-api/config-reference)
