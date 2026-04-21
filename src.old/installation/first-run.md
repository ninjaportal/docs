# First Run & Verification

## Start the backend app

```bash
cd backend
php artisan serve
```

(Optional but recommended in separate terminals)

```bash
php artisan queue:listen --tries=1
php artisan schedule:work
```

## Verify key runtime pieces

### 1. Health endpoint

If `portal-api` is installed and enabled, verify the health endpoint under your configured API prefix.

### 2. Public config/API endpoints

Check public routes from `portal-api`:

- `/api/v1/config`
- `/api/v1/api-products`

### 3. Admin auth flow

Verify admin login/refresh/logout endpoints.

If `portal-mfa` is enabled and MFA is configured/required, expect a `202 MFA challenge required` response instead of tokens on the initial login step.

### 4. Scribe docs generation

```bash
cd backend
php artisan scribe:generate --no-interaction
```

### 5. Settings cache behavior

Create/update a portal setting and verify it is reflected through the settings service and API output where applicable.

## Common first-run issues

- Missing DB tables → run `php artisan migrate`
- Missing JWT secret behavior confusion → review [Portal API config](/configuration/portal-api)
- Apigee sync failures on user events → validate `laraapigee` credentials and platform config
- MFA email OTP not received → check mailer config + queue/mail transport
