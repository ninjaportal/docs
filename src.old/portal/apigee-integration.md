# Apigee Integration (Portal Core)

Portal integrates with Apigee through the `laraapigee` package.

## Platform selection

Portal chooses the Apigee implementation using:

- `ninjaportal.apigee_platform` (`edge` or `apigeex`)

`NinjaPortal\Portal\Utils::getApigeeClient()` resolves the correct client (`LaraApigee::edge()` or `LaraApigee::apigeeX()`).

## Core Apigee-facing services in Portal

### `UserAppService`

Manages developer apps for portal users:

- list apps
- find app
- create/update/delete app
- approve/revoke app

Features:

- hooks (`beforeCreate`, `afterCreate`, etc.)
- event dispatch for app lifecycle actions
- error reporting/logging via shared trait

### `UserAppCredentialService`

Manages developer app credentials and credential-product associations:

- create/approve/revoke/delete credentials
- add/remove products
- approve/revoke product on a credential

Features:

- fires canonical credential events (including credential key context)
- designed for API/controller orchestration in `portal-api`

## User sync listener (optional integration pattern)

Built-in listener: `SyncUserWithApigeeListener`

- handles `UserCreatedEvent` and `UserUpdatedEvent`
- prepares Apigee developer entity based on platform (Edge/X)
- creates or updates developer in Apigee
- marks `sync_with_apigee=true` locally when successful

This listener is available as a built-in implementation and can be registered in your app/provider strategy as needed.

## Extension tips

- Prefer adding Apigee side effects via event listeners (e.g., on user/app/product events) instead of editing core services.
- When replacing Apigee-facing services, preserve event dispatch behavior so `portal-api` activity logging and other listeners remain functional.
