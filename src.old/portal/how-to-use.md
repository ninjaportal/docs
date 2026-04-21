# Portal: How to Use

This page shows the recommended way to use `ninjaportal/portal` from your Laravel application code.

## Golden rule

Prefer **service interfaces** for business actions.

Use repositories only when you are intentionally working at the data-access/query layer.

Why:

- services preserve hooks and event dispatching
- services centralize business rules
- services remain stable extension seams for client-specific overrides

## Typical usage patterns

### 1. Resolve a service from the container

```php
use NinjaPortal\Portal\Contracts\Services\CategoryServiceInterface;

class CreateCategoryAction
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

### 2. Read/write settings through `SettingService`

Use the service instead of querying the `settings` table directly so you benefit from:

- typed casting
- cache integration
- package conventions

### 3. Use events for side effects

When extending behavior (webhooks, analytics, notifications), listen to domain events instead of modifying package services directly.

See:

- [Portal / Hooks & Events](/portal/hooks-events)
- [Cookbook](/cookbook/)

### 4. Register observers/listeners with `BasePortalServiceProvider`

Use `NinjaPortal\Portal\Providers\BasePortalServiceProvider` in your application or extension package to register:

- listeners
- subscribers
- model observers

This keeps customization code structured and package-friendly.

## Working with translations

Translatable models accept locale-keyed payload sections (for example `en`, `ar`) depending on your configured locales and model setup.

Read the translation deep dive before customizing translated models:

- [Portal / Translations](/portal/translations)

## Working with Apigee-backed operations

Some Portal services orchestrate Apigee APIs and intentionally do not use local repositories because the source of truth is external (Apigee).

Examples:

- `UserAppService`
- `UserAppCredentialService`

Use these services through their contracts and handle them as integration/application services (including retries/logging at app level where appropriate).

See:

- [Portal / Apigee Integration](/portal/apigee-integration)

## Authorization in application code

Portal provides policies and conventions, but actual enforcement depends on how your application/API layer calls them.

For HTTP APIs, this is typically handled in `portal-api` controllers through the authorizer interface.

See:

- [Portal / RBAC & Policies](/portal/rbac)
- [Portal API / How to Use](/portal-api/how-to-use)

## Recommended customization workflow

1. Start with the existing service/repository/policy contract
2. Decide whether your change is:
   - data access customization
   - business logic override
   - side effect (event listener)
   - auth/policy integration
3. Implement in your application or extension package
4. Add tests around the integration seam you replaced

## Related pages

- [Portal / Models, Repositories & Services](/portal/models-services)
- [Portal / Hooks & Events](/portal/hooks-events)
- [Portal / How to Extend](/portal/extending)
