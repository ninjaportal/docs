# NinjaAdmin Add-on

NinjaAdmin is a Filament-based admin panel packaged as `ninjaportal/admin-filament`. It provides a turn-key back office built entirely on top of the portal service interfaces.

## Features

- CRUD for API products, categories, menus, audiences, settings, blog posts (if enabled).
- Translation-aware forms and repeater components.
- Shield/Spatie-permission integration for fine-grained RBAC.
- Hooks for rate plans, wallets, and other add-ons (it simply resolves the relevant service contracts).

## Installation

```bash
composer require ninjaportal/admin-filament
php artisan vendor:publish --tag=ninja-admin-config
php artisan migrate
```

The package auto-registers a Filament panel under `/admin`. Default credentials come from the portal seeder.

## Customization Tips

- Override resources by extending the provided class and swapping it in the config (`config/ninja-admin.php`).
- Use Filament’s `Panel::auth()` hooks to integrate SSO or MFA.
- All resources use the `HasNinjaService` trait, so swapping a service binding automatically alters the admin behavior.

## Extending Actions

If you add macros or custom methods to services (e.g., `ApiProductService::publicFeed()`), they immediately become available to the admin because it resolves the same interface from the container.
