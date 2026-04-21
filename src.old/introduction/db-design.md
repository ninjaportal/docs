# DB Design

This page gives a visual, table-first summary of the database design used by the two core packages:

- `ninjaportal/portal`
- `ninjaportal/portal-api`

For full detailed field-by-field notes, use:

- [References / Database Schema (Detailed)](/reference/database-schema)

## Design principles

- `portal` owns domain tables
- `portal-api` owns API/auth operational tables
- localized content uses translation tables
- many-to-many relations use pivot tables
- auth/token and audit concerns are stored separately from domain entities

## `ninjaportal/portal` tables (core domain)

### Identity and session support

| Table | Purpose | Key columns | Notes |
| --- | --- | --- | --- |
| `users` | Developer/consumer accounts | `email`, `password`, `status`, `custom_attributes` | Default consumer user model |
| `password_reset_tokens` | Password reset token storage | `email`, `token`, `created_at` | Used by reset flows |
| `sessions` | Session persistence | `id`, `user_id`, `payload`, `last_activity` | Standard Laravel session table in this package context |

### Catalog and taxonomy

| Table | Purpose | Key columns | Notes |
| --- | --- | --- | --- |
| `api_products` | Portal catalog records for Apigee products | `slug`, `apigee_product_id`, `visibility`, `tags`, `custom_attributes` | Base non-localized product data |
| `api_product_translations` | Localized API product fields | `api_product_id`, `locale`, `name`, `description` | One row per locale |
| `categories` | Product taxonomy categories | `slug` | Base category identity |
| `category_translations` | Localized category fields | `category_id`, `locale`, `name`, `description` | Translation companion table |
| `api_product_category` | Product-category pivot | `api_product_id`, `category_id` | Many-to-many mapping |

### Audience access modeling

| Table | Purpose | Key columns | Notes |
| --- | --- | --- | --- |
| `audiences` | Logical user groupings | `name` | Used for visibility/segmentation rules |
| `audience_user` | Audience-user pivot | `audience_id`, `user_id` | Membership mapping |
| `api_product_audience` | Product-audience pivot | `api_product_id`, `audience_id` | Product access grouping |

### Navigation and content structures

| Table | Purpose | Key columns | Notes |
| --- | --- | --- | --- |
| `menus` | Navigation menu containers | `slug` | Top-level menu identity |
| `menu_items` | Menu items | `menu_id`, `slug` | Linked to menu |
| `menu_item_translations` | Localized menu item labels/routes | `menu_item_id`, `locale`, `title`, `url`, `route` | Translation companion table |

### Settings

| Table | Purpose | Key columns | Notes |
| --- | --- | --- | --- |
| `setting_groups` | Grouping for settings | `name` | Optional grouping |
| `settings` | Typed runtime settings | `key`, `value`, `type`, `setting_group_id` | Casted via `SettingService` |

## `ninjaportal/portal-api` tables (API/auth operations)

| Table | Purpose | Key columns | Notes |
| --- | --- | --- | --- |
| `portal_api_refresh_tokens` | Opaque refresh token store | `context`, `token_hash`, `tokenable_type`, `tokenable_id`, `expires_at`, `revoked_at` | Raw refresh tokens are never stored |
| `portal_api_activity_logs` | Audit/activity records | `action`, `actor_*`, `subject_*`, `properties`, `created_at` | Supports async audit logging |

## Schema pattern highlights

## Translation table pattern

Portal uses a predictable translation schema pattern:

- base table (`api_products`, `categories`, `menu_items`)
- translation table (`*_translations`)
- locale uniqueness per parent record

This pattern is important if you add your own translatable models.

See:

- [Introduction / Translations](/introduction/translations)
- [Portal / Translations (Reference)](/portal/translations)

## Why `portal-api` has separate auth/audit tables

Keeping refresh tokens and activity logs in `portal-api`:

- avoids polluting domain tables with API transport concerns
- keeps the `portal` package focused on domain behavior
- makes auth/audit behavior easier to evolve independently

