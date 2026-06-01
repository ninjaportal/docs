# Authentication

Shadow Theme uses a session-based developer authentication flow.

It does not use the `portal-api` JWT login endpoints. This keeps the browser frontend simple and lets the theme work even when a project does not install or expose the REST API package.

## Auth Model

| Concern | Shadow Theme behavior |
| --- | --- |
| Login | Validates developer credentials and stores the developer ID in the Laravel session. |
| Session key | Configured by `SHADOW_THEME_SESSION_KEY`. |
| Middleware | `shadow.user`, `shadow.guest`, and `shadow.auth`. |
| Password reset | Uses the configured Laravel password broker. |
| MFA | Optional, enabled when `portal-mfa` is installed and configured. |

Default session key:

```dotenv
SHADOW_THEME_SESSION_KEY=shadow_theme.user_id
```

## Middleware

Shadow Theme registers three middleware aliases:

| Middleware | Purpose |
| --- | --- |
| `shadow.user` | Resolves the current Shadow Theme developer for all theme routes. |
| `shadow.guest` | Redirects authenticated developers away from guest-only pages. |
| `shadow.auth` | Protects dashboard, profile, apps, credentials, and MFA settings pages. |

## Guest Routes

Guest routes include:

| Route | Purpose |
| --- | --- |
| `/login` | Login form. |
| `/register` | Developer registration. |
| `/forgot-password` | Password reset request. |
| `/reset-password` | Password reset completion. |
| `/auth/mfa` | MFA login challenge, when applicable. |

## Authenticated Routes

Authenticated routes include:

| Route | Purpose |
| --- | --- |
| `/dashboard` | Developer dashboard. |
| `/profile` | Profile settings. |
| `/apps` | Developer apps. |
| `/apps/{appName}` | App details and credentials. |
| `/settings/mfa` | MFA settings. |

## Password Reset

Configure the password broker:

```dotenv
SHADOW_THEME_PASSWORD_BROKER=users
```

Enable or disable password reset UI:

```dotenv
SHADOW_THEME_PASSWORD_RESET_ENABLED=true
```

## Optional MFA

When `ninjaportal/portal-mfa` is installed and enabled, Shadow Theme can show MFA flows for developers.

Enable the frontend UI:

```dotenv
SHADOW_THEME_MFA_UI_ENABLED=true
```

Supported UI flows include:

- Login MFA challenge.
- Authenticator app enrollment.
- Authenticator app confirmation.
- Email OTP enrollment.
- Email OTP confirmation.
- Disabling configured MFA drivers.

## Redirect After Login

By default, developers are redirected to the Shadow Theme dashboard.

Override it with:

```dotenv
SHADOW_THEME_REDIRECT_AFTER_LOGIN=portal/dashboard
```

Use this when your application has a custom post-login landing page.
