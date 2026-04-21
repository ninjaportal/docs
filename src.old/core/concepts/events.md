# Events

Services emit events before and after significant actions so you can extend behavior without modifying packages.

## 1. CRUD Lifecycle Events

Every `BaseService` fires the following (via `FireEventsTrait`):

- `{Model}Creating`, `{Model}Created`
- `{Model}Updating`, `{Model}Updated`
- `{Model}Deleting`, `{Model}Deleted`

Listeners receive the model instance and the payload being written. Use these events to sync to external systems or enforce additional validation.

## 2. Domain Events

Some packages emit high-level events:

| Event | Trigger |
|-------|---------|
| `RateplanCreated`, `RateplanPublished`, `RateplanSynced` | portal-xmint rate plan service interacts with Apigee. |
| `WalletCredited`, `WalletAdjusted`, `WalletSynced` | Wallet operations (credit/adjust/sync). |
| `SubscriptionActivated`, `SubscriptionCancelled` | Subscription service creates/expires developer subscriptions. |
| `PackageTranslated` | When translatable models (packages, products) save new locales. |

## 3. Listening to Events

Register listeners in a service provider:

```php
use NinjaPortal\XMint\Events\WalletCredited;

Event::listen(WalletCredited::class, function ($event) {
    AuditLog::wallet($event->wallet)
        ->info('Credit posted', $event->amount->toArray());
});
```

Or create queued listeners if the downstream work is heavy.

## 4. Broadcasting / Webhooks

If you need to notify other systems:

1. Create a listener that transforms the event payload.
2. Dispatch a job to call your webhook or message bus.
3. Because events fire inside DB transactions (except for wallet credit/adjust which wrap their own transaction), queue the job to ensure the DB commit succeeds first.

By leaning on events you keep your code portable across upgrades and avoid hacking vendor packages.
