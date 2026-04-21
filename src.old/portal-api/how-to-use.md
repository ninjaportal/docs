# Portal API: How to Use

This page explains how client applications and Laravel applications typically use `ninjaportal/portal-api`.

## 1. Understand the route groups first

Portal API is split into three logical route groups:

- **Public**: catalog/public config endpoints
- **Consumer**: user registration/auth/profile/app self-service
- **Admin**: operational/admin management APIs

Start here:

- [Portal API / Routes & Response Contract](/portal-api/routes-responses)

## 2. Integrate against the response contract (not controller internals)

Clients should build against the documented response envelope:

- success/error consistency
- root `data`
- root `meta.pagination` for paginated endpoints

This allows the backend to evolve internally while preserving API contract stability.

## 3. Use the correct auth context

Portal API supports separate admin and consumer auth contexts.

That means your client integration should keep tokens separate for each context and call the matching route group.

Relevant docs:

- [Portal API / Authentication & Tokens](/portal-api/auth-tokens)
- [Portal API / Config Reference](/portal-api/config-reference)

## 4. Use Scribe docs for endpoint-by-endpoint reference

This VitePress site explains architecture and extension patterns. Use Scribe for detailed endpoint payloads.

- Local docs: `http://localhost:8000/docs`
- See [Portal API / Scribe & API Docs](/portal-api/scribe)

## 5. Host app usage (backend integration)

When extending the API behavior inside your Laravel app:

- bind interfaces (`AuthFlowInterface`, `TokenServiceInterface`, `ApiAuthorizerInterface`)
- configure models/guards through `portal-api` config
- prefer decorators/wrappers over controller forks

See:

- [Portal API / How to Extend](/portal-api/extending)

## 6. Common integration scenarios

### Custom frontend or admin client

- consume admin/consumer/public routes
- follow response envelope contract
- generate API client from Scribe OpenAPI if desired

### SSO / MFA / step-up auth

- replace or decorate `AuthFlowInterface`
- optionally combine with `ninjaportal/portal-mfa`

### Custom authorization model

- replace `ApiAuthorizerInterface`
- keep route middleware + policy expectations documented for your team

## 7. Recommended rollout checklist

1. Verify route prefixes and guards
2. Confirm auth token TTLs and prune schedule
3. Validate response contract in staging
4. Generate/publish Scribe docs URLs for the target environment
5. Add integration tests for custom auth/authorizer replacements
