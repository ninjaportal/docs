# Configuration 
We pretty much follow the Laravel way of doing things,
so all ninjaportal packages are configurable via the `config` directory, and you can use the `php artisan vendor:publish` command
to publish the configuration files to your application and customize them as needed.

## Core Configuration
the ```ninjaportal/portal``` package has a configuration file named `portal.php` that contains the core configuration for the portal.

## Service Provider
When you install the portal package, it also publishes a service provider to your application:

```text
App\Providers\NinjaPortalServiceProvider
```

This provider is where you register portal related listeners and observers for your application.
For example, the developer sync with Apigee is registered there by listening to the user created and updated events.

## Apigee Connection Configuration 
Since NinjaPortal using ```laraapigee``` package to communicate with the Apigee APIs, you must follow the package configuration keys.

### Example connecting with Apigee X 

```text
APIGEE_ENDPOINT=https://apigee.googleapis.com/v1
APIGEE_ORGANIZATION=your-organization
APIGEE_PLATFORM=apigeex
```
::: info
Make sure your service account key is at app/service_account_key.json
:::
