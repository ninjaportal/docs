# Package Map

This section explains what each NinjaPortal package is responsible for and how it relates to the rest of the platform.

## Core packages (covered in depth)

### `ninjaportal/portal`

The core domain package.

Responsibilities:

- core Eloquent models
- repositories + services
- domain events
- policies / RBAC conventions
- translation system
- Apigee-facing user app and credential domain services

### `ninjaportal/portal-api`

The REST API surface for the portal.

Responsibilities:

- API routes (`api/v1/public`, `consumer`, `admin`)
- auth endpoints and token lifecycle
- response envelope / pagination contract
- RBAC middleware composition
- policy authorization adapter
- activity logging
- Scribe integration

### `ninjaportal/portal-mfa` (optional)

Optional authentication extension package (MFA flows, factors, and driver-based verification).

## Other packages (project-level context)

### `lordjoo/laraapigee`

Apigee Management API client package used by Portal services. It abstracts Edge/X API interactions.

### `ninjaportal/portal-xmint`

Monetization package built on top of LaraApigee monetization APIs (wallets, transactions, subscriptions, rate plans).

## Host app vs package responsibility

A useful rule:

- **Package code** should provide reusable behavior and extension points.
- **Host app code** should provide deployment-specific decisions and custom integrations.

Examples:

- custom event listeners for CRM sync → application code or custom package
- replacing auth flow with SSO / custom checks → custom package binding `AuthFlowInterface`
- per-client policies/authorizers → application code or custom package binding `ApiAuthorizerInterface`
