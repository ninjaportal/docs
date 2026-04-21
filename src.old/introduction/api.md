# API

`ninjaportal/portal-api` is the prebuilt API package for the NinjaPortal solution.

It exposes the Portal domain through a versioned REST API and handles auth/token flows, authorization integration, activity logging, and endpoint documentation support.

## What the API package gives you

- versioned routes (`api/v1` by default)
- public / consumer / admin route groups
- standardized JSON response envelope
- JWT access tokens + opaque refresh tokens
- RBAC route middleware (admin)
- policy authorizer adapter (`ApiAuthorizerInterface`)
- activity logging
- Scribe docs generation support

## Route groups (high level)

### Public

Examples:

- product catalog endpoints
- public config endpoint

### Consumer

Examples:

- register/login/logout/refresh
- profile endpoints
- app self-service endpoints

### Admin

Examples:

- admin auth/profile
- users, products, categories, audiences
- menus/menu items
- settings
- RBAC roles/permissions
- activity logs

## Why `portal-api` is a core package

NinjaPortal is not just a set of domain models. The API package standardizes how the domain is exposed and secured.

Even if you later build your own controllers/API layer, `portal-api` is the reference implementation for:

- response contracts
- auth flow design
- authorization integration
- activity logging patterns

## Prebuilt endpoint reference

Use Scribe-generated docs for endpoint-level details:

- Local: `http://localhost:8000/docs`
- See [Portal API / Scribe & API Docs](/portal-api/scribe)

## Where to go next

- [Portal API / Routes & Response Contract](/portal-api/routes-responses)
- [Portal API / Authentication & Tokens](/portal-api/auth-tokens)
- [Introduction / Authentication & Authorization](/introduction/authentication-authorization)

