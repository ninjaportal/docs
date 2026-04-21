# Utilities

This page documents useful utilities and helper infrastructure across the core packages that are especially helpful when extending NinjaPortal.

## Portal package utilities and helpers

## `BasePortalServiceProvider`

Namespace:

- `NinjaPortal\Portal\Providers\BasePortalServiceProvider`

Why it matters:

- clean registration for listeners, subscribers, and observers in your project/extensions
- keeps extension wiring organized instead of scattering registration logic

Use it when:

- adding domain listeners
- registering custom observers for Portal models

## `CrudOperationsTrait` and service hook flow

These provide the standard CRUD service behavior pattern used by many Portal services.

Why it matters:

- consistent lifecycle hooks (`before*`, `after*`)
- standardized event dispatch behavior through service traits

When extending a CRUD service, preserve this behavior unless you intentionally change it.

## `FireEventsTrait`

Used by CRUD-style services to dispatch convention-based domain events.

Why it matters:

- package listeners (and your custom listeners) depend on these events
- replacing services without preserving event dispatch can break audit/logging/integrations

## Portal API utilities and helpers

## `PortalApiContext`

Namespace:

- `NinjaPortal\Api\Support\PortalApiContext`

Purpose:

- resolves context-specific model classes, guards, and tables (`consumer` vs `admin`)
- avoids hardcoding user models or table names
- supports configurable model/guard setups

Use it when:

- building custom API request validation rules
- writing custom controllers/actions around consumer/admin model resolution

## `ApiResponseMixin`

Purpose:

- standardized response helpers/macros for success/error/paginated responses
- keeps response contract consistent across endpoints

Use it when:

- adding custom API endpoints and you want them to match the package response envelope

## `ApiExceptionMiddleware`

Purpose:

- central JSON exception formatting for API routes
- consistent error response contract

Why it matters:

- if you customize middleware stacks, you must preserve this behavior (or intentionally replace it)

## `PolicyApiAuthorizer` / `ApiAuthorizerInterface`

Purpose:

- adapter layer between controllers and authorization implementation
- default implementation delegates to Laravel policies/Gate

Why it matters:

- gives you a clean seam for tenant-aware/ABAC/custom policy engines

## Docs utilities (Scribe integration)

## Scribe response wrapper strategy

Portal API uses a custom docs response wrapper strategy so generated examples match the runtime response envelope (including flattened pagination metadata).

Why it matters:

- if you customize response shapes, update docs generation strategies accordingly

See:

- [Portal API / Scribe & API Docs](/portal-api/scribe)

## Practical usage pattern

When adding a custom API endpoint:

1. Resolve Portal services/contracts
2. Use `PortalApiContext` if model/guard context matters
3. Return responses via API response macros/mixins
4. Rely on `ApiExceptionMiddleware` for consistent JSON errors
5. Add Scribe annotations to keep docs accurate

