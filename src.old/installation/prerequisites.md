# Prerequisites

## Required software

### Backend

- PHP `^8.2`
- Composer
- MySQL (or compatible DB used by your Laravel setup)
- Node.js + pnpm/npm (for frontend and docs tooling)

### Frontend admin

- Node.js (LTS recommended)
- Package manager used by the frontend project (`pnpm` or `npm`, depending on team setup)

## Required services / configuration inputs

- Laravel `.env` values (DB, app URL, mail, queue, cache, etc.)
- Apigee credentials/config required by `laraapigee` (Edge or Apigee X)
- JWT configuration for `portal-api` (falls back to `APP_KEY` if `PORTAL_API_JWT_SECRET` is not set)

## Recommended for local development

- Mail trap service (for password reset and MFA email OTP testing)
- Queue worker running (for activity logging jobs and optional scheduled jobs)
- Redis (optional but recommended for cache/queue in non-trivial environments)
