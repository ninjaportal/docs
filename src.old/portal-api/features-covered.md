# Portal API: Features Covered

This page summarizes what `ninjaportal/portal-api` covers on top of the Portal domain package.

## Core API capabilities

### 1. Versioned route structure

Portal API organizes routes under a versioned base prefix (default `api/v1`) and splits them into:

- public
- consumer
- admin

### 2. Authentication and token lifecycle

For consumer and admin actors:

- login
- refresh
- logout
- password reset/forgot flows (consumer side)
- JWT access tokens + opaque refresh tokens

### 3. Standardized JSON responses

Portal API enforces a consistent response envelope for:

- success responses
- validation/auth errors
- paginated lists (root `data[]` + root `meta.pagination`)

### 4. Admin management APIs (Portal domain exposure)

Admin route set covers core domain management features such as:

- users and related app/credential operations
- admins
- API products
- categories
- audiences
- menus and menu items
- settings
- RBAC roles and permissions
- activities/audit logs

### 5. Authorization integration

Portal API includes:

- RBAC middleware composition for route access
- policy authorization adapter (`ApiAuthorizerInterface`)
- configurable policy usage toggle

### 6. Activity logging

Critical domain/auth actions can be captured in `portal_api_activity_logs` via the built-in subscriber + job flow.

### 7. Scribe integration

The package is documented through Scribe with API-resource-based response examples and a custom response wrapper strategy.

## What Portal API intentionally does not cover

- MFA enrollment/challenges (handled by optional `ninjaportal/portal-mfa`)
- frontend UI implementation
- alternate policy engine implementations beyond the default authorizer (but it provides extension points)

## Feature-to-page map

- Routing + envelopes: [Routes & Response Contract](/portal-api/routes-responses)
- Auth/tokens: [Authentication & Tokens](/portal-api/auth-tokens)
- Audit trails: [Activity Logging](/portal-api/activity-logging)
- Extension seams: [How to Extend](/portal-api/extending)
- Docs generation: [Scribe & API Docs](/portal-api/scribe)

