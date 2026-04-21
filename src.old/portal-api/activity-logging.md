# Activity Logging

Portal API includes an audit logging pipeline that records critical domain actions into `portal_api_activity_logs`.

## Core pieces

- `PortalDomainActivitySubscriber` (event subscriber)
- `RecordActivityJob` (async persistence job)
- `ActivityLog` model
- `portal_api_activity_logs` table

## How it works

1. Portal and API layers dispatch domain/auth events
2. `PortalDomainActivitySubscriber` subscribes to selected portal events
3. Subscriber builds normalized audit payloads
4. `RecordActivityJob` persists entries into `portal_api_activity_logs`

## What gets logged

### Portal domain CRUD events

Examples:

- user created/updated/deleted
- category/product/audience/menu/menu item/setting CRUD events

### Relationship sync events

Examples:

- user audiences sync
- audience users/products sync
- api product categories/audiences sync
- admin roles sync

### Apigee-backed app and credential events

Examples:

- user app created/approved/revoked
- user app credential created/revoked
- credential product add/remove/approve/revoke

## Config

- `portal-api.activity.enabled` (env: `PORTAL_API_ACTIVITY_ENABLED`)

## Extending activity logging

Options:

- subscribe to additional events in your own subscriber
- replace the subscriber registration strategy in a custom package/app provider
- enrich payloads with extra properties in listeners before dispatching jobs

## Notes

- Activity logging is asynchronous via job dispatch.
- Ensure queue workers are running in environments where audit completeness matters.
