# Authentication & Tokens

Portal API supports two auth contexts:

- `consumer` (developer / portal user)
- `admin` (dashboard/admin user)

## Core auth architecture

### `PortalApiContext`

`PortalApiContext` is a config-backed resolver for auth context concerns:

- model class for `consumer` / `admin`
- guard name for `consumer` / `admin`
- consumer/admin table names for validation rules
- consumer model route-key resolution

This is a major extensibility feature because it removes hardcoded `User` assumptions from the API package.

### `AuthFlowInterface`

Controllers depend on `AuthFlowInterface` rather than a concrete auth service.

Default binding:

- `AuthFlowInterface` -> `AuthFlow`

This enables packages (like `portal-mfa`) to replace the auth flow without changing controllers.

### `TokenServiceInterface`

Handles:

- access token issuance (JWT)
- refresh token issuance/storage
- refresh token rotation
- logout token revocation

Default binding:

- `TokenServiceInterface` -> `TokenService`

## Token model

Portal API stores refresh tokens in `portal_api_refresh_tokens`.

Important characteristics:

- opaque refresh token is returned to client
- only a hash (`sha256`) is stored in DB
- token row is scoped by context (`consumer` / `admin`)
- refresh tokens can expire and be revoked

## Auth lifecycle events

Portal API emits auth events:

- `LoginAttemptedEvent`
- `LoginFailedEvent`
- `LoginSucceededEvent`
- `TokenIssuedEvent`
- `TokenRefreshedEvent`
- `TokenRevokedEvent`

See [Events Catalog](/reference/events).

## MFA-compatible login behavior

When `portal-mfa` is installed and enabled, `AuthFlowInterface` is rebound to `MfaAuthFlow`.

Initial login may return:

- `200` with token payload (no MFA challenge required), or
- `202` with MFA challenge payload (challenge/verify flow required)

See [Portal MFA / Flows & Endpoints](/portal-mfa/flows).
