# Auth
The NinjaPortal doesnt add anything fancy related to authentication, we just ship two authenticatable models ```User``` and ```Admin```,
and you can use them as you would normally do in Laravel, for example:

```php
// config/auth.php

'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'admin' => [
        'driver' => 'session',
        'provider' => 'admins',
    ],
],

'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => NinjaPortal\Portal\Models\User::class,
    ],

    'admins' => [
        'driver' => 'eloquent',
        'model' => NinjaPortal\Portal\Admin::class,
    ],
],
```