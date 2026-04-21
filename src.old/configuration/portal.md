# Portal Package Configuration (`ninjaportal`)

The Portal core package reads configuration from `config/ninjaportal.php`.

## Key sections

## `apigee_platform`

Controls which Apigee implementation the portal services use.

- `edge`
- `apigeex`

This is used by `NinjaPortal\Portal\Utils::getApigeeClient()` and by Apigee-facing services such as user app / credential services.

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

These values are used by repository bindings and policy registration, so model overrides propagate through the package.

## `translatable` (preferred)

Translation system configuration used by `HasTranslations`.

Important keys:

- `with_fallback`
- `fallback_locale`
- `locales`
- `translation_suffix` (default: `Translation`)
- `translation_model_namespace` (optional override namespace)

## `translations` + `locales` (backward compatibility)

The package keeps backward-compatible translation config keys, but new implementations should prefer `ninjaportal.translatable.*`.

## `settings.cache`

Controls runtime settings cache behavior.

- `enabled`
- `key`
- `ttl`

The `SettingService` loads settings and caches them to improve repeated reads.

## Example override (model customization)

```php
// config/ninjaportal.php
return [
    'models' => [
        'User' => App\Models\PortalUser::class,
        'Admin' => App\Models\PortalAdmin::class,
    ],
];
```

## Operational notes

- If you override models, keep the expected contracts/traits/features (for example auth-compatible models for users/admins).
- If custom models change table names, confirm `portal-api` model/table-aware validation still resolves correctly via `PortalApiContext`.
