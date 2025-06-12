# Events

<!-- [[toc]] -->

## Introduction
Ninja Portal uses an [event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture), allowing you to hook into key lifecycle moments and add custom logic. Laravel makes it easy to listen for and handle events.

## Quick Example: Listening to an Event

Let's listen for the `UserCreatedEvent` in your service provider:

```php
<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use NinjaPortal\Portal\Events\UserCreatedEvent;
use App\Listeners\WelcomeEmailListener;

class NinjaPortalServiceProvider extends ServiceProvider
{
    protected $listen = [
        UserCreatedEvent::class => [
            WelcomeEmailListener::class,
        ],
    ];
}
```

## Available Events
- `NinjaPortal\Portal\Events\UserAppCreatedEvent`
- `NinjaPortal\Portal\Events\UserAppCredentialApproved`
- `NinjaPortal\Portal\Events\UserAppCredentialCreated`
- `NinjaPortal\Portal\Events\UserAppCredentialDeleted`
- `NinjaPortal\Portal\Events\UserAppCredentialProductAdded`
- `NinjaPortal\Portal\Events\UserAppCredentialProductRemoved`
- `NinjaPortal\Portal\Events\UserAppCredentialRevoked`
- `NinjaPortal\Portal\Events\UserAppDeletedEvent`
- `NinjaPortal\Portal\Events\UserAppUpdatedEvent`
- `NinjaPortal\Portal\Events\UserCreatedEvent`
- `NinjaPortal\Portal\Events\UserDeletedEvent`
- `NinjaPortal\Portal\Events\UserResetPasswordEvent`
- `NinjaPortal\Portal\Events\UserUpdatedEvent`

::: tip
You may create your own event listeners to extend portal functionality.
:::
