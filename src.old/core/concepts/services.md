# Repositories & Services

Ninja Portal enforces a Repository/Service pattern. Every domain exposes:

```
Contracts\Repositories\*RepositoryInterface
Contracts\Services\*ServiceInterface

Repositories\*Repository extends BaseRepository
Services\*Service extends BaseService
```

Bindings are declared once in the service provider using `RegistersBindings`. Controllers, jobs, and add-ons resolve the interfaces—never the concrete classes—so you can swap implementations centrally.

## 1. Repository Layer

`BaseRepository` wraps an Eloquent model and offers:

- CRUD helpers (`create`, `update`, `delete`, `find`, `paginate`, `list`).
- `getBuilder()` to access the underlying query builder with global scopes applied.
- `onlyForCurrentUser()` to scope records to the authenticated user.
- Automatic metadata merging for JSON columns.

### Using Repositories Directly

```php
class CatalogController
{
    public function __construct(private ApiProductRepositoryInterface $products) {}

    public function __invoke()
    {
        return $this->products
            ->getBuilder()
            ->where('visibility', 'public')
            ->with('categories')
            ->orderByDesc('updated_at')
            ->get();
    }
}
```

### Core Repository Catalog

| Interface | Responsibilities |
|-----------|------------------|
| `ApiProductRepositoryInterface` | Query/sync API products, eager-load categories/audiences, attach metadata. |
| `CategoryRepositoryInterface` | Manage taxonomy and product assignments. |
| `AudienceRepositoryInterface` | Assign audiences to users/products for access control. |
| `MenuRepositoryInterface` / `MenuItemRepositoryInterface` | Build navigation trees consumed by the public theme. |
| `SettingRepositoryInterface` | CRUD grouped portal settings. |
| _See [Apigee X Monetization](monetization.md)_ | Monetization repositories are documented separately so they can evolve independently. |

### Overriding a Repository

```php
class CustomApiProductRepository extends ApiProductRepository
{
    public function getBuilder(...$args)
    {
        return parent::getBuilder(...$args)->whereNull('archived_at');
    }
}

$this->app->bind(
    ApiProductRepositoryInterface::class,
    fn ($app) => new CustomApiProductRepository(app(App\Models\ApiProduct::class))
);
```

Because services resolve repositories through the interface, every consumer immediately uses the new behavior.

## 2. Service Layer

Services encapsulate business rules. `BaseService` provides:

- CRUD delegation to the repository.
- Lifecycle hooks (`mutateDataBeforeCreate`, `mutateDataBeforeUpdate`).
- Event dispatching via `FireEventsTrait` (`{Model}Creating`, domain events like `WalletCredited`).
- `Macroable` so you can add helper methods without subclassing.

### Core Service Interfaces

| Interface | Highlights |
|-----------|------------|
| `ApiProductServiceInterface` | Publish/sync Apigee products, build public feeds, manage visibility/audiences. |
| `CategoryServiceInterface` | Maintain taxonomy and assignments. |
| `MenuServiceInterface` | Produce structured navigation payloads. |
| `SettingServiceInterface` | Provide cached access to grouped settings. |
| _See [Apigee X Monetization](monetization.md)_ | Portal-XMint exposes dedicated rate plan, wallet, and subscription services scoped to Apigee Monetization. |

### Injecting Services in Controllers

```php
class PublicFeedController
{
    public function __construct(private ApiProductServiceInterface $products) {}

    public function __invoke()
    {
        return ProductResource::collection($this->products->publicFeed());
    }
}
```

### Collaborating with LaraApigee

Services that touch Apigee receive an abstraction (e.g., `ApigeeMonetizationClientInterface`). They map portal DTOs (`RatePlanData`, `MoneyData`, `SubscriptionData`) to LaraApigee entities, call the remote API, then persist metadata:

```php
$result = $this->apigee
    ->developerBalance($wallet->apigee_developer_id)
    ->credit($amount->toApigee(), $reference);

$this->repository()->update($wallet->id, [
    'balance'        => $amount->toDecimal(),
    'apigee_balance' => $amount->toDecimal(),
    'metadata'       => array_merge($wallet->metadata ?? [], ['apigee' => $result->toArray()]),
]);
```

### Extending Services

Choose the strategy that fits:

1. **Macros** – add helper methods on the fly (`ApiProductService::macro('featured', ...)`).
2. **Subclass + bind** – extend the concrete service and bind it to the interface.
3. **Contextual binding** – swap implementations for specific controllers/jobs.
4. **Event listeners** – react to emitted events instead of overriding methods.

Whichever approach you choose, remember that add-ons (Shadow, NinjaAdmin, etc.) resolve the same interfaces—changing the binding updates behavior everywhere.
