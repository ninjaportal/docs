# Portal: Config Reference

This is the package-specific configuration reference for `ninjaportal/portal`.

Primary config file:

- `config/ninjaportal.php`

## Overview

Portal configuration controls:

- Apigee platform implementation selection
- model overrides
- translation behavior
- runtime settings cache behavior

## `apigee_platform`

Controls which Apigee implementation the portal services use.

Supported values:

- `edge`
- `apigeex`

Used by:

- Portal utility/client resolution
- Apigee-facing domain services such as user app and credential services

## `models`

Override core model classes used by the package.

Supported keys:

- `Admin`
- `ApiProduct`
- `Audience`
- `Category`
- `Menu`
- `MenuItem`
- `Setting`
- `SettingGroup`
- `User`

How it is used:

- repository bindings resolve model implementations from config
- policy registration respects configured models
- service/repository contracts remain the same while implementations stay override-friendly

## `translatable` (preferred)

Translation system configuration used by `HasTranslations`.

Important keys:

- `with_fallback`
- `fallback_locale`
- `locales`
- `translation_suffix` (default: `Translation`)
- `translation_model_namespace` (optional namespace override)

Use this section for all new implementations.

## `translations` + `locales` (backward compatibility)

Portal keeps backward-compatible translation config keys. New deployments should prefer `ninjaportal.translatable.*`.

## `settings.cache`

Controls runtime settings cache behavior.

Keys:

- `enabled`
- `key`
- `ttl`

Used by:

- `SettingService` setting reads
- settings cache invalidation patterns (when observers/listeners are enabled)

## Example: model override

```php
// config/ninjaportal.php
return [
    'models' => [
        'User' => App\Models\PortalUser::class,
        'Admin' => App\Models\PortalAdmin::class,
    ],
];
```

## Example: translation config

```php
// config/ninjaportal.php
return [
    'translatable' => [
        'with_fallback' => true,
        'fallback_locale' => 'en',
        'locales' => ['en', 'ar'],
    ],
];
```

## Operational notes

- If you override models, preserve expected auth/model behavior and relationships used by Portal services and policies.
- If custom models change table names, verify dependent packages (especially `portal-api`) still resolve table-aware validation correctly.
- Document any custom config defaults in your application so team members know what differs from package defaults.

## Related pages

- [Portal / Installation & Configuration](/portal/installation-configuration)
- [Portal / How to Extend](/portal/extending)
- [Reference / Environment Variables](/configuration/env-reference)
