# Models, Repositories & Services

## Pattern overview

Portal follows a repository + service pattern:

- **Model**: persistence structure + relations + scopes
- **Repository**: data access and query composition
- **Service**: business logic, hooks, event dispatching, orchestration

## Repositories

### Base repository (`BaseRepository`)

`NinjaPortal\Portal\Common\Repositories\BaseRepository` provides a shared implementation for common operations:

- `list()`
- `paginate()`
- `create()`
- `update()`
- `delete()`
- `restore()` (guarded; requires `SoftDeletes` on the model)
- `find*()` helpers
- scope controls (`shouldApplyScopes`, `onlyForCurrentUser`, `alwaysLoad`)

It also applies model scopes like `search()` and `filter()` automatically when present.

## Services

### Standard CRUD services

Most Portal services:

- extend `BaseService`
- use `CrudOperationsTrait`
- inject a repository interface
- dispatch domain events automatically through `FireEventsTrait`

Examples:

- `AdminService`
- `AudienceService`
- `CategoryService`
- `MenuService`
- `MenuItemService`
- `SettingService`
- `UserService`

### Non-CRUD / external-provider services

Some services orchestrate external APIs (Apigee) and therefore use a different implementation style while still supporting hooks/events:

- `UserAppService`
- `UserAppCredentialService`

These services intentionally do not use the repository pattern because their data source is Apigee, not your local DB.

## Model highlights

### `User`

Portal developer/consumer user model.

- auth-capable (`Authenticatable`)
- audience relation (`belongsToMany`)
- password reset support (via Laravel behavior)
- custom attributes JSON support

### `Admin`

Admin/dashboard user model.

- auth-capable (`Authenticatable`)
- used by `portal-api` admin auth/guard context

### `ApiProduct`

Portal catalog representation of an Apigee product.

- translatable fields (`name`, `description`, `short_description`, `thumbnail`)
- categories and audiences many-to-many relations
- search/filter scopes
- JSON `tags` and `custom_attributes`

### `Category`, `Menu`, `MenuItem`

Content/navigation models with translation support on text fields.

### `Setting` + `SettingGroup`

Runtime key/value settings with typed values and grouping.

## Binding system and model overrides

The portal service provider uses a declarative binding map for repositories/services.
Repository bindings can resolve model classes from config (for example `config:ninjaportal.models.User`).

This makes the package override-friendly without editing package source.

## Example: using a service from app code

```php
use NinjaPortal\Portal\Contracts\Services\CategoryServiceInterface;

class CategorySyncAction
{
    public function __construct(private CategoryServiceInterface $categories) {}

    public function run(array $payload): void
    {
        $this->categories->create([
            'slug' => $payload['slug'],
            'en' => [
                'name' => $payload['name'],
                'description' => $payload['description'] ?? null,
            ],
        ]);
    }
}
```

This preserves hooks, events, and translation handling implemented by the service/model layer.
