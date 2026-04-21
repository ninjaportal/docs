# Authentication & Authorization

This page explains the shipped authentication and authorization flows in the core API package (`ninjaportal/portal-api`) and points you to the prebuilt endpoints/documentation.

## Authentication (shipped in `portal-api`)

Portal API ships authentication flows for two contexts:

- **consumer**
- **admin**

The package uses:

- `AuthFlowInterface` (login/refresh/logout orchestration)
- `TokenServiceInterface` (token issuance/refresh persistence mechanics)
- JWT access tokens + opaque refresh tokens

## What happens during login (simplified)

1. API auth controller receives request
2. Controller calls `AuthFlowInterface`
3. Auth flow validates credentials and context rules
4. Auth flow uses `TokenServiceInterface` to issue tokens
5. API returns a standardized JSON response

This architecture is important because it makes auth extensible without changing controller signatures.

## Authorization (shipped in `portal-api` + `portal`)

Authorization combines:

- **RBAC middleware** for route-level admin access
- **policy checks** (through `ApiAuthorizerInterface`) for model-level authorization

Default behavior:

- route permissions are configured in `portal-api.rbac.*`
- `PolicyApiAuthorizer` calls Laravel Gate/policies

## Prebuilt API endpoints (where they live)

Use the shipped endpoints unless you need a custom contract:

- **Consumer auth endpoints**: login, refresh, logout, password reset flows
- **Admin auth endpoints**: login, refresh, logout, profile auth context flows
- **Protected admin APIs**: domain management endpoints with RBAC + policy integration

The easiest way to browse the exact endpoints is the Scribe docs:

- [Portal API / Scribe & API Docs](/portal-api/scribe)

## Extending auth/authz

Common extension points:

- `AuthFlowInterface` (custom SSO / step-up logic / custom pre-checks)
- `TokenServiceInterface` (custom token handling)
- `ApiAuthorizerInterface` (tenant-aware or ABAC authorization)

Deep dive guides:

- [Deepdive / Add Custom Auth Flow](/deepdive/custom-auth-flow)
- [Portal API / How to Extend (Reference)](/portal-api/extending)

## Optional authentication extensions

Packages like `ninjaportal/portal-mfa` can extend the shipped auth flow without replacing controllers.

This docs section keeps MFA as an optional extension, not part of the core package architecture.

