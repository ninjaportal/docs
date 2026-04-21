# Apigee X Monetization (Portal-XMint)

Portal-XMint is a licensed add-on that connects Ninja Portal to Apigee X Monetization. You’ll need a valid license key before installation.

## 1. Requirements & Installation

1. Obtain a license key from the Ninja Portal team.
2. Install the packages:

```bash
composer require ninjaportal/portal-xmint ninjaportal/xmint-filament
php artisan vendor:publish --tag=portal-xmint-config
php artisan migrate
```

3. Add your license key and Apigee config to `.env` or `config/portal-xmint.php`:

```
PORTAL_XMINT_LICENSE=your-license-key
APIGEE_ORG=...
APIGEE_KEY_FILE=...
```

4. Register the service provider if auto-discovery is disabled:

```php
'providers' => [
    // ...
    NinjaPortal\XMint\XMintServiceProvider::class,
],
```

5. (Optional) Enable the xmint Filament plugin by adding it to your Filament panel.

## 2. Domain Overview

| Table(s) | Purpose |
|----------|---------|
| `rateplans` | Local projection of Apigee rate plans (state, billing period, pricing tiers, Apigee `name`). |
| `packages`, `package_translations` | Marketing layer for rate plans (content displayed on the public site). |
| `user_subscriptions` | Subscriptions tying users, wallets, and rate plans to an Apigee developer subscription ID. |
| `user_wallets` | Tracks each developer’s wallet, currency, Apigee developer email, and cached balance. |
| `user_transactions` | Ledger of credits, adjustments, and subscription charges tied to wallets. |

All translation tables follow the same convention as the portal core (`packages` ↔ `package_translations`).

## 3. Repository & Service Interfaces

Repositories (all under `NinjaPortal\XMint\Repositories`):

- `RateplanRepositoryInterface`
- `PackageRepositoryInterface`
- `UserWalletRepositoryInterface`
- `UserTransactionRepositoryInterface`
- `SubscriptionRepositoryInterface`

Services (under `NinjaPortal\XMint\Services`):

- `RateplanServiceInterface` – normalizes payloads, calls Apigee rate plan APIs, persists metadata.
- `RateplanSyncServiceInterface` – bulk sync utility for pulling Apigee rate plans into the portal.
- `PackageServiceInterface` – marketing layer CRUD (translations, metadata).
- `WalletServiceInterface` – ensures wallets exist, syncs balances, calls Apigee `credit`/`adjust`, records transactions.
- `SubscriptionServiceInterface` – creates/expires developer subscriptions via Apigee Monetization APIs.
- `UserTransactionServiceInterface`, `UserWalletServiceInterface` – convenience wrappers for CRUD operations in admin tooling.

These services all depend on `ApigeeMonetizationClientInterface`, which wraps LaraApigee entry points (`ratePlans($product)`, `developerBalance($email)`, `developerSubscriptions($email)`, `developerMonetizationConfig($email)`).

## 4. Event Flow

Portal-XMint emits domain events whenever key operations occur:

| Event | Trigger |
|-------|---------|
| `RateplanCreated`, `RateplanUpdated`, `RateplanPublished` | Rate plan service persists changes (after Apigee accepts the request). |
| `WalletCredited`, `WalletAdjusted`, `WalletSynced` | Wallet balances change locally or after an Apigee reconciliation. |
| `SubscriptionActivated`, `SubscriptionCancelled` | Developer subscriptions are created/expired. |

Listen to these events to notify finance systems, send emails, or push data into BI pipelines.

## 5. Customizing Portal-XMint

- **Repositories** – extend the concrete repository class and rebind the interface (same pattern as the core portal).
- **Services** – subclass (`class CustomWalletService extends WalletService`) and bind to `WalletServiceInterface` if you need additional validation or integrations. Use macros for lightweight helpers.
- **Models** – override `Rateplan`, `Package`, `UserWallet`, etc., by pointing the xmint config (or `config/ninjaportal.php`) at your subclasses. Translation rules match the core (`package_translations`, etc.).
- **Policies** – xmint registers policies for packages, wallets, and rate plans; rebind them if you add new permissions.

## 6. Developer Monetization Config

Before you can top-up a developer wallet, Apigee requires that the developer is on a PREPAID monetization config. Portal-XMint exposes helper services (consumed by xmint-filament) that:

1. Fetch `developerMonetizationConfig` via LaraApigee.
2. Convert developers from POSTPAID to PREPAID if an admin approves the action.
3. Cache the config so wallet operations can validate the billing type quickly.

## 7. UI Integration (xmint-filament)

The xmint Filament plugin depends entirely on the services above. It reuses the `PanelWalletService` extension to convert form input into `MoneyData`, triggers credits/adjustments through `WalletServiceInterface`, and prompts admins to convert developers to prepaid when needed. Because it resolves service interfaces, binding your own implementations automatically updates the UI behavior.

## 8. When NOT to Install Portal-XMint

If you only need the content/portal layer (API products, menus, docs) and do not plan to expose monetization tools, you can skip portal-xmint entirely. The rest of the documentation focuses on the portal core. Only install portal-xmint when you intend to manage Apigee rate plans, wallets, or developer balances from the portal.
