# Architecture

Ninja Portal deliberately separates responsibilities across layers:

```
Laravel Framework
    └── lordjoo/laraapigee (Apigee SDK)
          └── ninjaportal/portal (core domain: models, repositories, services)
                └── Add-ons (Shadow theme, NinjaAdmin, Apigee monetization, custom packages)
```

1. **Laravel** – routing, HTTP kernel, queues, scheduler, cache.
2. **LaraApigee** – typed client for Apigee Management/Monetization APIs. Provides `apigeeX()->developers()`, `monetization()->ratePlans($product)`, `developerBalance($email)` and more.
3. **Portal Core** – binds repositories/services with `RegistersBindings`, defines Eloquent models and policies, translation traits, database seeders, artisan commands.
4. **Add-ons** – consume service interfaces to build user experiences (Shadow theme, NinjaAdmin) or optional domains such as Apigee monetization packages. Because they depend on contracts, you can replace implementations without changing the add-on code.

## Portal Core & Database Design

The core schema is optimized for Apigee portals and monetization. Key tables:

| Table(s) | Purpose | Notes |
|----------|---------|-------|
| `api_products`, `api_product_translations` | Mirrors Apigee products; stores visibility, metadata, translated marketing copy. | Relates to `categories`, `audiences`, menus. |
| `categories`, `category_translations` | Taxonomy for grouping products. | Many-to-many with products; supports thumbnails/descriptions per locale. |
| `audiences` | Segments controlling access. | Pivot tables connect audiences to `users` and `api_products`. |
| `menus`, `menu_items` | Navigation consumed by Shadow/theme API. | Menu items are translatable and nestable. |
| `settings`, `setting_groups` | CMS-style key/value store. | Values saved as JSON for flexible payloads. |

> Optional add-ons (for example, the Apigee monetization package) introduce their own tables. See their documentation for details.

Translation tables follow a consistent pattern: `<model>_translations` with `locale`, foreign key, translated columns, timestamps, and a unique `model_id + locale` constraint.

## How Add-ons Sit on Top

Add-ons never talk to models directly. They resolve service interfaces (e.g., `ApiProductServiceInterface`, `WalletServiceInterface`). That indirection allows you to:

- Replace repositories/services with custom bindings.
- Add macros or subclass services without touching Shadow/NinjaAdmin.
- Introduce new packages that re-use the same contracts.

If you override a binding (for example, swap `WalletServiceInterface` with your subclass), every add-on automatically consumes the new behavior.
