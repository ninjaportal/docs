# Portal API Overview (`ninjaportal/portal-api`)

Portal API exposes the NinjaPortal domain as a versioned REST API for admin and consumer/frontends.

## What the package provides

- versioned routes under `api/v1` (configurable)
- public, consumer, and admin route groups
- standardized JSON response envelope
- JWT access tokens + opaque refresh tokens
- configurable auth models/guards via `PortalApiContext`
- admin RBAC middleware composition
- policy authorization adapter (`ApiAuthorizerInterface`)
- audit/activity logging subscriber + storage
- Scribe endpoint documentation generation support

## Route groups

- **Public**: catalog + public config
- **Consumer**: registration/auth/profile/app management
- **Admin**: admin auth + portal management APIs (users, products, content, settings, RBAC, activities)

## Key extension seams

- `AuthFlowInterface` (replace login flow behavior)
- `TokenServiceInterface` (replace token issuance/refresh behavior)
- `ApiAuthorizerInterface` (replace policy authorizer)
- configurable models/guards via `portal-api.auth.*`

## Response contract

Portal API standardizes response structure through response macros/mixins.

Typical shape:

```json
{
  "success": true,
  "status": 200,
  "message": "",
  "data": [],
  "meta": null
}
```

Paginated endpoints return root `data` array plus root `meta.pagination`.

See [Routes & Response Contract](/portal-api/routes-responses).

## Recommended reading path for this package

- [Installation & Configuration](/portal-api/installation-configuration)
- [Features Covered](/portal-api/features-covered)
- [DB Design](/portal-api/db-design)
- [How to Use](/portal-api/how-to-use)
- [Config Reference](/portal-api/config-reference)
- [Routes & Response Contract](/portal-api/routes-responses)
- [Authentication & Tokens](/portal-api/auth-tokens)
- [How to Extend](/portal-api/extending)
- [Activity Logging](/portal-api/activity-logging)
- [Scribe & API Docs](/portal-api/scribe)
