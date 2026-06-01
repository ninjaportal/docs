# Configuration 
We pretty much follow the Laravel way of doing things,
so all ninjaportal packages are configurable via the `config` directory, and you can use the `php artisan vendor:publish` command
to publish the configuration files to your application and customize them as needed.

## Core Configuration
the ```ninjaportal/portal``` package has a configuration file named `portal.php` that contains the core configuration for the portal.

To setup a connection with Apigee Edge or Apigee X you must set the following environment variables in your `.env` file:

```bash
## For Apigee Edge
APIGEE_PLATFORM=edge
APIGEE_ENDPOINT=https://api.enterprise.apigee.com/v1
APIGEE_ORGANIZATION=
APIGEE_USERNAME=
APIGEE_PASSWORD=

## For Apigee X
APIGEE_PLATFORM=apigeex
APIGEE_ENDPOINT=https://apigee.googleapis.com/v1
APIGEE_ORGANIZATION=
## Key file must be stored at storage/app/service_account_key.json
```
