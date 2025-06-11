# Events
NinjaPortal uses an event based architecture to allow adding custom logic to the portal. The events are triggered at different points in the portal lifecycle, and you can listen to these events and add your custom logic to them.

## Available Events
The following events are available in the portal:

- `UserAppCreatedEvent`
- `UserAppCredentialApproved`
- `UserAppCredentialCreated`
- `UserAppCredentialDeleted`
- `UserAppCredentialProductAdded`
- `UserAppCredentialProductRemoved`
- `UserAppCredentialRevoked`
- `UserAppDeletedEvent`
- `UserAppUpdatedEvent`
- `UserCreatedEvent`
- `UserDeletedEvent`
- `UserResetPasswordEvent`
- `UserUpdatedEvent`

## Listening to Events
In the ```NinjaPortalServiceProvider``` class, you can listen to the events by adding the event listeners to the ```$listen``` property.

```php
namespace App\Providers;

class NinjaPortalServiceProvider extends Provider
{
    // ...
    protected $listen = [
        Events\UserCreatedEvent::class => [
            App\Listeners\WelcomeEmailListener::class,
        ]
    ];
    // ...
}
```
