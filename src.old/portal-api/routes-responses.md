# Routes & Response Contract

## Route layout

Portal API registers routes from:

- `routes/api/v1/health.php`
- `routes/api/v1/public.php`
- `routes/api/v1/consumer.php`
- `routes/api/v1/admin.php`

All are grouped under the configured base prefix (`portal-api.prefix`, default `api/v1`).

## Public routes

Primary examples:

- `GET /api-products`
- `GET /api-products/{apiProduct}`
- `GET /config`

## Consumer routes

Key capabilities:

- register / login / refresh / forgot/reset password / logout
- profile (`/me`) and password update
- self-service app and credential management under `/me/apps`

## Admin routes

Key capabilities:

- admin auth
- admin profile
- users + apps/credentials management
- admins management
- API products, categories, audiences
- menus + menu items
- settings
- RBAC roles + permissions
- activities (audit logs)

RBAC middleware composition is config-driven and can be disabled with `PORTAL_API_RBAC_ENABLED=false`.

## Response envelope (standardized)

Portal API uses response macros from `ApiResponseMixin`.

### Success response

```json
{
  "success": true,
  "status": 200,
  "message": "",
  "data": {"...": "..."},
  "meta": null
}
```

### Error response

```json
{
  "success": false,
  "status": 422,
  "message": "Validation failed.",
  "errors": {
    "field": ["error message"]
  },
  "meta": null
}
```

### Paginated response

Portal API flattens paginated resource collections to:

```json
{
  "success": true,
  "status": 200,
  "message": "",
  "data": [/* items */],
  "meta": {
    "pagination": {
      "total": 150,
      "count": 15,
      "per_page": 15,
      "current_page": 1,
      "total_pages": 10,
      "links": {
        "next": "...",
        "prev": null
      }
    }
  }
}
```

## API exception middleware behavior

`ApiExceptionMiddleware` converts common exceptions to consistent JSON responses:

- validation errors (`422`)
- authentication failures (`401`)
- authorization failures (`403`)
- not found (`404`)
- generic server errors (`500`)

It also passes through `HttpResponseException` responses (important for MFA `202` challenge responses).
