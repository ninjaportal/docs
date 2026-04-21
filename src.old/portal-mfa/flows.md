# MFA Flows & Endpoints

## Login flow with MFA

### Without MFA requirement

- user/admin submits email + password
- `MfaAuthFlow` validates credentials
- no challenge required
- tokens issued immediately (`200`)

### With MFA enabled/required

- user/admin submits email + password
- `MfaAuthFlow` validates credentials
- `MfaChallengeService` creates a login challenge
- API returns `202` with challenge payload
- client verifies challenge via MFA endpoint
- tokens issued on successful challenge verification (`200`)

## Login MFA challenge response (`202`)

Example shape:

```json
{
  "success": true,
  "status": 202,
  "message": "MFA challenge required.",
  "data": {
    "mfa_required": true,
    "challenge_type": "login",
    "challenge_token": "<opaque-token>",
    "driver": "email_otp",
    "context": "consumer",
    "purpose": "login",
    "expires_at": "2026-02-24T20:30:00Z",
    "can_resend": true,
    "masked_destination": "j***e@example.com"
  },
  "meta": null
}
```

## Endpoints provided by `portal-mfa`

### Public challenge endpoints (finish login)

Consumer:

- `POST /api/v1/auth/mfa/challenge/verify`
- `POST /api/v1/auth/mfa/challenge/resend`

Admin:

- `POST /api/v1/{admin_prefix}/auth/mfa/challenge/verify`
- `POST /api/v1/{admin_prefix}/auth/mfa/challenge/resend`

### Authenticated MFA settings/factor management

Consumer:

- `GET /api/v1/me/mfa`
- `PUT /api/v1/me/mfa`
- authenticator setup/confirm/disable
- email OTP start/confirm/disable

Admin:

- `GET /api/v1/{admin_prefix}/me/mfa`
- `PUT /api/v1/{admin_prefix}/me/mfa`
- authenticator setup/confirm/disable
- email OTP start/confirm/disable

## MFA factor enrollment flows

### Authenticator app (TOTP)

1. Start setup endpoint returns `secret` + `otpauth_uri`
2. User scans in authenticator app
3. Confirm setup endpoint verifies TOTP code
4. Factor becomes enabled/verified

### Email OTP

1. Start endpoint creates an enrollment challenge and sends email code
2. Confirm endpoint validates code against challenge
3. Factor becomes enabled/verified

## Failure cases to expect

- invalid/expired challenge token (`422`)
- invalid verification code (`422`)
- resend cooldown hit (`422`)
- max attempts reached (`422`)
- MFA required but no eligible factor configured (`422` on login)
