# Built-in Listeners, Subscribers & Observers

This page documents the built-in listener/subscriber/observer classes included in the covered NinjaPortal packages and how they are registered.

## Quick summary

### Auto-registered by package providers

- `NinjaPortal\Portal\Listeners\SendUserPasswordResetNotificationListener` (Portal)
- `NinjaPortal\Api\Listeners\PortalDomainActivitySubscriber` (Portal API subscriber)

### Built-in but typically registered by application/custom provider

- `NinjaPortal\Portal\Listeners\SyncUserWithApigeeListener`
- `NinjaPortal\Portal\Observers\SettingObserver`

## Portal package listeners

## `SendUserPasswordResetNotificationListener`

**Package:** `ninjaportal/portal`

**Event:** `UserPasswordResetRequestedEvent`

**Behavior:**

- checks whether the user model implements `sendPasswordResetNotification`
- if available, sends the reset notification using the provided token

**Registration:**

- registered automatically in `PortalServiceProvider::packageBooted()` via `Event::listen(...)`

## `SyncUserWithApigeeListener`

**Package:** `ninjaportal/portal`

**Events handled:**

- `UserCreatedEvent`
- `UserUpdatedEvent`

**Behavior:**

- converts portal user data into Apigee developer entity (Edge or Apigee X based on config)
- tries to find developer in Apigee
- creates or updates developer
- synchronizes status and custom attributes
- sets local `sync_with_apigee` flag when successful
- logs successes/failures

**Registration:**

- not auto-registered by `PortalServiceProvider`
- intended to be registered by the application (or extension package), commonly using `BasePortalServiceProvider`

**Use when:**

- you want portal user changes to synchronize to Apigee developer records automatically

## Portal package observer

## `SettingObserver`

**Package:** `ninjaportal/portal`

**Observed model:** `Setting`

**Methods:**

- `created()`
- `updated()`
- `deleted()`

**Behavior:**

- delegates to `SettingServiceInterface` to keep runtime settings state/cache synchronized

**Registration:**

- available as a built-in observer class
- register it via your app provider or `BasePortalServiceProvider::$observers`

Example:

```php
protected $observers = [
    \NinjaPortal\Portal\Models\Setting::class => [
        \NinjaPortal\Portal\Observers\SettingObserver::class,
    ],
];
```

## Portal API subscriber

## `PortalDomainActivitySubscriber`

**Package:** `ninjaportal/portal-api`

**Purpose:**

Subscribes to selected portal domain events and records audit/activity entries asynchronously via `RecordActivityJob`.

**Registration:**

- auto-subscribed in `ApiServiceProvider::packageBooted()` via `Event::subscribe(...)`

**Handler groups inside subscriber:**

- `handleCrud`
- `handleSync`
- `handleUserApp`
- `handleCredential`

### Subscribed event groups (high level)

- Portal CRUD events for core models (users, admins, products, categories, audiences, menus, menu items, settings)
- Portal relationship sync events
- Portal Apigee user app events
- Portal credential events (canonical `...Event` classes)

See [Events Catalog](/reference/events) for the full event list.

## MFA package listeners/subscribers

`ninjaportal/portal-mfa` currently exposes events but does not ship built-in listener/subscriber classes.

This is intentional: MFA package events are meant to be consumed by applications or add-on packages (notifications, analytics, SIEM, security alerts, etc.).

## Application helper for registration

`NinjaPortal\Portal\Providers\BasePortalServiceProvider` exists to make application extension registration straightforward:

- `$listen` for event listeners
- `$observers` for model observers

It registers them during provider booting.
