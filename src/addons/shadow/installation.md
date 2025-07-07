# Shadow Theme Installation

<!-- [[toc]] -->

## Introduction
The Shadow Theme is Ninja Portal's modern, responsive frontend theme built with Laravel's Blade templating system. Laravel makes it easy to create beautiful, maintainable templates, and the Shadow Theme conveniently extends this with a comprehensive design system optimized for developer portals.

## Quick Example: Installing the Shadow Theme

Let's install the Shadow Theme via Composer:

```shell
composer require ninjaportal/shadow-theme
```

After installation, run the following Artisan command to set up the theme:

```shell
php artisan ninja-shadow:install
```

::: tip
The Shadow Theme comes pre-installed with the Kickstart project, so you may not need to install it separately.
:::

## Building Assets

The theme uses Vite for frontend tooling. You may build assets with:

```shell
# Development build with hot reloading
npm run dev

# Production build
npm run build

# Watch mode
npm run dev --watch
```

## Theme Structure

The theme is organized for easy customization:

```text
resources/
  views/
    layouts/
      app.blade.php   # Main application layout
  ...
```

---

For configuration, see [Shadow Theme Configuration](./configuration.md).
