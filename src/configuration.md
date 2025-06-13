# Configuration

<!-- [[toc]] -->

## Introduction
Ninja Portal leverages Laravel's configuration system for maximum flexibility. You may customize both the core portal and any installed add-ons to suit your environment.

## Quick Example: Publishing Configuration

Let's publish the Ninja Portal configuration file:

```shell
php artisan vendor:publish --provider="NinjaPortal\Portal\PortalServiceProvider" --tag="ninjaportal-config"
```

::: tip
You may review the published `config/ninjaportal.php` file for all available options.
:::

## LaraApigee Configuration
Ninja Portal uses the [LaraApigee package](https://github.com/lordjoo/laraapigee) to communicate with Apigee. You should configure LaraApigee according to your Apigee environment. See the [LaraApigee documentation](https://lordjoo.github.io/laraapigee/getting-started.html#configuration) for details.

## Ninja Portal Configuration Options

### `apigee_platform`
Set the Apigee platform type: `edge` or `apigeex`.

### `settings`
- `settings.cache.enabled`: Enable or disable caching for settings.
- `settings.cache.ttl`: Cache time-to-live (minutes).
- `settings.cache.key`: Cache key name.

### `translations`
- `translations.with_fallback`: Use fallback locale if the current locale is unavailable.
- `translations.fallback_locale`: Fallback locale code.

---

For add-on configuration, see:
- [Shadow Theme Configuration](./addons/shadow/configuration.md)
- [NinjaAdmin Configuration](./addons/ninjaadmin/configuration.md) <!-- Add this link when NinjaAdmin docs are available -->


