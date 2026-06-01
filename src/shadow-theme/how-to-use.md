# How To Use

Shadow Theme gives you a ready-made developer portal UI.

After installation, developers can browse API products, register, login, manage their profile, create apps, and manage credentials from the browser.

## Main Routes

Assuming:

```dotenv
SHADOW_THEME_ROUTE_PREFIX=portal
```

The main routes are:

| Route | Purpose |
| --- | --- |
| `GET /portal` | Landing page. |
| `GET /portal/products` | Product catalog. |
| `GET /portal/products/{slug}` | Product details. |
| `GET /portal/products/{slug}/spec` | Product specification view. |
| `GET /portal/login` | Developer login. |
| `GET /portal/register` | Developer registration. |
| `GET /portal/dashboard` | Developer dashboard. |
| `GET /portal/profile` | Profile settings. |
| `GET /portal/apps` | Developer apps. |
| `GET /portal/apps/create` | Create an app. |
| `GET /portal/apps/{appName}` | App details and credentials. |
| `GET /portal/settings/mfa` | MFA settings, when enabled. |

## What Happens Behind The UI

Shadow Theme uses package services that call the core portal contracts.

| Theme area | Uses |
| --- | --- |
| Product catalog | `ProductCatalogService` and portal product services. |
| Developer auth | `ShadowAuthFlow` and portal user services. |
| Developer session | `ShadowAuthManager` and session storage. |
| Apps and credentials | `DeveloperAccessService`, portal app services, LaraApigee-backed operations. |
| MFA | `ShadowMfaService` when `portal-mfa` is installed. |

This means the frontend gets a complete portal experience while still going through the same domain layer as the rest of NinjaPortal.

## Reusable Components

Shadow Theme registers anonymous Blade components under:

```blade
<x-shadow::... />
```

Available components include:

| Component | Purpose |
| --- | --- |
| `<x-shadow::ui.flash />` | Flash/session messages. |
| `<x-shadow::ui.card />` | Generic card container. |
| `<x-shadow::ui.page-header />` | Page title and description block. |
| `<x-shadow::ui.input />` | Styled input field. |
| `<x-shadow::ui.textarea />` | Styled textarea. |
| `<x-shadow::ui.select />` | Styled select field. |
| `<x-shadow::ui.empty-state />` | Empty-state UI. |
| `<x-shadow::product.card />` | Product card. |
| `<x-shadow::app.status-badge />` | App status badge. |

Example:

```blade
<x-shadow::ui.card>
    <x-shadow::ui.page-header
        title="My Custom Portal Page"
        description="This page uses Shadow Theme components."
    />
</x-shadow::ui.card>
```

## Session-Based Web Flow

Shadow Theme does not call `portal-api` login endpoints.

It uses Laravel web middleware and a session key configured by:

```dotenv
SHADOW_THEME_SESSION_KEY=shadow_theme.user_id
```

This is intentional. The package is a web frontend, while `portal-api` is the REST API package.

## App And Credential Management

Developer app and credential operations are Apigee-backed through the portal service layer.

Developers can:

- Create apps.
- Update apps.
- Delete apps.
- Approve or revoke apps when your platform allows it.
- Create credentials.
- Approve, revoke, or delete credentials.
- Add or remove API products from credentials.
- Approve or revoke product access.

These actions eventually go through LaraApigee via the core portal services.
