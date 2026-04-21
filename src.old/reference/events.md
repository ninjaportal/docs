# Events Catalog

This page documents all events currently defined in the core packages covered by this docs site.

## Why events matter in NinjaPortal

Events are the primary extensibility mechanism for:

- audit logging
- notifications
- webhooks
- external syncs (Apigee, third-party systems)
- add-on packages

## Portal package events (`ninjaportal/portal`)

### CRUD events (model lifecycle)

These events generally carry the affected model instance as a single public property.

#### Admin

- `NinjaPortal\Portal\Events\Admin\AdminCreatedEvent` (`Admin $admin`)
- `NinjaPortal\Portal\Events\Admin\AdminUpdatedEvent` (`Admin $admin`)
- `NinjaPortal\Portal\Events\Admin\AdminDeletedEvent` (`Admin $admin`)

#### User

- `NinjaPortal\Portal\Events\User\UserCreatedEvent` (`User $user`)
- `NinjaPortal\Portal\Events\User\UserUpdatedEvent` (`User $user`)
- `NinjaPortal\Portal\Events\User\UserDeletedEvent` (`User $user`)

#### API Product

- `NinjaPortal\Portal\Events\ApiProduct\ApiProductCreatedEvent` (`ApiProduct $apiProduct`)
- `NinjaPortal\Portal\Events\ApiProduct\ApiProductUpdatedEvent` (`ApiProduct $apiProduct`)
- `NinjaPortal\Portal\Events\ApiProduct\ApiProductDeletedEvent` (`ApiProduct $apiProduct`)

#### Audience

- `NinjaPortal\Portal\Events\Audience\AudienceCreatedEvent` (`Audience $audience`)
- `NinjaPortal\Portal\Events\Audience\AudienceUpdatedEvent` (`Audience $audience`)
- `NinjaPortal\Portal\Events\Audience\AudienceDeletedEvent` (`Audience $audience`)

#### Category

- `NinjaPortal\Portal\Events\Category\CategoryCreatedEvent` (`Category $category`)
- `NinjaPortal\Portal\Events\Category\CategoryUpdatedEvent` (`Category $category`)
- `NinjaPortal\Portal\Events\Category\CategoryDeletedEvent` (`Category $category`)

#### Menu

- `NinjaPortal\Portal\Events\Menu\MenuCreatedEvent` (`Menu $menu`)
- `NinjaPortal\Portal\Events\Menu\MenuUpdatedEvent` (`Menu $menu`)
- `NinjaPortal\Portal\Events\Menu\MenuDeletedEvent` (`Menu $menu`)

#### Menu Item

- `NinjaPortal\Portal\Events\Menu\MenuItemCreatedEvent` (`MenuItem $menuItem`)
- `NinjaPortal\Portal\Events\Menu\MenuItemUpdatedEvent` (`MenuItem $menuItem`)
- `NinjaPortal\Portal\Events\Menu\MenuItemDeletedEvent` (`MenuItem $menuItem`)

#### Setting

- `NinjaPortal\Portal\Events\Setting\SettingCreatedEvent` (`Setting $setting`)
- `NinjaPortal\Portal\Events\Setting\SettingUpdatedEvent` (`Setting $setting`)
- `NinjaPortal\Portal\Events\Setting\SettingDeletedEvent` (`Setting $setting`)

### Sync / relation events

These events carry a model instance plus an array of IDs.

- `NinjaPortal\Portal\Events\Admin\AdminRolesSyncedEvent` (`Admin $admin`, `array $roleIds`)
- `NinjaPortal\Portal\Events\User\UserAudiencesSyncedEvent` (`User $user`, `array $audienceIds`)
- `NinjaPortal\Portal\Events\Audience\AudienceUsersSyncedEvent` (`Audience $audience`, `array $userIds`)
- `NinjaPortal\Portal\Events\Audience\AudienceProductsSyncedEvent` (`Audience $audience`, `array $apiProductIds`)
- `NinjaPortal\Portal\Events\ApiProduct\ApiProductCategoriesSyncedEvent` (`ApiProduct $apiProduct`, `array $categoryIds`)
- `NinjaPortal\Portal\Events\ApiProduct\ApiProductAudiencesSyncedEvent` (`ApiProduct $apiProduct`, `array $audienceIds`)

### User account/password events

- `NinjaPortal\Portal\Events\User\UserPasswordResetRequestedEvent`
  - payload: `User $user`, `string $token`
- `NinjaPortal\Portal\Events\User\UserResetPasswordEvent`
  - payload: `User $user`

### Apigee developer app events (`UserApp*`)

These events are fired by `UserAppService` and carry Apigee developer app entities and user email.

- `NinjaPortal\Portal\Events\UserApp\UserAppCreatedEvent` (`EntityInterface $app`, `string $userEmail`)
- `NinjaPortal\Portal\Events\UserApp\UserAppUpdatedEvent` (`string $userEmail`, `EntityInterface $app`)
- `NinjaPortal\Portal\Events\UserApp\UserAppDeletedEvent` (`EntityInterface $app`, `string $userEmail`)
- `NinjaPortal\Portal\Events\UserApp\UserAppApprovedEvent` (`string $userEmail`, `EntityInterface $app`)
- `NinjaPortal\Portal\Events\UserApp\UserAppRevokedEvent` (`string $userEmail`, `EntityInterface $app`)

### Apigee developer app credential events (`UserAppCredential*Event`)

These events are fired by `UserAppCredentialService`.

#### Credential lifecycle

- `NinjaPortal\Portal\Events\UserAppCredentialCreatedEvent`
  - payload: `string $email`, `string $appID`, `?string $credentialKey`
- `NinjaPortal\Portal\Events\UserAppCredentialApprovedEvent`
  - payload: `string $email`, `string $appID`, `?string $credentialKey`
- `NinjaPortal\Portal\Events\UserAppCredentialRevokedEvent`
  - payload: `string $email`, `string $appID`, `?string $credentialKey`
- `NinjaPortal\Portal\Events\UserAppCredentialDeletedEvent`
  - payload: `string $email`, `string $appID`, `?string $credentialKey`

#### Credential product operations

- `NinjaPortal\Portal\Events\UserAppCredentialProductAddedEvent`
  - payload: `string $email`, `string $appID`, `array $api_products`, `?string $credentialKey`
- `NinjaPortal\Portal\Events\UserAppCredentialProductRemovedEvent`
  - payload: `string $email`, `string $appID`, `string $api_product`, `?string $credentialKey`
- `NinjaPortal\Portal\Events\UserAppCredentialProductApprovedEvent`
  - payload: `string $email`, `string $appID`, `string $api_product`, `?string $credentialKey`
- `NinjaPortal\Portal\Events\UserAppCredentialProductRevokedEvent`
  - payload: `string $email`, `string $appID`, `string $api_product`, `?string $credentialKey`

## Portal API events (`ninjaportal/portal-api`)

These are auth/token lifecycle events emitted by `AuthFlow` and `TokenService`.

- `NinjaPortal\Api\Events\Auth\LoginAttemptedEvent`
  - payload: `string $context`, `string $email`
- `NinjaPortal\Api\Events\Auth\LoginFailedEvent`
  - payload: `string $context`, `string $email`, `string $reason = 'failed'`
- `NinjaPortal\Api\Events\Auth\LoginSucceededEvent`
  - payload: `string $context`, `string $email`, `Authenticatable $user`
- `NinjaPortal\Api\Events\Auth\TokenIssuedEvent`
  - payload: `string $context`, `Authenticatable $user`, `array $payload`
- `NinjaPortal\Api\Events\Auth\TokenRefreshedEvent`
  - payload: `string $context`, `Authenticatable $user`, `array $payload`
- `NinjaPortal\Api\Events\Auth\TokenRevokedEvent`
  - payload: `string $context`, `int $revokedCount = 0`

## Optional extension events: Portal MFA (`ninjaportal/portal-mfa`)

These events are emitted by MFA challenge and factor services/drivers.

- `NinjaPortal\Mfa\Events\MfaChallengeCreatedEvent`
  - payload: `string $context`, `string $purpose`, `Authenticatable $actor`, `MfaChallenge $challenge`, `array $clientPayload`
- `NinjaPortal\Mfa\Events\MfaChallengeFailedEvent`
  - payload: `string $context`, `string $purpose`, `Authenticatable $actor`, `MfaChallenge $challenge`, `string $reason`
- `NinjaPortal\Mfa\Events\MfaChallengeVerifiedEvent`
  - payload: `string $context`, `string $purpose`, `Authenticatable $actor`, `MfaChallenge $challenge`
- `NinjaPortal\Mfa\Events\MfaFactorEnabledEvent`
  - payload: `string $context`, `Authenticatable $actor`, `MfaFactor $factor`
- `NinjaPortal\Mfa\Events\MfaFactorDisabledEvent`
  - payload: `string $context`, `Authenticatable $actor`, `MfaFactor $factor`
- `NinjaPortal\Mfa\Events\MfaOtpSentEvent`
  - payload: `string $context`, `string $purpose`, `Authenticatable $actor`, `MfaChallenge $challenge`, `string $driver`

## Event usage guidance

- Prefer listeners/subscribers for side effects and integrations.
- Avoid coupling to event class internals beyond documented payload properties.
- For package extensions, depend on canonical `...Event` names (not legacy aliases).
