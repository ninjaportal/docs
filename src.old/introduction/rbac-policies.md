# RBAC & Policies

NinjaPortal uses a layered authorization model:

- route-level permissions and middleware (mainly in `ninjaportal/portal-api`)
- model-level policy checks (Portal policies via API authorizer)

This gives you a practical balance:

- route gating for broad access
- policy authorization for object-level rules

## Core concepts

## Portal package (`ninjaportal/portal`)

Portal defines policy classes and permission naming conventions for core models.

Examples of what is covered:

- API products
- categories
- audiences
- menus / menu items
- settings
- users/admins (as applicable)

## Portal API package (`ninjaportal/portal-api`)

Portal API applies authorization through:

- RBAC middleware composition for admin routes
- `ApiAuthorizerInterface` (default: `PolicyApiAuthorizer`) for policy checks

This means you can replace authorization behavior without rewriting controllers.

## What you customize most often

- route permission names (`portal-api.rbac.*`)
- policy usage on/off (`portal-api.authorization.use_policies`)
- custom authorizer implementation (`ApiAuthorizerInterface`)
- application-specific policies and permission grants

## Where to go next

- [Portal / RBAC & Policies (Reference)](/portal/rbac)
- [Portal API / Config Reference](/portal-api/config-reference)
- [Portal API / How to Extend](/portal-api/extending)

