# How to Use

This page assumes you want to build your own UI and/or your own integration layer on top of NinjaPortal.

The key idea is simple:

- use `ninjaportal/portal` services for domain logic
- use `ninjaportal/portal-api` if you want a ready-made API layer
- extend behavior through contracts/events instead of editing package internals

## What a service is doing (in NinjaPortal)

In NinjaPortal, a service usually does more than a raw database write.

A service typically:

1. validates or normalizes domain input (depending on the layer calling it)
2. applies business rules
3. calls the repository for persistence/query access
4. runs before/after hooks
5. dispatches domain events for extension points

That is why calling a service is the recommended integration path.

## Example: call a Portal service from your own code

```php
namespace App\Actions;

use NinjaPortal\Portal\Contracts\Services\CategoryServiceInterface;

class CreatePortalCategory
{
    public function __construct(private CategoryServiceInterface $categories) {}

    public function handle(array $payload): void
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

What happens behind the scenes:

- the service delegates persistence to the category repository
- translation payload is handled using the package translation conventions
- events can be dispatched for listeners (webhooks, analytics, etc.)

## If you build your own API/UI

You can ignore the shipped `portal-api` controllers and build your own controllers/endpoints while still using the same domain services.

Recommended approach:

- your controller/action validates the request
- call the relevant Portal service interface
- map the returned model/result to your own response format
- keep side effects in listeners, not controller methods

This gives you full control over the HTTP contract without losing the core domain behavior.

## How to add custom logic safely

You have three main options:

### 1. Replace a service implementation

Best for changing business rules.

Example: custom user creation constraints, tenant-aware product rules.

### 2. Add an event listener

Best for side effects.

Example: webhooks, analytics, CRM sync, notifications.

### 3. Add model observers

Best for low-level model lifecycle reactions.

Example: search indexing or denormalized caches.

## Example: extend a service with custom business logic

```php
namespace App\Portal\Services;

use Illuminate\Validation\ValidationException;
use NinjaPortal\Portal\Services\UserService;

class EnterpriseUserService extends UserService
{
    protected function mutateDataBeforeCreate(array $data): array
    {
        $data = parent::mutateDataBeforeCreate($data);

        if (! str_ends_with(strtolower((string) ($data['email'] ?? '')), '@example.com')) {
            throw ValidationException::withMessages([
                'email' => ['Only company email addresses are allowed.'],
            ]);
        }

        return $data;
    }
}
```

Bind it to the package contract:

```php
$this->app->singleton(
    \NinjaPortal\Portal\Contracts\Services\UserServiceInterface::class,
    \App\Portal\Services\EnterpriseUserService::class,
);
```

## Use the shipped API when it fits

If the prebuilt API already matches your needs, use `ninjaportal/portal-api` and focus your customization on:

- auth flow (`AuthFlowInterface`)
- token service (`TokenServiceInterface`)
- authorization (`ApiAuthorizerInterface`)
- events/listeners

See:

- [Introduction / API](/introduction/api)
- [Introduction / Authentication & Authorization](/introduction/authentication-authorization)
- [Deepdive / Extending the Portal](/deepdive/extending-the-portal)

