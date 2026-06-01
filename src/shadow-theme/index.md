# Shadow Theme

`ninjaportal/shadow-theme` is the frontend package for NinjaPortal developer portals.

It provides a production-ready Blade frontend built with Alpine.js, Tailwind CSS v4, and daisyUI. Unlike `portal-api`, Shadow Theme does not use JWT API authentication for its web flow. It talks directly to the core `portal` services and uses Laravel's session-based web authentication experience for developers.

## What It Provides

| Area | Included |
| --- | --- |
| Landing page | Developer portal homepage. |
| Catalog | API product listing, search, detail pages, and product spec view. |
| Auth | Developer signup, login, logout, password reset request, and reset completion. |
| Dashboard | Authenticated developer dashboard. |
| Profile | Developer profile and password management. |
| Apps | Create, view, update, delete, approve, and revoke developer apps. |
| Credentials | Create, approve, revoke, delete credentials, and manage product access. |
| MFA UI | Optional authenticator app and email OTP flows when `portal-mfa` is installed. |
| Components | Reusable anonymous Blade components under `x-shadow::*`. |

## How It Fits

Shadow Theme is useful when you want a ready-made web developer portal.

```text
Browser
  -> Shadow Theme Blade routes
  -> Shadow Theme services
  -> Portal service contracts
  -> Portal database and Apigee-backed operations
```

Use `portal-api` when you want a REST API contract. Use Shadow Theme when you want a Laravel-rendered developer portal frontend.

## Route Mounting

By default, Shadow Theme is mounted at the configured route prefix.

Current package default:

```text
/
```

Common production choice:

```dotenv
SHADOW_THEME_ROUTE_PREFIX=portal
```

Example URLs with `SHADOW_THEME_ROUTE_PREFIX=portal`:

| Page | URL |
| --- | --- |
| Home | `/portal` |
| Products | `/portal/products` |
| Login | `/portal/login` |
| Register | `/portal/register` |
| Dashboard | `/portal/dashboard` |
| Apps | `/portal/apps` |
| Profile | `/portal/profile` |
| MFA settings | `/portal/settings/mfa` |

## Pages In This Section

- [Installation](./installation.md)
- [How To Use](./how-to-use.md)
- [Customization](./customization.md)
- [Authentication](./authentication.md)
