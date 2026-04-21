# Apigee Backed Operations

NinjaPortal integrates with Apigee through `lordjoo/laraapigee`.

The `portal` package uses LaraApigee to expose domain-friendly services for operations where the source of truth is Apigee (not your local database).

## Why this matters

Some NinjaPortal features are local-domain features (DB-backed), and some are integration features (Apigee-backed).

Understanding that boundary helps you choose the correct extension pattern.

## Apigee-backed operations in the core solution

Common examples:

- developer app management
- app credential/key lifecycle operations
- product synchronization/orchestration workflows
- user/developer sync to Apigee (through listeners)

These are typically orchestrated through services such as:

- `UserAppService`
- `UserAppCredentialService`

## LaraApigee's role

`lordjoo/laraapigee` is the Apigee client layer used by the Portal package.

It abstracts Apigee Edge and Apigee X APIs behind PHP services/contracts, so the Portal package can work with domain-oriented services/events rather than raw HTTP calls.

> Dedicated LaraApigee documentation is planned later. For now, treat its config/README as the reference for credential setup and client behavior.

## Authenticate with Apigee (setup checklist)

Before using Apigee-backed operations, make sure LaraApigee is configured.

Typical configuration concerns:

- platform/driver selection (`edge` vs `apigeex`)
- organization name
- endpoint/base URL
- credentials
  - Edge: username/password-style credentials
  - Apigee X: service account key file (`key_file`)

Common config keys you will encounter:

- `laraapigee.organization`
- `laraapigee.endpoint`
- `laraapigee.username`
- `laraapigee.password`
- `laraapigee.key_file`

## Design guidance when extending Apigee-backed behavior

- prefer listeners for side effects around domain events
- keep API transport concerns in LaraApigee/integration services, not in controllers
- preserve event dispatch behavior if you replace Portal services
- treat remote failures as integration concerns (logging/retries/job strategies in your application)

## Where to go next

- [Portal / Apigee Integration (Reference)](/portal/apigee-integration)
- [Deepdive / Extending the Portal](/deepdive/extending-the-portal)

