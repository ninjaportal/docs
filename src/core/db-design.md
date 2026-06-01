# Core Database Design

The `ninjaportal/portal` package owns the core content and identity tables used by the portal experience. Its schema is intentionally small: the package stores portal users, admins, product catalog metadata, audience targeting, navigation menus, and runtime settings.

The Apigee product itself remains external. NinjaPortal stores the portal-facing catalog record and links it to Apigee through `api_products.apigee_product_id`.

## ERD

<figure class="erd-card">
  <a href="../assets/erd.svg" target="_blank" rel="noreferrer">
    <img src="../assets/erd.svg" alt="NinjaPortal core package database ERD">
  </a>
  <figcaption>Open the diagram in a new tab for a full-size view.</figcaption>
</figure>

## Tables

| Area | Tables | Purpose |
| --- | --- | --- |
| Identity | `users`, `admins` | Portal developers and admin panel operators. |
| Catalog | `api_products`, `categories`, `audiences` | Portal-facing product catalog, grouping, visibility, and audience targeting. |
| Translations | `api_product_translations`, `category_translations`, `menu_item_translations` | Localized display content stored one row per locale. |
| Joins | `api_product_category`, `api_product_audience`, `audience_user` | Many-to-many relationships for catalog organization and access targeting. |
| Navigation | `menus`, `menu_items` | Configurable portal navigation. |
| Settings | `setting_groups`, `settings` | Runtime settings grouped for admin management. |
| Laravel support | `sessions`, `password_reset_tokens` | Standard authentication/session support created only when missing. |

## Design Notes

- `api_products.apigee_product_id` is indexed, not unique. Multiple portal catalog entries may reference the same Apigee product when needed.
- Translatable models keep stable base records in the main table and localized fields in translation tables. Each translation table enforces one row per parent and locale.
- Audiences connect users to products without hard-coding access rules into the product table.
- Categories describe catalog organization, while audiences describe who a product is intended for.
- RBAC tables are provided by the authorization layer, not by the core portal migrations shown here.

<style>
.erd-card {
  box-sizing: border-box;
  width: min(100%, 760px);
  margin: 24px 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent), transparent 34%),
    var(--vp-c-bg-soft);
  padding: 12px;
  box-shadow: 0 14px 34px color-mix(in srgb, var(--vp-c-bg) 82%, #000);
}

.erd-card a {
  display: block;
  line-height: 0;
}

.erd-card img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 520px;
  object-fit: contain;
  border-radius: 10px;
}

.erd-card figcaption {
  margin: 10px 4px 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.5;
}
</style>
