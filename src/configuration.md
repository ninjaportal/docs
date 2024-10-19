# Configurations

## LaraApigee Configuration
Since the ninja portal is built on top of the LaraApigee package for communicating with Apigee, you will need to configure the package to work with your Apigee environment.

Refer to the [LaraApigee documentation](https://lordjoo.github.io/laraapigee/getting-started.html#configuration) for more information on how to configure the package.

## NinjaPortal Configuration

First, you will need to publish the configuration file by running the following command:
```bash
php artisan vendor:publish --provider="NinjaPortal\Portal\PortalServiceProvider" --tag="config"
```

### ```apigee_platform```
this sets the type of apigee platform you are using, it can be either `edge` or `apigeex`.

### ```settings```
#### ```settings.cache.enabled```
Enable cache for settings, this will cache the settings in the cache driver to reduce the number of requests to the database.

#### ```settings.cache.ttl```
The time to live for the cache in minutes.

#### ```settings.cache.key```
The key to use for the cache.

### ```translations```
Since the ninjaportal ships with translations solution for the portal content and any other content that needs to be translated, you can configure the translations settings here.

#### ```translations.with_fallback```
Whether to use the fallback locale when the current locale is not available.

#### ```translations.fallback_locale```
The fallback locale to use when the current locale is not available.


