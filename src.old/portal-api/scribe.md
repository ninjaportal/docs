# Scribe & API Docs

Portal API uses **Scribe** in the backend app (`backend/config/scribe.php`) to generate endpoint reference docs and OpenAPI.

## Recommended documentation model

- **VitePress (this site)**: architecture, extension patterns, configuration, internals
- **Scribe**: endpoint-by-endpoint REST reference

## Generation command

```bash
cd backend
php artisan scribe:generate --no-interaction
```

## Endpoint docs URLs by environment

Use these links as the primary endpoint reference entry points for each environment.
Replace the staging/production domains with your actual deployed API hosts.

- Local: [http://localhost:8000/docs](http://localhost:8000/docs)
- Staging: [https://staging-api.example.com/docs](https://staging-api.example.com/docs)
- Production: [https://api.example.com/docs](https://api.example.com/docs)

If you expose OpenAPI artifacts directly as well, common paths are:

- Local OpenAPI: [http://localhost:8000/storage/app/private/scribe/openapi.yaml](http://localhost:8000/storage/app/private/scribe/openapi.yaml)
- Staging OpenAPI: `https://staging-api.example.com/.../openapi.yaml` (depends on your publish strategy)
- Production OpenAPI: `https://api.example.com/.../openapi.yaml` (depends on your publish strategy)

> Tip: keep these URLs mirrored in your onboarding docs, internal runbooks, and frontend team docs.

## Current Scribe strategy (important)

The project is configured to rely primarily on:

- API resources
- manual `@response` annotations
- custom docs response wrapping strategy

Live `response_calls` are disabled for deterministic docs generation and to avoid auth-related failures on protected routes.

## Common warnings you may see

Typical non-blocking warnings:

- `No bodyParameters() method found in ...`

This means Scribe will infer request field docs from `rules()` but may produce less rich descriptions/examples.

## Improving endpoint docs quality

### Add `bodyParameters()` to FormRequests

This is the most effective way to improve request body documentation while keeping code close to validation.

### Add/maintain controller annotations

Use Scribe annotations for:

- `@group`
- `@authenticated`
- `@bodyParam`
- `@response`
- `@apiResource` / `@apiResourceCollection`

### Keep examples consistent with the response envelope

Portal API uses a standardized response envelope and flattened pagination metadata (`meta.pagination`). Make sure annotated examples follow that contract.

## MFA docs note

When `portal-mfa` routes are installed in the backend app, Scribe can document MFA endpoints as part of the route set. The MFA package controllers include Scribe annotations for challenge and settings endpoints.

## Related reading

- [Getting Started](/getting-started)
- [Cookbook](/cookbook/)
- [Portal API Overview](/portal-api/)
