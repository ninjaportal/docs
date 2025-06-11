# Configuration

Configure the Shadow theme in `config/shadow.php`:

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
    
    // API keys per application limit
    'keys_per_app' => env('KEYS_PER_APP', 2),
    
    // Supported locales
    'locales' => [
        'en' => 'English',
        'ar' => 'العربية'
    ],
];
```

Set theme variables in your `.env`:

```env
# Theme settings
RECAPTCHA_ENABLED=false
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET=your_recaptcha_secret_key
KEYS_PER_APP=2
SHADOW_DARKMODE_ENABLED=true
```
