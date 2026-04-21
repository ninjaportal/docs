# Extension Examples (Portal Core)

This page shows practical extension patterns for the Portal package.

## Extension strategy menu

### 1. Replace a model class (config)

Use `config/ninjaportal.php` `models.*` when you need custom attributes/relations/casts.

Best for:

- adding tenant columns
- custom auth behavior on `User`/`Admin`
- extra domain relations

### 2. Replace a service binding (container)

Bind your service implementation to the existing service interface.

Best for:

- changing business rules
- injecting external integrations
- adding hook logic

### 3. Add event listeners (preferred for side effects)

Register listeners for built-in domain events.

Best for:

- notifications
- webhooks
- analytics
- data sync to other systems

### 4. Add observers using `BasePortalServiceProvider`

Use `BasePortalServiceProvider` in your application to register observers or event listeners in a consistent way.

## Example: Custom `UserService` for enterprise validation

```php
namespace App\Portal\Services;

use NinjaPortal\Portal\Services\UserService;
use Illuminate\Validation\ValidationException;

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

Bind it:

```php
$this->app->singleton(
    \NinjaPortal\Portal\Contracts\Services\UserServiceInterface::class,
    \App\Portal\Services\EnterpriseUserService::class,
);
```

## Example: Register custom event listeners and observers

```php
namespace App\Providers;

use App\Listeners\SendApiProductWebhook;
use App\Observers\UserObserver;
use NinjaPortal\Portal\Events\ApiProduct\ApiProductUpdatedEvent;
use NinjaPortal\Portal\Models\User;
use NinjaPortal\Portal\Providers\BasePortalServiceProvider;

class NinjaPortalExtensionServiceProvider extends BasePortalServiceProvider
{
    protected $listen = [
        ApiProductUpdatedEvent::class => [
            SendApiProductWebhook::class,
        ],
    ];

    protected $observers = [
        User::class => [UserObserver::class],
    ];
}
```

## Example: Extend settings behavior safely

The package already includes a `SettingObserver` that updates settings cache/service state. If you add your own listener/observer around settings changes, avoid duplicating writes back into the same setting in a loop.

## Extension checklist

- keep interface contracts stable when replacing bindings
- preserve event dispatch behavior in custom services
- document custom permissions/policies if you alter RBAC semantics
- add package/app tests around custom listeners and auth flows
