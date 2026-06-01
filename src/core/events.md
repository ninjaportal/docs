# Events

The `portal` package emits domain events whenever important portal actions happen.

Events are one of the main extension points in NinjaPortal. They let your application react to portal changes without editing the package internals. You can use them to build approval workflows, send notifications, write audit logs, trigger provisioning jobs, sync external systems, or customize the developer onboarding experience.

## How Events Are Emitted

Most CRUD services in the `portal` package follow the same flow:

```text
Controller or job
  -> Portal service contract
  -> Repository operation
  -> Service hook
  -> Portal domain event
  -> Built-in or custom listener
```

For example, when a developer is created through `UserServiceInterface::create()`, the service persists the user, fires `UserCreatedEvent`, and any registered listener can react to that event.

This is also how the built-in Apigee sync works. The package listens for user changes and syncs the developer with Apigee through `SyncUserWithApigeeListener`.

## Built In Listeners

| Listener | Purpose |
| --- | --- |
| `SyncUserWithApigeeListener` | Syncs created or updated portal users with the configured Apigee platform. |
| `SendUserPasswordResetNotificationListener` | Sends the password reset notification when a reset token is requested. |

You can keep these listeners, replace them, or add your own listeners alongside them.

## Event Catalog

### Users

| Event | Payload | When it is useful |
| --- | --- | --- |
| `UserCreatedEvent` | `$user` | Welcome emails, CRM sync, onboarding tasks, Apigee sync. |
| `UserUpdatedEvent` | `$user` | Profile sync, compliance review, external account updates. |
| `UserDeletedEvent` | `$user` | Cleanup jobs, offboarding, external deactivation. |
| `UserAudiencesSyncedEvent` | `$user`, `$audienceIds` | Recalculate access, notify downstream systems, refresh caches. |
| `UserPasswordResetRequestedEvent` | `$user`, `$token` | Custom password reset delivery. |
| `UserResetPasswordEvent` | `$user` | Security notifications, session revocation, audit logging. |

### Admins And RBAC

| Event | Payload | When it is useful |
| --- | --- | --- |
| `AdminCreatedEvent` | `$admin` | Notify platform owners, assign onboarding tasks. |
| `AdminUpdatedEvent` | `$admin` | Audit admin profile changes. |
| `AdminDeletedEvent` | `$admin` | Revoke external admin access. |
| `AdminRolesSyncedEvent` | `$admin`, `$roleIds` | Security audit, permission cache refresh. |
| `RoleCreatedEvent` | `$role` | Audit RBAC changes. |
| `RoleUpdatedEvent` | `$role` | Refresh policy caches. |
| `RoleDeletedEvent` | `$role` | Cleanup external access mappings. |
| `RolePermissionsSyncedEvent` | `$role`, `$permissionIds` | Rebuild authorization snapshots. |
| `PermissionCreatedEvent` | `$permission` | Audit permission creation. |
| `PermissionUpdatedEvent` | `$permission` | Audit permission changes. |
| `PermissionDeletedEvent` | `$permission` | Cleanup dependent workflows. |

### Catalog

| Event | Payload | When it is useful |
| --- | --- | --- |
| `ApiProductCreatedEvent` | `$apiProduct` | Publish catalog updates, trigger review workflows. |
| `ApiProductUpdatedEvent` | `$apiProduct` | Refresh search indexes, invalidate product caches. |
| `ApiProductDeletedEvent` | `$apiProduct` | Remove product references from external systems. |
| `ApiProductCategoriesSyncedEvent` | `$apiProduct`, `$categoryIds` | Refresh catalog navigation. |
| `ApiProductAudiencesSyncedEvent` | `$apiProduct`, `$audienceIds` | Recalculate product visibility. |
| `CategoryCreatedEvent` | `$category` | Update navigation or search indexes. |
| `CategoryUpdatedEvent` | `$category` | Refresh translated catalog pages. |
| `CategoryDeletedEvent` | `$category` | Cleanup catalog filters. |
| `AudienceCreatedEvent` | `$audience` | Create external segment mappings. |
| `AudienceUpdatedEvent` | `$audience` | Update segment metadata. |
| `AudienceDeletedEvent` | `$audience` | Remove external segment mappings. |
| `AudienceUsersSyncedEvent` | `$audience`, `$userIds` | Update developer access groups. |
| `AudienceProductsSyncedEvent` | `$audience`, `$apiProductIds` | Recalculate product access. |

### Developer Apps

| Event | Payload | When it is useful |
| --- | --- | --- |
| `UserAppCreatedEvent` | `$app`, `$userEmail` | Start app approval workflow, notify reviewers. |
| `UserAppUpdatedEvent` | `$userEmail`, `$app` | Audit app profile changes. |
| `UserAppDeletedEvent` | `$app`, `$userEmail` | Cleanup app-specific records. |
| `UserAppApprovedEvent` | `$userEmail`, `$app` | Notify developer, provision access. |
| `UserAppRevokedEvent` | `$userEmail`, `$app` | Notify developer, suspend related workflows. |

### Developer App Credentials

| Event | Payload | When it is useful |
| --- | --- | --- |
| `UserAppCredentialCreatedEvent` | `$email`, `$appID`, `$credentialKey` | Notify developer or security team. |
| `UserAppCredentialApprovedEvent` | `$email`, `$appID`, `$credentialKey` | Start credential activation workflow. |
| `UserAppCredentialRevokedEvent` | `$email`, `$appID`, `$credentialKey` | Notify owner, revoke dependent access. |
| `UserAppCredentialDeletedEvent` | `$email`, `$appID`, `$credentialKey` | Cleanup secrets or external logs. |
| `UserAppCredentialProductAddedEvent` | `$email`, `$appID`, `$api_products`, `$credentialKey` | Review new product access. |
| `UserAppCredentialProductRemovedEvent` | `$email`, `$appID`, `$api_product`, `$credentialKey` | Cleanup product-specific access. |
| `UserAppCredentialProductApprovedEvent` | `$email`, `$appID`, `$api_product`, `$credentialKey` | Notify developer that access is approved. |
| `UserAppCredentialProductRevokedEvent` | `$email`, `$appID`, `$api_product`, `$credentialKey` | Notify developer that access is revoked. |

### Navigation And Settings

| Event | Payload | When it is useful |
| --- | --- | --- |
| `MenuCreatedEvent` | `$menu` | Rebuild navigation cache. |
| `MenuUpdatedEvent` | `$menu` | Refresh frontend navigation. |
| `MenuDeletedEvent` | `$menu` | Cleanup menu references. |
| `MenuItemCreatedEvent` | `$menuItem` | Rebuild navigation cache. |
| `MenuItemUpdatedEvent` | `$menuItem` | Refresh localized navigation. |
| `MenuItemDeletedEvent` | `$menuItem` | Cleanup menu item references. |
| `SettingGroupCreatedEvent` | `$settingGroup` | Refresh admin settings navigation. |
| `SettingGroupUpdatedEvent` | `$settingGroup` | Refresh settings metadata. |
| `SettingGroupDeletedEvent` | `$settingGroup` | Cleanup settings UI references. |
| `SettingCreatedEvent` | `$setting` | Refresh runtime configuration. |
| `SettingUpdatedEvent` | `$setting` | Rebuild cached settings. |
| `SettingDeletedEvent` | `$setting` | Remove cached settings. |

## Register A Custom Listener

Create a listener in your application:

```php
<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use NinjaPortal\Portal\Events\User\UserCreatedEvent;

class SendDeveloperWelcomeEmail implements ShouldQueue
{
    public function handle(UserCreatedEvent $event): void
    {
        $developer = $event->user;

        // Send your notification, create onboarding tasks,
        // or call another internal service.
    }
}
```

Register it in your application event provider:

```php
<?php

namespace App\Providers;

use App\Listeners\SendDeveloperWelcomeEmail;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use NinjaPortal\Portal\Events\User\UserCreatedEvent;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        UserCreatedEvent::class => [
            SendDeveloperWelcomeEmail::class,
        ],
    ];
}
```

## Build A Custom Approval Workflow

The app lifecycle events are useful for approval workflows.

For example, when a developer creates an app, you can create an internal review task:

```php
<?php

namespace App\Listeners;

use App\Models\ApprovalRequest;
use NinjaPortal\Portal\Events\UserApp\UserAppCreatedEvent;

class CreateAppApprovalRequest
{
    public function handle(UserAppCreatedEvent $event): void
    {
        ApprovalRequest::query()->create([
            'type' => 'developer_app',
            'subject_email' => $event->userEmail,
            'subject_name' => $event->app->getName(),
            'status' => 'pending',
        ]);
    }
}
```

Then listen for `UserAppApprovedEvent` or `UserAppRevokedEvent` to close the workflow and notify the developer.

## Build A Catalog Publishing Workflow

Catalog events are useful when your project has a public catalog, search index, or static cache.

```php
<?php

namespace App\Listeners;

use App\Jobs\ReindexApiProduct;
use NinjaPortal\Portal\Events\ApiProduct\ApiProductUpdatedEvent;

class QueueApiProductReindex
{
    public function handle(ApiProductUpdatedEvent $event): void
    {
        ReindexApiProduct::dispatch($event->apiProduct->getKey());
    }
}
```

You can use the same idea with `ApiProductCategoriesSyncedEvent` and `ApiProductAudiencesSyncedEvent` to refresh catalog filters and visibility.

## Best Practices

- Keep listeners small and focused.
- Queue listeners that call external systems.
- Prefer listening to events over overriding package services when you only need to react to something.
- Use services when you need to change the operation itself.
- Use events when you need to add side effects after the operation succeeds.
- Avoid putting request-specific assumptions in listeners because the same event can be fired from APIs, jobs, seeders, or admin actions.
