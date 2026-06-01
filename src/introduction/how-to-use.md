# How to Use
The recommended way to use the portal package is to call the service contracts from your Laravel application.

You don't need to use the models directly from your controllers.
The services already handle the package flow, events, hooks, and extension points.

## Register a Developer from an API Route
Here is a small example where your application exposes an API route to register a developer.

```php
use App\Http\Controllers\Api\RegisterDeveloperController;
use Illuminate\Support\Facades\Route;

Route::post('/developers', RegisterDeveloperController::class);
```

Then in the controller, inject the portal user service.

```php
<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use NinjaPortal\Portal\Contracts\Services\UserServiceInterface;

class RegisterDeveloperController
{
    public function __construct(
        private UserServiceInterface $users,
    ) {}

    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $developer = $this->users->create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'status' => 'active',
        ]);

        return response()->json([
            'id' => $developer->id,
            'email' => $developer->email,
            'status' => $developer->status,
        ], 201);
    }
}
```

This creates the developer in the portal database.

After that, the package fires `UserCreatedEvent`.
The sync listener is registered in the published `App\Providers\NinjaPortalServiceProvider`, so the listener can create or update the same developer in Apigee.

## Register the Apigee Sync Listener
When you install the package, it publishes `App\Providers\NinjaPortalServiceProvider`.

This provider is the place where application level portal listeners and observers live.

The default provider wires the user events to the Apigee sync listener, and this is where the sync events are registered:

```php
use NinjaPortal\Portal\Events;
use NinjaPortal\Portal\Listeners;

protected $listen = [
    Events\User\UserCreatedEvent::class => [
        Listeners\SyncUserWithApigeeListener::class,
    ],
    Events\User\UserUpdatedEvent::class => [
        Listeners\SyncUserWithApigeeListener::class,
    ],
];
```

So your controller doesn't need to talk to Apigee directly.

The flow becomes:

```text
API Route
  -> Controller
  -> UserServiceInterface::create()
  -> users table
  -> UserCreatedEvent
  -> SyncUserWithApigeeListener
  -> Apigee developer is created or updated
```

## Why Events Matter
This event based flow is useful because you can add more actions later without changing the controller.

For example, after a developer is created you may want to:

- send a welcome email
- notify an internal system
- add analytics
- sync the developer with another service
- queue the Apigee sync instead of doing it inline

You can do that by listening to the same event.

## Working with Developer Apps
Creating the developer account is only one part of the portal.

When you need to create developer apps or app credentials in Apigee, use the Apigee backed services.

For example, inject `UserAppServiceInterface` where you need to create apps:

```php
use NinjaPortal\Portal\Contracts\Services\UserAppServiceInterface;

class CreateDeveloperAppAction
{
    public function __construct(
        private UserAppServiceInterface $apps,
    ) {}

    public function run(string $developerEmail)
    {
        return $this->apps->create($developerEmail, [
            'name' => 'my-first-app',
            'displayName' => 'My First App',
            'apiProducts' => ['orders-api'],
        ]);
    }
}
```

These services also fire events after successful actions, so you can keep side effects outside your controllers.

## Out of the Box Packages
The core `ninjaportal/portal` package gives you the domain layer.

If you don't want to build everything around it yourself, there are out-of-the-box packages:

- `ninjaportal/portal-api` gives you a ready API layer on top of the portal package.
- `ninjaportal/admin-filament` gives you a Filament admin panel to manage portal resources.
- `ninjaportal/shadow-theme` can be used when you want a frontend portal experience.

So you can choose the level you need.

Use only the core package when you want to build your own API or UI.
Use the official packages when you want the ready made API and admin experience.
