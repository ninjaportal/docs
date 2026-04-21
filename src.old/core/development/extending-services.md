# Extending Services

Services are the integration point for most customizations. Here are four patterns you can use.

## 1. Macros (quick helpers)

All services use Laravel’s `Macroable` trait:

```php
use NinjaPortal\Portal\Services\ApiProductService;

ApiProductService::macro('featured', function () {
    return $this->repository()->getBuilder()
        ->where('metadata->featured', true)
        ->with('categories')
        ->get();
});

app(ApiProductService::class)->featured();
```

Macros are great for adding read-only helpers or temporary experiments.

## 2. Subclass + binding

Create your own service class that extends the base service and override methods.

```php
class CustomWalletService extends WalletService
{
    public function credit($wallet, MoneyData $amount, $ref = null, array $context = [])
    {
        Log::info('Wallet credit requested', compact('wallet', 'amount', 'ref'));

        return parent::credit($wallet, $amount, $ref, $context);
    }
}

$this->app->bind(WalletServiceInterface::class, CustomWalletService::class);
```

Every part of the portal (Shadow, NinjaAdmin, XMint Filament) now uses your subclass.

## 3. Contextual binding

Need a custom service only for a single controller/job?

```php
$this->app->when(AdminFeedController::class)
    ->needs(ApiProductServiceInterface::class)
    ->give(AdminApiProductService::class);
```

Other controllers still resolve the default implementation.

## 4. Event listeners

Services fire events (e.g., `WalletCredited`, `RateplanPublished`). Sometimes the cleanest extension is simply to listen for the event and run your own job:

```php
Event::listen(WalletCredited::class, fn ($event) =>
    CustomerSuccess::notifyTopUp($event->wallet, $event->amount)
);
```

## 5. Building new APIs on top of services

Create controllers/jobs that inject service interfaces. Example: a “public products” REST endpoint.

```php
class PublicProductController
{
    public function __construct(private ApiProductServiceInterface $products) {}

    public function __invoke()
    {
        return ProductResource::collection($this->products->publicFeed());
    }
}
```

Keeping logic in services ensures your APIs, admin panel, and add-ons all stay in sync when the core package evolves.
