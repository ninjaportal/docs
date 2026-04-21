# Shadow Theme – Installation

Shadow is the default public theme built with Blade, TailwindCSS, and Alpine. It consumes portal services via controllers/API endpoints.

## Steps

1. Install the package:

```bash
composer require ninjaportal/shadow-theme
npm install
```

2. Publish assets/config (optional):

```bash
php artisan vendor:publish --tag=shadow-theme-config
```

3. Build assets (for production):

```bash
npm run build
```

4. Ensure your routes file loads the theme’s routes (auto-discovered). They render landing pages, product catalogs, blog posts (if enabled), and docs pulled from portal services.

5. Configure branding, menus, and API endpoints in `config/shadow-theme.php`.

Shadow relies entirely on service interfaces; if you override `ApiProductServiceInterface` the theme automatically reflects the new logic.
