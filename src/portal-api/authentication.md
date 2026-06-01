# Authentication

The Portal API package ships two authentication contexts:

| Context | Purpose | Default guard |
| --- | --- | --- |
| Consumer | Developer-facing API users. | `api` |
| Admin | Admin panel operators. | `admin` |

Both contexts use JWT access tokens plus opaque database-backed refresh tokens.

## Token Model

| Token | Purpose | Storage |
| --- | --- | --- |
| Access token | Short-lived JWT used in the `Authorization` header. | Not stored by the package. |
| Refresh token | Long-lived opaque token used to issue a new token pair. | Stored hashed in `portal_api_refresh_tokens`. |

The default TTLs are:

| Token | Default |
| --- | --- |
| Access token | 15 minutes |
| Refresh token | 30 days |

Configure them with:

```dotenv
PORTAL_API_ACCESS_TTL=15
PORTAL_API_REFRESH_TTL=30
```

## Consumer Flow

Register a developer:

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

Login:

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

Use the returned access token:

```bash
curl http://localhost:8000/api/v1/me \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

Refresh the session:

```bash
curl -X POST http://localhost:8000/api/v1/auth/refresh \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "{REFRESH_TOKEN}"}'
```

Logout:

```bash
curl -X POST http://localhost:8000/api/v1/auth/logout \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "{REFRESH_TOKEN}"}'
```

## Admin Flow

Admin authentication uses the admin route prefix:

```bash
curl -X POST http://localhost:8000/api/v1/admin/auth/login \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

Use the returned access token for admin endpoints:

```bash
curl http://localhost:8000/api/v1/admin/me \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

## RBAC And Policies

Admin endpoints can be protected by two layers:

| Layer | Config | Purpose |
| --- | --- | --- |
| Route RBAC | `PORTAL_API_RBAC_ENABLED` | Uses Spatie roles and permissions on admin routes. |
| Policy checks | `PORTAL_API_USE_POLICIES` | Lets controllers call the configured API authorizer. |

The package includes default admin permissions such as:

| Permission | Purpose |
| --- | --- |
| `portal.admin.access` | Access protected admin API routes. |
| `portal.rbac.manage` | Manage roles and permissions. |
| `portal.admins.manage` | Manage admin accounts. |
| `portal.activities.view` | View activity logs. |

Super admin style bypass roles can be configured with:

```dotenv
PORTAL_API_RBAC_BYPASS_ROLES=super_admin
```

## Auth Extension Points

The authentication flow is intentionally replaceable.

| Contract | Default implementation | Use it for |
| --- | --- | --- |
| `AuthFlowInterface` | `AuthFlow` | Login, refresh, logout, issuing tokens after registration. |
| `TokenServiceInterface` | `TokenService` | JWT access tokens and refresh-token lifecycle. |

For MFA, SSO, risk scoring, or custom login rules, bind your own `AuthFlowInterface` implementation in your application or package.

The API package also emits auth lifecycle events:

| Event | When |
| --- | --- |
| `LoginAttemptedEvent` | Before credential validation. |
| `LoginFailedEvent` | When credentials fail. |
| `LoginSucceededEvent` | After successful login. |
| `TokenIssuedEvent` | When a token pair is issued. |
| `TokenRefreshedEvent` | When a refresh token is used successfully. |
| `TokenRevokedEvent` | When a refresh token is revoked. |

These events are useful for auditing, throttling, alerting, MFA challenge orchestration, and security analytics.

## Example: OAuth OpenID Connect Flow

For OAuth 2.0 / OpenID Connect, the recommended pattern is:

1. Let the identity provider authenticate the user.
2. Validate the callback `state` and authorization `code`.
3. Exchange the code for tokens at the identity provider.
4. Validate the `id_token` claims.
5. Find or create the local NinjaPortal user.
6. Use `TokenServiceInterface` to issue the normal Portal API token pair.

This keeps external identity separate from Portal API session management. Your client still receives the same NinjaPortal response shape:

```json
{
  "token_type": "Bearer",
  "access_token": "<jwt>",
  "expires_in": 900,
  "refresh_token": "<opaque-refresh-token>"
}
```

### 1. Create An OIDC Client Service

Use a small service to hide provider-specific details.

```php
<?php

namespace App\Auth;

class OidcUser
{
    public function __construct(
        public string $providerId,
        public string $email,
        public ?string $firstName = null,
        public ?string $lastName = null,
    ) {}
}
```

```php
<?php

namespace App\Auth;

interface OidcClientInterface
{
    public function authorizationUrl(string $state, string $nonce): string;

    public function userFromCallback(string $code, string $state, string $nonce): OidcUser;
}
```

Your implementation should validate the OpenID Connect response carefully:

| Check | Why |
| --- | --- |
| `state` | Protects against CSRF. |
| `nonce` | Protects against replayed ID tokens. |
| `iss` | Confirms the token came from the expected issuer. |
| `aud` | Confirms the token was issued for your client ID. |
| `exp` | Rejects expired tokens. |
| Signature | Confirms the token was signed by the provider. |
| Email verification | Optional, but recommended for developer/admin accounts. |

### 2. Add An OIDC Controller

This controller exchanges the OIDC identity for a Portal API token pair.

```php
<?php

namespace App\Http\Controllers\Api\Auth;

use App\Auth\OidcClientInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use NinjaPortal\Api\Contracts\Auth\TokenServiceInterface;
use NinjaPortal\Portal\Contracts\Services\UserServiceInterface;

class OidcLoginController extends Controller
{
    public function redirect(Request $request, OidcClientInterface $oidc): JsonResponse
    {
        $state = Str::random(40);
        $nonce = Str::random(40);

        $request->session()->put('oidc.state', $state);
        $request->session()->put('oidc.nonce', $nonce);

        return response()->json([
            'authorization_url' => $oidc->authorizationUrl($state, $nonce),
        ]);
    }

    public function callback(
        Request $request,
        OidcClientInterface $oidc,
        UserServiceInterface $users,
        TokenServiceInterface $tokens,
    ): JsonResponse {
        $request->validate([
            'code' => ['required', 'string'],
            'state' => ['required', 'string'],
        ]);

        $oidcUser = $oidc->userFromCallback(
            code: (string) $request->string('code'),
            state: (string) $request->string('state'),
            nonce: (string) $request->session()->pull('oidc.nonce')
        );

        $request->session()->forget('oidc.state');

        $developer = $users->findByEmail($oidcUser->email);

        if (! $developer) {
            $developer = $users->create([
                'email' => $oidcUser->email,
                'first_name' => $oidcUser->firstName,
                'last_name' => $oidcUser->lastName,
                'password' => Hash::make(Str::random(48)),
                'custom_attributes' => [
                    'oidc_provider_id' => $oidcUser->providerId,
                ],
            ]);
        }

        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Logged in.',
            'data' => $tokens->issue($developer, 'consumer'),
            'meta' => null,
        ]);
    }
}
```

Register the routes in your application:

```php
use App\Http\Controllers\Api\Auth\OidcLoginController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1/auth/oidc')->group(function () {
    Route::get('/redirect', [OidcLoginController::class, 'redirect']);
    Route::post('/callback', [OidcLoginController::class, 'callback']);
});
```

### 3. Admin OIDC

For admin SSO, use the same structure but resolve admins instead of consumers.

Use:

```php
NinjaPortal\Portal\Contracts\Services\AdminServiceInterface
```

Then issue tokens with the admin context:

```php
$tokens->issue($admin, 'admin');
```

Admin OIDC should usually require one of these controls:

- Only allow pre-created admin accounts.
- Restrict by identity provider group claim.
- Restrict by verified email domain.
- Sync roles after login from provider claims.
- Keep `PORTAL_API_RBAC_ENABLED=true`.

### 4. When To Replace `AuthFlowInterface`

The dedicated controller approach is best when OIDC is an additional login method.

Replace `AuthFlowInterface` when OIDC should become the default behavior behind the shipped `/auth/login` endpoint.

```php
<?php

namespace App\Providers;

use App\Auth\OidcAuthFlow;
use Illuminate\Support\ServiceProvider;
use NinjaPortal\Api\Contracts\Auth\AuthFlowInterface;

class AuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AuthFlowInterface::class, OidcAuthFlow::class);
    }
}
```

In that case, your custom `OidcAuthFlow` can still reuse `TokenServiceInterface` for `issue()`, `refresh()`, and `logout()` so refresh tokens, events, and response contracts remain consistent with the rest of Portal API.
