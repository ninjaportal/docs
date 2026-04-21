# MFA Drivers & Extensibility

Portal MFA is intentionally designed around a driver registry.

## Driver registry

Configured in:

- `portal-mfa.drivers.map`

Resolved through:

- `NinjaPortal\Mfa\Contracts\Services\MfaDriverManagerInterface`
- default implementation: `MfaDriverManager`

## Built-in drivers

### `authenticator` (`AuthenticatorAppDriver`)

- TOTP-based MFA (RFC6238-style behavior)
- generates secret + `otpauth://` URI for enrollment
- verifies codes using `TotpService`
- does not support resend

### `email_otp` (`EmailOtpDriver`)

- sends one-time codes via email
- supports resend with cooldown + max resend count
- stores hashed OTP code in challenge row
- works for models with or without `Notifiable` by routing mail directly

## Driver interfaces

### `MfaDriverInterface`

Required for all drivers.

Responsibilities include:

- driver key
- challenge preparation
- challenge verification
- optional resend behavior

### `EnrollsMfaFactorInterface`

Optional, for drivers that support explicit factor setup flows (for example authenticator app enrollment).

## Adding a custom driver (example)

Use case: SMS OTP in a separate package.

### 1. Implement the driver

```php
namespace Vendor\PortalSmsMfa;

use NinjaPortal\Mfa\Contracts\Drivers\MfaDriverInterface;

class SmsOtpDriver implements MfaDriverInterface
{
    public function key(): string { return 'sms_otp'; }
    public function supportsResend(): bool { return true; }

    public function prepareChallenge($challenge, $factor, $actor, string $context): array
    {
        // send OTP and return challenge payload metadata
    }

    public function verifyChallenge($challenge, $factor, string $code, $actor, string $context): bool
    {
        // verify submitted OTP code
    }

    public function resendChallenge($challenge, $factor, $actor, string $context): array
    {
        // resend OTP and return updated payload
    }
}
```

### 2. Register it in config

```php
// config/portal-mfa.php
'drivers' => [
    'map' => [
        'authenticator' => \NinjaPortal\Mfa\Drivers\AuthenticatorAppDriver::class,
        'email_otp' => \NinjaPortal\Mfa\Drivers\EmailOtpDriver::class,
        'sms_otp' => \Vendor\PortalSmsMfa\SmsOtpDriver::class,
    ],
],
```

### 3. Allow it per actor

```php
'actors' => [
    'admin' => [
        'allowed_drivers' => ['authenticator', 'email_otp', 'sms_otp'],
    ],
],
```

## Security requirements for custom drivers

Custom drivers should:

- avoid storing raw OTP/secrets in DB
- enforce rate limits / resend cooldowns
- avoid leaking delivery destinations in cleartext when not necessary
- respect challenge expiry and max attempt counters
- return client payloads that are safe to expose publicly
