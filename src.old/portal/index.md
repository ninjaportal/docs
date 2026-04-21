# Portal Package Overview (`ninjaportal/portal`)

The Portal package is the domain core of NinjaPortal. It contains the platform's primary models, repositories, services, policies, events, and translation support.

## What the package owns

- domain models (`User`, `Admin`, `ApiProduct`, `Category`, `Audience`, `Menu`, `MenuItem`, `Setting`, `SettingGroup`)
- repository contracts + implementations
- service contracts + implementations
- CRUD operation conventions via `CrudOperationsTrait`
- domain events for CRUD and sync actions
- policy classes and policy registration
- translation system (`HasTranslations`)
- Apigee-facing domain services (developer apps and credentials)

## Service provider responsibilities

`PortalServiceProvider`:

- registers repository bindings (model-aware and override-friendly)
- registers service bindings
- publishes provider stub and migrations
- registers translatable locale helper (`translatable.locales`)
- registers policies for core models
- loads settings via `SettingService`
- registers built-in password reset notification listener

## Architectural style in this package

### Data access

- repositories encapsulate Eloquent access
- services call repositories and own business behavior
- controllers (in other packages/apps) should call services, not repositories directly

### Extensibility

- CRUD services expose hook methods (before/after create/update/delete/restore)
- services dispatch events for important actions
- `BasePortalServiceProvider` exists as a helper base for application-level event listeners and observers

## Key files to know

- `src/PortalServiceProvider.php`
- `src/Common/Repositories/BaseRepository.php`
- `src/Services/BaseService.php`
- `src/Services/Traits/CrudOperationsTrait.php`
- `src/Services/Traits/FireEventsTrait.php`
- `src/Providers/BasePortalServiceProvider.php`
- `src/Translatable/HasTranslations.php`

## Next steps

- [Installation & Configuration](/portal/installation-configuration)
- [Features Covered](/portal/features-covered)
- [DB Design](/portal/db-design)
- [How to Use](/portal/how-to-use)
- [Config Reference](/portal/config-reference)
- [Models, Repositories & Services](/portal/models-services)
- [Hooks & Events](/portal/hooks-events)
- [Translations](/portal/translations)
- [RBAC & Policies](/portal/rbac)
- [Apigee Integration](/portal/apigee-integration)
- [How to Extend](/portal/extending)
