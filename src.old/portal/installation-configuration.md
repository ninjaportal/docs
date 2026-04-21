# Portal: Installation & Configuration

This page covers installing `ninjaportal/portal` into your Laravel application and the minimum configuration decisions you should make before using it in production.

## What this package installs

`ninjaportal/portal` is the domain core package. It provides:

- core models (users, admins, API products, categories, audiences, menus, settings)
- repository + service layers
- events and extension hooks
- policy registration conventions
- translations support (`HasTranslations`)
- Apigee-facing domain services (apps and credentials)

## Installation

Install the package in your Laravel application:

```bash
composer require ninjaportal/portal
```

## Publish configuration (optional but recommended)

If you need to customize models, translation behavior, or settings cache, publish the package config:

```bash
php artisan vendor:publish --tag=portal-config
```

This creates `config/ninjaportal.php` in your application.

## Publish / run migrations

Depending on your installation workflow, package migrations may be auto-loaded or published. Run:

```bash
php artisan migrate
```

## Seed baseline RBAC data (recommended)

Ensure your seed pipeline runs the Portal RBAC seeder (or equivalent project seeder wrapping it):

- `NinjaPortal\Portal\Seeders\RbacSeeder`

This seeds the permission naming conventions expected by Portal policies.

## Minimum configuration decisions

Before first production use, review these areas in `config/ninjaportal.php`:

### 1. Apigee platform

Choose which Apigee implementation to target:

- `edge`
- `apigeex`

This affects the Apigee-facing services used by app/credential operations.

### 2. Model overrides

If your application needs custom user/admin models or additional domain fields/relations, configure `models.*` overrides.

Examples:

- `User`
- `Admin`
- `ApiProduct`
- `Category`
- `Audience`
- `Menu`
- `MenuItem`
- `Setting`
- `SettingGroup`

### 3. Translation behavior

Review `translatable.*` keys for:

- enabled locales
- fallback locale
- translation model naming
- fallback behavior

### 4. Settings cache behavior

If runtime settings are used heavily, configure `settings.cache`:

- `enabled`
- `key`
- `ttl`

## Verification checklist

After installation:

1. `php artisan migrate` completes successfully
2. Core tables exist (users, API products, audiences, settings, translations, menus)
3. `config/ninjaportal.php` exists (if you published config)
4. Model overrides (if any) resolve correctly
5. Portal services can be resolved from the container

## Related pages

- [Portal / Features Covered](/portal/features-covered)
- [Portal / DB Design](/portal/db-design)
- [Portal / How to Use](/portal/how-to-use)
- [Portal / Config Reference](/portal/config-reference)
