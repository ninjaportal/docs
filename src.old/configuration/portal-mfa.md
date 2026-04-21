# Portal MFA Configuration (`portal-mfa`)

Portal MFA reads configuration from `config/portal-mfa.php`.

## `enabled`

Global on/off switch for the package behavior.

When disabled, the provider does not override `AuthFlowInterface`.

## `actors`

Per-actor MFA policy for:

- `consumer`
- `admin`

Each actor supports:

- `enabled`
- `required`
- `allow_user_disable`
- `allowed_drivers`
- `default_driver`

### Common policies

- **Optional MFA** for consumers, **required MFA** for admins
- disallow user disabling for privileged/admin environments

## `drivers.map`

Driver key -> driver class mapping.

Built-ins:

- `authenticator` => `AuthenticatorAppDriver`
- `email_otp` => `EmailOtpDriver`

Add custom drivers here to extend MFA without changing core package code.

## `drivers.authenticator`

TOTP settings:

- `issuer`
- `digits`
- `period`
- `window`
- `secret_length`

## `drivers.email_otp`

Email OTP behavior:

- `digits`
- `ttl_seconds`
- `resend_cooldown_seconds`
- `max_attempts`
- `max_resends`
- `notification` (custom notification class)
- `mailer`

## `challenge`

Challenge token + retention settings:

- `token_length`
- `login_ttl_seconds`
- `prune_after_days`

## `routes.enabled`

Disables/enables MFA package route registration while keeping package installed.

## Security notes

- challenge tokens are returned to clients as opaque values but stored hashed in DB
- OTP codes are stored hashed in DB
- authenticator secrets are encrypted in DB

See [Portal MFA / Drivers & Extensibility](/portal-mfa/drivers).
