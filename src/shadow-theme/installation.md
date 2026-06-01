# Installation

Install Shadow Theme into your Laravel application with Composer.

```bash
composer require ninjaportal/shadow-theme
```

Shadow Theme expects the core portal package to already be installed and configured:

```bash
composer require ninjaportal/portal
```

The portal package is responsible for the domain models, services, settings, product catalog, developer apps, and Apigee-backed operations that Shadow Theme uses.

## Run The Installer

Run the Shadow Theme installer:

```bash
php artisan shadow:install --publish-config
```

The installer can:

| Action | Description |
| --- | --- |
| Publish config | Creates `config/shadow-theme.php` when `--publish-config` is used. |
| Publish assets | Publishes built CSS and JS to `public/vendor/shadow-theme`. |
| Publish views | Publishes Blade views when `--publish-views` is used. |
| Seed settings | Adds missing branding/runtime settings without overwriting existing values. |

Useful options:

```bash
php artisan shadow:install --publish-config
php artisan shadow:install --publish-views
php artisan shadow:install --without-assets
```

## Published Assets Mode

By default, Shadow Theme prefers its published assets:

```text
public/vendor/shadow-theme/shadow-theme.css
public/vendor/shadow-theme/shadow-theme.js
```

When both files exist, the theme loads them automatically.

This is the simplest setup for most applications.

## Host Build Mode

If you want your application Vite/Tailwind build to compile the theme views, disable published asset preference:

```dotenv
SHADOW_THEME_PREFER_PUBLISHED_ASSETS=false
```

Install frontend dependencies:

```bash
npm install alpinejs daisyui
```

Add the package views to your Tailwind v4 CSS entry:

```css
@import 'tailwindcss';
@plugin "daisyui";

@source '../../vendor/ninjaportal/shadow-theme/resources/views/**/*.blade.php';
```

Initialize Alpine in your application JS entry:

```js
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();
```

## Basic Environment

Common environment values:

```dotenv
SHADOW_THEME_ENABLED=true
SHADOW_THEME_ROUTE_PREFIX=portal

SHADOW_THEME_BRAND_NAME="NinjaPortal"
SHADOW_THEME_BRAND_TAGLINE="A modern developer portal experience for your APIs."
SHADOW_THEME_LOGO_TEXT="Shadow"
SHADOW_THEME_SUPPORT_EMAIL=support@example.com

SHADOW_THEME_DEFAULT_MODE=dark
SHADOW_THEME_LIGHT_DAISY_THEME=corporate
SHADOW_THEME_DARK_DAISY_THEME=night

SHADOW_THEME_REGISTRATION_ENABLED=true
SHADOW_THEME_PASSWORD_RESET_ENABLED=true
SHADOW_THEME_MFA_UI_ENABLED=true
```

## Verify Installation

If mounted at `/portal`, open:

```text
http://localhost:8000/portal
```

You should see the Shadow Theme landing page.
