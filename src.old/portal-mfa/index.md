# Portal MFA Overview (`ninjaportal/portal-mfa`)

Portal MFA is a production-oriented extension package that adds configurable MFA to Portal API authentication for both actor types:

- `consumer`
- `admin`

## What the package provides

- MFA-aware `AuthFlowInterface` implementation (`MfaAuthFlow`)
- MFA profiles, factors, and challenges persistence
- built-in drivers:
  - authenticator app (TOTP)
  - email OTP
- per-user/admin MFA settings endpoints
- login challenge verify/resend endpoints
- driver registry for custom MFA drivers
- pruning command for stale MFA challenges

## Design goals

- secure by default (hashed tokens/codes, encrypted secrets)
- configurable by actor and driver
- package-level extensibility (custom drivers)
- minimal intrusion into `portal-api` controllers (interface override pattern)

## How it integrates with Portal API

`MfaServiceProvider` rebinds `NinjaPortal\Api\Contracts\Auth\AuthFlowInterface` to `MfaAuthFlow` when `portal-mfa.enabled=true`.

Controllers in `portal-api` continue depending on `AuthFlowInterface`, so no controller code changes are required for MFA support.

## Database tables

- `portal_mfa_profiles`
- `portal_mfa_factors`
- `portal_mfa_challenges`

See [Database Schema Reference](/reference/database-schema#portal-mfa-schema).
