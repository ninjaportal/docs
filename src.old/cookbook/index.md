# Cookbook

This page collects common NinjaPortal customization recipes that teams repeatedly implement when onboarding a client, adding a feature, or preparing a deployment.

Use this as the practical companion to the architecture and reference pages.

## How to use this page

- Start with the recipe closest to your task.
- Copy the pattern, then adapt it in your application or custom package.
- Follow the linked deep-dive page for the underlying architecture and constraints.

## Recipe index

- Replace a Portal service implementation
- Add a domain event listener (without changing core code)
- Register model observers using `BasePortalServiceProvider`
- Override Portal API auth flow (SSO / policy gate / custom pre-checks)
- Decorate MFA auth flow instead of replacing it entirely
- Add a custom MFA driver
- Expose more settings in the public config endpoint
- Replace API authorization behavior (`ApiAuthorizerInterface`)
- Add a translatable custom model
- Customize RBAC route permissions
- Improve Scribe endpoint docs quality
- Link frontend teams to Scribe docs by environment

---

## Replace a Portal service implementation

Use this when you need to change business rules while preserving the package contracts.

### Example use case

Enforce company-only emails during consumer user creation.

```php
namespace App\Portal\Services;

use Illuminate\Validation\ValidationException;
use NinjaPortal\Portal\Services\UserService;

class EnterpriseUserService extends UserService
{
    protected function mutateDataBeforeCreate(array $data): array
    {
        $data = parent::mutateDataBeforeCreate($data);

        $email = strtolower((string) ($data['email'] ?? ''));
        if (! str_ends_with($email, '@example.com')) {
            throw ValidationException::withMessages([
                'email' => ['Only company email addresses are allowed.'],
            ]);
        }

        return $data;
    }
}
```

Bind it in your app provider:

```php
$this->app->singleton(
    \NinjaPortal\Portal\Contracts\Services\UserServiceInterface::class,
    \App\Portal\Services\EnterpriseUserService::class,
);
```

See also: [Portal / Models, Repositories & Services](/portal/models-services)

---

## Add a domain event listener (without changing core code)

Prefer this for side effects: webhooks, metrics, analytics, CRM sync, notifications.

### Example use case

Send a webhook when an API product is updated.

```php
namespace App\Listeners;

use NinjaPortal\Portal\Events\ApiProduct\ApiProductUpdatedEvent;

class SendApiProductWebhook
{
    public function handle(ApiProductUpdatedEvent $event): void
    {
        $product = $event->apiProduct;

        // dispatch job or call webhook client here
    }
}
```

Register via your extension provider (recommended with `BasePortalServiceProvider`):

```php
namespace App\Providers;

use App\Listeners\SendApiProductWebhook;
use NinjaPortal\Portal\Events\ApiProduct\ApiProductUpdatedEvent;
use NinjaPortal\Portal\Providers\BasePortalServiceProvider;

class NinjaPortalExtensionServiceProvider extends BasePortalServiceProvider
{
    protected $listen = [
        ApiProductUpdatedEvent::class => [
            SendApiProductWebhook::class,
        ],
    ];
}
```

See also: [Portal / Hooks & Events](/portal/hooks-events)

---

## Register model observers using `BasePortalServiceProvider`

Use this when you need Eloquent model lifecycle hooks (created/updated/deleted) and want a clean package-friendly registration mechanism.

### Example use case

Mirror category changes to a search index.

```php
namespace App\Observers;

use NinjaPortal\Portal\Models\Category;

class CategoryObserver
{
    public function saved(Category $category): void
    {
        // Update search index
    }

    public function deleted(Category $category): void
    {
        // Remove from search index
    }
}
```

Register it:

```php
protected $observers = [
    \NinjaPortal\Portal\Models\Category::class => [
        \App\Observers\CategoryObserver::class,
    ],
];
```

See also: [Reference / Listeners & Observers](/reference/listeners-observers)

---

## Override Portal API auth flow (SSO / custom pre-checks)

Use `AuthFlowInterface` when you need to change login behavior without editing API controllers.

### Example use case

Require SSO for admin users from a specific domain.

```php
namespace App\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use NinjaPortal\Api\Contracts\Auth\AuthFlowInterface;

class CustomAuthFlow implements AuthFlowInterface
{
    public function __construct(private AuthFlowInterface $inner) {}

    public function attemptLogin(string $email, string $password, string $context): array
    {
        if ($context === 'admin' && str_ends_with(strtolower($email), '@corp.example')) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => ['Use enterprise SSO for this account.'],
            ]);
        }

        return $this->inner->attemptLogin($email, $password, $context);
    }

    public function issueForUser(Authenticatable $user, string $context): array
    {
        return $this->inner->issueForUser($user, $context);
    }

    public function refresh(string $refreshToken, string $context): array
    {
        return $this->inner->refresh($refreshToken, $context);
    }

    public function logout(string $refreshToken, string $context): void
    {
        $this->inner->logout($refreshToken, $context);
    }
}
```

Bind it in your app/provider.

See also: [Portal API / Extending Portal API](/portal-api/extending)

---

## Decorate MFA auth flow instead of replacing it entirely

If `portal-mfa` is installed, do not bind directly to the default `AuthFlow` unless you want to remove MFA behavior.

### Recommended pattern

Decorate `NinjaPortal\Mfa\Auth\MfaAuthFlow` (or the currently resolved `AuthFlowInterface`) to add custom checks while preserving MFA challenge behavior.

Use this for:

- risk-based login blocks
- IP restrictions
- custom audit hooks
- SSO fallback logic

See also: [Portal MFA / Flows & Endpoints](/portal-mfa/flows)

---

## Add a custom MFA driver

Use `portal-mfa.drivers.map` + `MfaDriverInterface` to add new factors (for example SMS OTP, push approval, hardware challenge).

### Example use case

Add `sms_otp` in a separate package.

```php
// config/portal-mfa.php
'drivers' => [
    'map' => [
        'authenticator' => \NinjaPortal\Mfa\Drivers\AuthenticatorAppDriver::class,
        'email_otp' => \NinjaPortal\Mfa\Drivers\EmailOtpDriver::class,
        'sms_otp' => \Vendor\PortalSmsMfa\SmsOtpDriver::class,
    ],
],

'actors' => [
    'admin' => [
        'allowed_drivers' => ['authenticator', 'email_otp', 'sms_otp'],
    ],
],
```

If your driver supports setup/enrollment flows, also implement `EnrollsMfaFactorInterface`.

See also: [Portal MFA / Drivers & Extensibility](/portal-mfa/drivers)

---

## Expose more settings in the public config endpoint

`portal-api` public config is controlled by `portal-api.public_settings`.

### Example use case

Expose branding and feature-flag settings to frontend clients.

```php
// config/portal-api.php
'public_settings' => [
    'groups' => ['Portal', 'Branding', 'Feature Flags'],
    'keys' => [
        'branding.logo_url',
        'branding.primary_color',
        'feature_flags.enable_signup',
    ],
],
```

Use group-based exposure for broad category publishing and `keys` for precise additions.

See also: [Configuration / Portal API Package](/configuration/portal-api)

---

## Replace API authorization behavior (`ApiAuthorizerInterface`)

Use this to implement tenant-aware checks or integrate a different policy engine.

### Example use case

Add tenant scoping before Laravel Gate authorization.

```php
namespace App\Authorization;

use NinjaPortal\Api\Contracts\Authorization\ApiAuthorizerInterface;

class TenantAwareAuthorizer implements ApiAuthorizerInterface
{
    public function authorize(string $ability, mixed $arguments = []): void
    {
        // 1) tenant membership / tenant resource check
        // 2) delegate to Gate::authorize() or throw AuthorizationException
    }
}
```

Bind it:

```php
$this->app->bind(
    \NinjaPortal\Api\Contracts\Authorization\ApiAuthorizerInterface::class,
    \App\Authorization\TenantAwareAuthorizer::class,
);
```

See also: [Portal API / Extending Portal API](/portal-api/extending)

---

## Add a translatable custom model

Use `HasTranslations` for your own localized models.

### Minimal steps

1. Create main table (`articles`)
2. Create translation table (`article_translations`)
3. Create translation model
4. Add `HasTranslations` to main model
5. Define `$translated_attributes`

See the full example in: [Portal / Translations](/portal/translations)

---

## Customize RBAC route permissions

Admin API route middleware permissions are configurable through `portal-api.rbac.permissions.*`.

### Example use case

Rename permissions to align with an enterprise permission catalog.

```php
// config/portal-api.php
'rbac' => [
    'permissions' => [
        'access_admin' => 'enterprise.portal.admin.access',
        'manage_rbac' => 'enterprise.portal.rbac.manage',
        'manage_admins' => 'enterprise.portal.admins.manage',
        'view_activities' => 'enterprise.portal.activities.view',
    ],
],
```

If you customize these names, make sure your seeders/provisioning create matching permissions.

See also: [Portal / RBAC & Policies](/portal/rbac)

---

## Improve Scribe endpoint docs quality

Scribe warnings are often non-blocking, but you can improve docs quality significantly with a few patterns.

### Recipe checklist

- add `bodyParameters()` to FormRequests for rich request docs
- add `@group`, `@authenticated`, `@bodyParam`, and `@response` annotations on custom endpoints
- use API resources or `@apiResourceCollection` where possible
- keep examples aligned with the Portal API response envelope

Generation command:

```bash
cd backend
php artisan scribe:generate --no-interaction
```

See also: [Portal API / Scribe & API Docs](/portal-api/scribe)

---

## Link frontend teams to Scribe docs by environment

This is one of the simplest but highest-impact onboarding improvements.

### Recommended links to publish internally

- Local: [http://localhost:8000/docs](http://localhost:8000/docs)
- Staging: [https://staging-api.example.com/docs](https://staging-api.example.com/docs)
- Production: [https://api.example.com/docs](https://api.example.com/docs)

Keep the canonical links listed in:

- [Home](/)
- [Portal API / Scribe & API Docs](/portal-api/scribe)
- frontend onboarding docs / runbooks

### Team workflow tip

When frontend engineers report an integration issue, ask for:

1. environment (local/staging/prod)
2. exact Scribe endpoint page URL
3. request/response payload snippet
4. current API version / branch

This reduces ambiguity quickly.

---

## Next useful pages

- [Portal / Hooks & Events](/portal/hooks-events)
- [Portal API / Extending Portal API](/portal-api/extending)
- [Portal MFA / Drivers & Extensibility](/portal-mfa/drivers)
- [Reference / Events Catalog](/reference/events)
- [Reference / Database Schema](/reference/database-schema)
