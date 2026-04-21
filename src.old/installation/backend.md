# Backend Setup

This page documents the recommended application setup for production-style usage, where NinjaPortal packages are installed from Composer like any other PHP package.

## Install application dependencies

From your Laravel application root:

```bash
composer install
```

## Install NinjaPortal packages via Composer

Install the core package first, then optional extensions as needed:

```bash
composer require ninjaportal/portal
composer require ninjaportal/portal-api
```

Optional authentication extension package:

```bash
composer require ninjaportal/portal-mfa
```

> Install `ninjaportal/portal-mfa` only if you want MFA-enabled auth flows.

## Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

Set at minimum:

- database connection values
- app URL
- mailer settings (required for password resets and MFA email OTP testing)
- Apigee credentials/config used by `lordjoo/laraapigee`

## Authenticate with Apigee (via LaraApigee)

Portal uses `lordjoo/laraapigee` for Apigee-backed operations.

Before using app/credential operations or Apigee sync workflows, configure LaraApigee authentication.

Typical LaraApigee settings include:

- organization and endpoint
- platform selection (`edge` / `apigeex`)
- credentials:
  - Edge: username/password-style credentials
  - Apigee X: service-account key file (`key_file`)

Common config keys:

- `laraapigee.organization`
- `laraapigee.endpoint`
- `laraapigee.username`
- `laraapigee.password`
- `laraapigee.key_file`

> Dedicated LaraApigee documentation will be added later. For now, use the LaraApigee package README/config file as the setup reference.

## Publish package assets (if required)

Most package providers are auto-discovered. Publish configs/migrations only when you need to customize them.

Examples:

```bash
php artisan vendor:publish --tag=portal-config
php artisan vendor:publish --tag=portal-api-config
php artisan vendor:publish --tag=portal-mfa-config
```

## Migrate database

```bash
php artisan migrate
```

## Seed RBAC / initial data (recommended)

Use your project seed flow. For portal package RBAC baseline, ensure `NinjaPortal\Portal\Seeders\RbacSeeder` runs in your seeding pipeline.

## Package enablement notes

- `ninjaportal/portal-api` exposes versioned API routes and auth/token flows.
- `ninjaportal/portal-mfa` auto-discovers its provider and overrides `portal-api` `AuthFlowInterface` binding when enabled.
- Review package configuration pages before first production deployment:
  - [Portal Package Config](/configuration/portal)
  - [Portal API Package Config](/configuration/portal-api)
  - [Portal MFA Package Config](/configuration/portal-mfa)
