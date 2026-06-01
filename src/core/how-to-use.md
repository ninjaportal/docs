# How To Use The Core Package

You can use NinjaPortal without adopting the shipped `portal-api` controllers.

The recommended approach is to build your own controllers or API endpoints on top of the core service contracts. This keeps your application free to define its own routes, request validation, responses, guards, and frontend experience while still using the same portal domain logic.

## Typical Flow

Most custom endpoints follow this shape:

1. Validate the request in your controller or form request.
2. Call a `portal` service contract.
3. Return the response format your application prefers.
4. Let the service handle repositories, hooks, events, and sync listeners.

```text
HTTP request
  -> Your controller
  -> Portal service contract
  -> Repository contract
  -> Portal database
  -> Domain event
  -> Listener or integration
  -> Apigee
```

## Register A New Developer

This example shows a custom API endpoint that registers a developer using the core `UserServiceInterface`.

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use NinjaPortal\Portal\Contracts\Services\UserServiceInterface;

class DeveloperRegistrationController extends Controller
{
    public function store(Request $request, UserServiceInterface $users): JsonResponse
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email'),
            ],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $developer = $users->create($data);

        return response()->json([
            'message' => 'Developer registered.',
            'data' => [
                'id' => $developer->getKey(),
                'email' => $developer->email,
                'first_name' => $developer->first_name,
                'last_name' => $developer->last_name,
                'status' => $developer->status,
            ],
        ], 201);
    }
}
```

Then register the route in your application:

```php
use App\Http\Controllers\Api\DeveloperRegistrationController;
use Illuminate\Support\Facades\Route;

Route::post('/developers/register', [DeveloperRegistrationController::class, 'store']);
```

## What Happens Internally

Calling `UserServiceInterface::create()` keeps the operation inside the portal domain flow.

| Step | What happens |
| --- | --- |
| Service hook | `beforeCreate` can run custom logic before persistence. |
| Mutation | The user service applies package defaults such as the default user status. |
| Repository | The user is created through the configured repository implementation. |
| Service hook | `afterCreate` can run custom logic after persistence. |
| Event | The service fires the user-created domain event. |
| Listener | Built-in or custom listeners can sync the developer with Apigee. |

This is why controllers should usually call services instead of directly creating Eloquent models.

## When To Use Portal API Instead

Use `portal-api` when you want NinjaPortal to provide the API layer for you.

Use custom controllers when you want:

- A different response structure.
- A different authentication flow.
- Different route names or prefixes.
- Extra validation or approval steps.
- A custom frontend or mobile API contract.

Both approaches use the same core package underneath.
