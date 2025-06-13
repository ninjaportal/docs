# Extending Services

<!-- [[toc]] -->

## Introduction

You may extend or customize Ninja Portal services to fit your application's requirements. Laravel's Macroable trait makes it easy to add new methods or override existing ones.

## Quick Example: Adding a Macro

All Ninja Portal services are [Macroable](https://api.laravel.com/docs/11.x/Illuminate/Support/Traits/Macroable.html), meaning you may dynamically add methods to them:

```php
<?php
use NinjaPortal\Portal\Services\ApiProductService;

ApiProductService::macro('myMethod', function () {
    return 'string';
});

$service = new ApiProductService();
echo $service->myMethod(); // string
````

## Overriding a Service Method

Alternatively, you may extend a service and override its methods:

```php
<?php
use NinjaPortal\Portal\Services\ApiProductService;

class MyApiProductService extends ApiProductService
{
    public function all()
    {
        return 'all';
    }
}

$service = new MyApiProductService();
echo $service->all(); // all
```

## Binding the Extended Service

To replace the service globally, bind your custom service in the container:

```php
$this->app->bind(ApiProductService::class, MyApiProductService::class);
```

## Scoped Binding

You may scope your binding to a specific context using Laravel's `when` method:

```php
$this->app->when(SomeController::class)
    ->needs(ApiProductService::class)
    ->give(MyApiProductService::class);
```
