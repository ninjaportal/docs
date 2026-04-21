# Models & Customization

Portal ships opinionated Eloquent models for every domain (users, API products, categories, menus, settings, rate plans, wallets, etc.). You can override any model without rewriting repositories by pointing the config to your subclass.

## 1. Core Models

| Model | Purpose | Notes |
|-------|---------|-------|
| `NinjaPortal\Portal\Models\User` | Portal user (Authenticatable). | Supports audiences, subscriptions, translation helpers. |
| `NinjaPortal\Portal\Models\ApiProduct` | Mirrors an Apigee product. | Translatable name/description, relates to categories/audiences. |
| `NinjaPortal\Portal\Models\Category` | Taxonomy grouping. | Translatable copy, thumbnails. |
| `NinjaPortal\Portal\Models\Audience` | Access-control segment. | Many-to-many with users and products. |
| `NinjaPortal\Portal\Models\Menu` / `MenuItem` | Navigation data. | Consumed by public APIs/Shadow. |
| `NinjaPortal\Portal\Models\Setting` / `SettingGroup` | Configurable key/value store. | Values stored as JSON. |
| _See [Apigee X Monetization](monetization.md)_ | Monetization models (rate plans, wallets, subscriptions, packages) live in the portal-xmint package and are documented separately. |

## 2. Replacing a Model

1. Create your subclass:

```php
namespace App\Models;

use NinjaPortal\Portal\Models\ApiProduct as BaseApiProduct;

class ApiProduct extends BaseApiProduct
{
    protected $casts = [
        'metadata' => 'array',
    ];

    protected $fillable = [
        ...parent::FILLABLE,
        'integration_stage',
    ];
}
```

2. Update migrations/translation tables if new columns are needed.
3. Update `config/ninjaportal.php`:

```php
return [
    'models' => [
        'ApiProduct' => App\Models\ApiProduct::class,
        'ApiProductTranslation' => App\Models\ApiProductTranslation::class,
    ],
];
```

Repositories look up their model definition through the binding metadata (`'model' => \NinjaPortal\Portal\Models\ApiProduct::class` or `'model' => 'config:ninjaportal.models.ApiProduct'`). That means as soon as you change the config, the repository starts instantiating your subclass—no repository rewrite required.

## 3. Adding Translatable Fields

If your subclass introduces new localized fields:

1. Extend the translation model and `$fillable` array.
2. Update the translation table migration.
3. Append the attribute name to `$translated_attributes` on the main model.

See [Translations](translation.md) for the full workflow.

## 4. Observers & Policies

You can register observers on your subclasses to add lifecycle hooks (slug generation, auditing, etc.). Policies remain intact because the portal packages call `Gate::policy()` using the resolved model class. If you override the model, re-register the policy if necessary.

## 5. Apigee X Monetization Models

Installing portal-xmint adds bindings for `Rateplan`, `Package`, `Subscription`, `UserWallet`, and `UserTransaction`. They follow the same override pattern: point the monetization config to your subclass and the repositories immediately use it. See [Apigee X Monetization](monetization.md) for full details on customizing monetization models.

## 6. Testing & Compatibility

Whenever you swap a model:

- Run the portal test suite (or at least the repository/service tests) to ensure behavior didn’t change unexpectedly.
- Regenerate factories if you rely on Laravel model factories; point them to your subclass in `Database\Factories`.
- Confirm add-ons still work—because they use services, they inherit your changes automatically.
