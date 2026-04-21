# Shadow Theme – Configuration

`config/shadow-theme.php` allows you to customize almost every aspect of the public site.

| Key | Description |
|-----|-------------|
| `brand.name`, `brand.logo` | Text/logo displayed in the navbar and metadata. |
| `colors.primary`, `colors.secondary` | Tailwind color classes for buttons, gradients, callouts. |
| `hero.title`, `hero.cta` | Landing page hero copy and CTA labels. |
| `navigation.header`, `navigation.footer` | Map portal menus (by slug) to the header/footer. |
| `sections.features`, `sections.stats`, `sections.testimonials` | Enable/disable optional sections. |
| `api.endpoints.products`, `api.endpoints.blog` | URLs the front-end uses to fetch cards (defaults to first-party routes that call portal services). |
| `docs.path` | Mount point for markdown/API docs if you expose them publicly. |

Because the theme uses Blade, you can also publish the view files and adjust markup. For dynamic content, simply update the service or repository feeding the controller—the theme will pick it up without further changes.
