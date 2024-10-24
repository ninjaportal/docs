# Extending Services
Sometime you may need to change the behavior of a method in a service or
add a new method to a service, you can do that by extending the service

## Add new method to a service
All services in NinjaPortal services are [`Macroable`](https://laravel.com/api/11.x/Illuminate/Support/Traits/Macroable.html), 
which means you can add your own methods to the service.

```php
use NinjaPortal\Portal\Services\ApiProductService;

ApiProductService::macro('myMethod', function () {
    return 'myMethod';
});

$service = new ApiProductService();
$service->myMethod(); // myMethod

```

## Override a method in a service
You can override a method in a service by extending the service and overriding the method.

```php
use NinjaPortal\Portal\Services\ApiProductService;

class MyApiProductService extends ApiProductService
{
    public function all()
    {
        return 'all';
    }
}

$service = new MyApiProductService();
$service->all(); // all
```

and if you want to overwrite the service in the container you can bind the new service to the container.

```php
$this->app->bind(ApiProductService::class, MyApiProductService::class);
```

also you can scope your binding to a specific context by using the `when` method.

```php

$this->app->when(MyApiProductService::class)
    ->needs(ApiProductService::class)
    ->give(MyApiProductService::class);
```
