# Access Control & Audiences

Ninja Portal combines two authorization layers:

1. **Admin RBAC** (Spatie Permission) – used by NinjaAdmin for staff-level permissions.
2. **Audience-based gating** – used by the public portal to determine which users can view specific API products.

## 1. Admin RBAC

- Admins are stored in `ninja_admins`.
- Permissions come from Spatie’s `HasRoles` trait.
- Use `php artisan permission:create-role` etc., or manage roles in NinjaAdmin’s UI.
- You can gate routes via middleware (`->middleware(['role:operator'])`).

## 2. Audiences

An **audience** is a named segment (e.g., “Premium Partners”). Users can belong to multiple audiences, and API products can target multiple audiences.

- `AudienceService` exposes `assignUsers($audience, $userIds)` and `attachProducts($audience, $productIds)`.
- Shadow theme checks the authenticated user’s audiences before showing restricted products.
- Use audiences to build onboarding funnels (e.g., auto-assign `Developer` audience on signup, upgrade to `Partner` after vetting).

## 3. Policies

Portal registers policies for `ApiProduct`, `Category`, `Menu`, `Package`, `Rateplan`, `UserWallet`, etc. Each add-on can extend the policy map (e.g., portal-xmint binds `PackagePolicy` in its service provider).

To override a policy, register your own mapping:

```php
Gate::policy(ApiProduct::class, App\Policies\CustomApiProductPolicy::class);
```

## 4. Example Scenario

You want an API-only role that can manage products but not wallets:

1. Create a role `api-manager`.
2. Give it permissions `products.view`, `products.edit`, `products.publish`.
3. Deny wallet permissions (`wallets.sync`, `wallets.credit`).
4. Assign the role to specific admins via NinjaAdmin.

For end-user gating, create two audiences (`general`, `paying`) and assign API products appropriately. Use `AudienceService` from a controller/job to move users between audiences based on their subscription state.
