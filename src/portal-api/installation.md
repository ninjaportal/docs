# Installation

Install the Portal API package into your Laravel application like any normal Composer package.

```bash
composer require ninjaportal/portal-api
```

The package depends on the core `ninjaportal/portal` package, so make sure the core package is installed and configured first.

## Publish Configuration

Publish the package config when you need to customize route prefixes, guards, token TTLs, activity logging, RBAC, or public settings exposure.

```bash
php artisan vendor:publish --tag=portal-api-config
```

This creates:

```text
config/portal-api.php
```

## Run Migrations

Run migrations after installing the package:

```bash
php artisan migrate
```

The package adds:

| Table | Purpose |
| --- | --- |
| `portal_api_refresh_tokens` | Stores hashed opaque refresh tokens for admin and consumer contexts. |
| `portal_api_activity_logs` | Stores API/domain activity records for the admin activity log. |

It also includes an admin RBAC guard seeder migration for the API guard setup.

## Configure Environment

Common environment variables:

```dotenv
PORTAL_API_PREFIX=api/v1
PORTAL_API_ADMIN_PREFIX=admin

PORTAL_API_CONSUMER_GUARD=api
PORTAL_API_ADMIN_GUARD=admin

PORTAL_API_ACCESS_TTL=15
PORTAL_API_REFRESH_TTL=30
PORTAL_API_JWT_SECRET=

PORTAL_API_ACTIVITY_ENABLED=true
PORTAL_API_ACTIVITY_QUEUE=false

PORTAL_API_RBAC_ENABLED=true
PORTAL_API_USE_POLICIES=true
```

If `PORTAL_API_JWT_SECRET` is empty, the package falls back to your Laravel `APP_KEY`.

## Auth Models

By default, the package provides JWT-ready models:

| Context | Default model |
| --- | --- |
| Consumer | `NinjaPortal\Api\Models\User` |
| Admin | `NinjaPortal\Api\Models\Admin` |

Override them when your project has its own models:

```dotenv
PORTAL_API_CONSUMER_MODEL=App\\Models\\Developer
PORTAL_API_ADMIN_MODEL=App\\Models\\Admin
```

Custom models should be compatible with JWT auth. The API package models extend the core portal models and implement the JWT subject contract for you.

## Optional Scribe Setup

The API documentation is generated with Scribe.

If your application does not already include Scribe, install it:

```bash
composer require --dev knuckleswtf/scribe
```

Then publish and configure Scribe for your application:

```bash
php artisan vendor:publish --tag=scribe-config
```

NinjaPortal expects Scribe to scan the API routes under `api/v1/*`.

## Verify Installation

Start by checking the health endpoint:

```bash
curl http://localhost:8000/api/v1/health
```

Then generate the API docs:

```bash
php artisan scribe:generate
```

If Scribe routes are enabled, open:

```text
/docs
```
