# RBAC & Policies

NinjaPortal uses **Spatie Laravel Permission** for roles and permissions, with Portal policies providing model-level authorization rules.

## Core pieces

- `RbacSeeder` seeds roles/permissions
- `BasePolicy` defines standard CRUD ability checks
- per-model policies extend `BasePolicy`
- `PortalServiceProvider` registers policies for core models
- `portal-api` composes route-level RBAC middleware for admin APIs

## Permission naming convention (standardized)

Portal policy permissions follow:

```text
portal.{model}.{ability}
```

Examples:

- `portal.user.view_any`
- `portal.api_product.update`
- `portal.setting.delete`
- `portal.role.force_delete`

`BasePolicy` also supports a legacy fallback format (`{ability}_{model}`) for backward compatibility.

## Policy abilities supported by `BasePolicy`

- `view_any`
- `view`
- `create`
- `update`
- `delete`
- `restore`
- `force_delete`

## Super admin behavior

`BasePolicy::before()` grants access when the authenticated user:

- `isSuperAdmin()` returns true, or
- has role `super_admin`

## `RbacSeeder` behavior

The seeder creates:

### Route/API-level permissions

- `portal.admin.access`
- `portal.rbac.manage`
- `portal.admins.manage`
- `portal.activities.view`

### Model-policy permissions

Generated from model list × policy abilities using the standardized format.

### Role bootstrap

- creates `super_admin`
- assigns all seeded permissions
- assigns `super_admin` to the first admin user (if available and compatible)

## Portal API admin RBAC middleware

`portal-api` builds admin route middleware dynamically from config:

- auth guard: `portal-api.auth.guards.admin`
- route permissions from `portal-api.rbac.permissions.*`
- optional bypass roles from `portal-api.rbac.bypass_roles`

Key route groups use different permissions:

- admin access baseline (`portal.admin.access` by default)
- manage admins
- manage RBAC
- view activities

## Policy enforcement in API controllers

In addition to route-level RBAC middleware, `portal-api` controllers use `authorizeApi()` helpers (via `ApiAuthorizerInterface`) when `portal-api.authorization.use_policies=true`.

This allows a layered authorization model:

- **route-level permission gates** (broad access)
- **policy checks** (resource-level access)

## Extending RBAC behavior

### Custom permission names / policy logic

- override permission names in `portal-api` config
- replace policies in your app (via `Gate::policy` registration) if needed

### Replace API authorizer implementation

Bind a custom `ApiAuthorizerInterface` to support ABAC, tenant checks, external policy engines, etc.

See [Portal API / Extending Portal API](/portal-api/extending).
