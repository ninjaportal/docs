# Deployment

This page covers production deployment concerns for NinjaPortal at the platform level.

## Deployment checklist

## Backend (Laravel app)

- configure production `.env`
- run `composer install --no-dev --optimize-autoloader`
- run migrations
- cache config/routes/views as appropriate
- run queue workers
- run scheduler
- ensure storage permissions and public assets are correct

## Frontend admin (Nuxt)

- configure API base URL for `portal-api`
- build production assets
- verify login + refresh token flows
- verify MFA login behavior if enabled

## Runtime services recommended in production

- queue workers (required for reliable activity logging and async tasks)
- scheduler (`schedule:run`/`schedule:work`) for pruning and recurring tasks
- mail delivery service (password reset + MFA email OTP)
- centralized logs / monitoring

## Package-specific operational notes

### Portal (`ninjaportal/portal`)

- Settings cache behavior depends on `ninjaportal.settings.cache.*`
- Apigee sync listeners (if registered) require valid Apigee credentials and network access

### Portal API (`ninjaportal/portal-api`)

- Refresh token pruning can be scheduled via config (`portal-api.tokens.prune.*`)
- Ensure JWT secret strategy is explicit in production (`PORTAL_API_JWT_SECRET` recommended)
- Activity logging should have queue workers running if enabled
- Scribe docs generation should typically run in CI/release pipeline, not on every request host

### Portal MFA (`ninjaportal/portal-mfa`)

- Set actor policies (`required`, `allow_user_disable`) deliberately
- Configure mail transport for `email_otp`
- Run challenge pruning command/schedule in production
- Review custom MFA drivers for rate limits and secure storage

## Security recommendations

- use HTTPS everywhere (frontend + API)
- rotate secrets and JWT secret on secure procedure (plan token invalidation impact)
- protect admin endpoints with strong RBAC and MFA
- use least-privilege DB credentials
- audit logs and monitor auth failures / MFA failures

## Release / docs workflow recommendation

1. run backend tests/static analysis
2. run `php artisan scribe:generate --no-interaction`
3. build this VitePress docs site (`docs:build`)
4. publish backend/frontend and docs artifacts
5. run smoke tests (public endpoints, admin login, key CRUD APIs, MFA flow if enabled)
