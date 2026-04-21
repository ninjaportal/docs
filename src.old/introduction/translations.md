# Translations

NinjaPortal ships a built-in translation system in `ninjaportal/portal` for content-like models.

Use this section to understand the translation model before building your own UI or adding your own translatable models.

## What is built in

The Portal package includes:

- `HasTranslations` support
- translation model discovery/naming conventions
- locale helper registration (`translatable.locales`)
- translation table patterns used by core models

Core models using translation tables include:

- API products
- categories
- menu items

## Translation schema pattern (important)

NinjaPortal uses a companion-table approach:

- base table stores stable identity/non-localized data
- translation table stores locale-specific fields
- one row per locale per parent record

Typical translation table fields:

- `{parent_id}`
- `locale`
- localized attributes (for example `name`, `description`)
- timestamps

## Why this is useful

- easy to query by locale
- predictable schema for all translatable models
- easy to extend to your own models

## If you want to use it in your own model

Follow the same pattern:

1. Create a base model
2. Create a `{Model}Translation` model/table
3. Add translation relation + translated attributes conventions
4. Reuse the same locale/fallback configuration approach

Detailed implementation and example:

- [Portal / Translations (Reference)](/portal/translations)

