# Deployment

<!-- [[toc]] -->

## Introduction
Deploying Ninja Portal is straightforward thanks to Laravel's robust deployment ecosystem. You may deploy to any environment that supports PHP and Composer, including shared hosting, VPS, or cloud platforms.

## Quick Example: Deploying to Production

Let's deploy your Ninja Portal application to a production server:

```shell
# Install dependencies
composer install --optimize-autoloader --no-dev

# Set up environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate --force

# Build frontend assets
npm install && npm run build

# Clear and cache config/routes/views
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

::: tip
You should review your `.env` file and set production values before deploying.
:::

## Advanced Topics
- Zero-downtime deployment (Laravel Envoyer, Deployer)
- Queue workers and Horizon
- Caching strategies
- SSL and security best practices

---

For more details, see the [Laravel Deployment Guide](https://laravel.com/docs/deployment).
