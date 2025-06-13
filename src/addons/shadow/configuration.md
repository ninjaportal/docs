# Shadow Theme Configuration

<!-- [[toc]] -->

## Introduction
You may configure the Shadow Theme in `config/shadow.php` to suit your branding and functional requirements. Laravel makes it easy to manage environment-specific settings using the `.env` file.

## Quick Example: Setting Dark Mode

Let's enable dark mode in your `.env` file:

```env
SHADOW_DARKMODE_ENABLED=true
```

## Configuration Options

Edit `config/shadow.php` for advanced options:

```php
return [
    // Default theme mode
    'default_theme' => 'default', // 'default' or 'dark'
    
    // Dark mode functionality
    "darkmode_enabled" => env("SHADOW_DARKMODE_ENABLED", true),
    
    // ReCaptcha integration for forms
    'recaptcha' => [
        'enabled' => env('RECAPTCHA_ENABLED', false),
        'site_key' => env('RECAPTCHA_SITE_KEY', ''),
        'secret_key' => env('RECAPTCHA_SECRET', ''),
    ],
    'keys_per_app' => env('KEYS_PER_APP', 2),
    
    // Supported locales
    'locales' => [
        'en' => 'English',
        'ar' => 'العربية',
    ],
];
```

::: tip
You may override any of these settings in your `.env` file for different environments.
:::

## Environment Variables

```env
RECAPTCHA_ENABLED=false
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET=your_recaptcha_secret_key
KEYS_PER_APP=2
SHADOW_DARKMODE_ENABLED=true
```

---

For more on customizing themes, see [Extending Services](../../core/development/extending-services.md).
