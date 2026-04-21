# Portal API: DB Design

This page explains the database tables owned by `ninjaportal/portal-api`.

For the full cross-package schema reference, see [Reference / Database Schema](/reference/database-schema).

## Design goals

Portal API stores operational API concerns that should not live in the core domain package:

- refresh token persistence
- audit/activity logs

This keeps the `portal` package focused on domain behavior while `portal-api` owns transport/auth operational state.

## Tables

## `portal_api_refresh_tokens`

Purpose:

- stores **opaque refresh tokens** for both consumer and admin auth contexts
- supports token rotation and revocation
- keeps raw tokens out of the database (hashes only)

Key columns:

- `context` (`consumer|admin`)
- `token_hash` (unique)
- `tokenable_type`, `tokenable_id` (morph to actor model)
- `expires_at`
- `revoked_at`
- timestamps

Important design notes:

- raw refresh tokens are never stored
- refresh tokens are rotated on refresh
- supports multiple actor types through polymorphic columns

## `portal_api_activity_logs`

Purpose:

- stores audit records for important auth/domain actions
- supports asynchronous activity recording (`RecordActivityJob`)

Key columns:

- `action`
- actor info (`actor_type`, `actor_id`, `actor_name`, `actor_email`)
- subject info (`subject_type`, `subject_id`, `subject_label`)
- request metadata (`ip`, `user_agent`)
- `properties` (json)
- timestamps (`created_at` indexed)

Important design notes:

- designed for operational auditing and timeline-style admin views
- schema is generic enough to log different subject types without table-specific columns

## Relation to Portal schema

`portal-api` does not duplicate Portal domain tables.

Instead, it references actors/domains through:

- polymorphic columns (`tokenable_*`, `actor_*`, `subject_*`)
- service/controller use of Portal contracts/services

This keeps domain storage in `ninjaportal/portal` and API-specific storage in `ninjaportal/portal-api`.

## Operational recommendations

- index pruning/scheduling for refresh token cleanup
- monitor activity log growth and retention strategy
- consider archival/partitioning strategy for high-volume activity logs

See also:

- [Portal API / Authentication & Tokens](/portal-api/auth-tokens)
- [Portal API / Activity Logging](/portal-api/activity-logging)

