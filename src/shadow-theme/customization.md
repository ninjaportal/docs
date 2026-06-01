# Customization

Shadow Theme is designed to be useful out of the box, while still letting your application customize branding, routes, assets, views, and localization.

## Configuration

Publish the config file:

```bash
php artisan vendor:publish --tag=shadow-theme-config
```

Main file:

```text
config/shadow-theme.php
```

## Branding

You can configure branding with environment variables:

```dotenv
SHADOW_THEME_BRAND_NAME="NinjaPortal"
SHADOW_THEME_BRAND_TAGLINE="A modern developer portal experience for your APIs."
SHADOW_THEME_LOGO_TEXT="Shadow"
SHADOW_THEME_SUPPORT_EMAIL=support@example.com
```

The theme also reads runtime settings from the core portal settings system when present:

| Setting key | Used for |
| --- | --- |
| `portal.name` | Portal display name. |
| `portal.tagline` | Portal tagline. |
| `portal.support_email` | Support email. |
| `shadow.branding.logo_text` | Logo text. |
| `branding.primary_color` | Primary accent color. |
| `branding.secondary_color` | Secondary accent color. |

The installer seeds missing values, but it does not overwrite existing settings.

## Theme Palette

Common theme values:

```dotenv
SHADOW_THEME_DEFAULT_MODE=dark
SHADOW_THEME_LIGHT_DAISY_THEME=corporate
SHADOW_THEME_DARK_DAISY_THEME=night
SHADOW_THEME_ACCENT_COLOR="#22d3ee"
SHADOW_THEME_ACCENT_COLOR_2="#38bdf8"
SHADOW_THEME_HERO_GLOW="rgba(34, 211, 238, 0.25)"
```

## Routes

Mount the theme under a prefix:

```dotenv
SHADOW_THEME_ROUTE_PREFIX=portal
```

Mount it at the application root:

```dotenv
SHADOW_THEME_ROUTE_PREFIX=
```

Disable the theme routes completely:

```dotenv
SHADOW_THEME_ENABLED=false
```

## Views

Publish views when you need deep Blade customization:

```bash
php artisan shadow:install --publish-views
```

or:

```bash
php artisan vendor:publish --tag=shadow-theme-views
```

After publishing, customize the generated Blade files in your application.

## Assets

Use published assets for the fastest setup:

```bash
php artisan shadow:install
```

Use your application build when you want full Tailwind integration:

```dotenv
SHADOW_THEME_PREFER_PUBLISHED_ASSETS=false
```

Then ensure your Tailwind entry scans Shadow Theme views:

```css
@source '../../vendor/ninjaportal/shadow-theme/resources/views/**/*.blade.php';
```

## Localization And RTL

Force a locale:

```dotenv
SHADOW_THEME_LOCALE=ar
```

Configure RTL locales:

```dotenv
SHADOW_THEME_RTL_LOCALES=ar,fa,he,ur
```

Shadow Theme loads translations from the package namespace:

```php
__('shadow-theme::shadow.some_key')
```

## Feature Flags

Common frontend feature flags:

```dotenv
SHADOW_THEME_REGISTRATION_ENABLED=true
SHADOW_THEME_PASSWORD_RESET_ENABLED=true
SHADOW_THEME_MFA_UI_ENABLED=true
```

These let you keep the theme installed while controlling which developer-facing flows are visible.
