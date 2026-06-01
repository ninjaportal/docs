# How To Use

The Portal API package exposes the core portal domain through REST endpoints.

Use these endpoints when you want a ready-made API contract for admin panels, developer portals, or external clients. If you need a different API contract, you can still build custom controllers directly on top of the core `portal` services.

## Base URL

By default, all routes are registered under:

```text
/api/v1
```

Admin routes are nested under:

```text
/api/v1/admin
```

Change these with:

```dotenv
PORTAL_API_PREFIX=api/v1
PORTAL_API_ADMIN_PREFIX=admin
```

## Endpoint Areas

| Area | Examples |
| --- | --- |
| Health | `GET /api/v1/health` |
| Public catalog | `GET /api/v1/api-products`, `GET /api/v1/api-products/{id}` |
| Public config | `GET /api/v1/config` |
| Consumer auth | `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh` |
| Consumer profile | `GET /api/v1/me`, `PUT /api/v1/me`, `POST /api/v1/me/password` |
| Consumer apps | `GET /api/v1/me/apps`, `POST /api/v1/me/apps` |
| Admin auth | `POST /api/v1/admin/auth/login`, `POST /api/v1/admin/auth/refresh` |
| Admin dashboard | `GET /api/v1/admin/dashboard/stats` |
| Admin resources | Users, admins, products, categories, audiences, menus, settings, roles, permissions, activities. |

## Response Envelope

Successful responses use the same shape:

```json
{
  "success": true,
  "status": 200,
  "message": "",
  "data": {},
  "meta": null
}
```

Validation and error responses use:

```json
{
  "success": false,
  "status": 422,
  "message": "Validation failed.",
  "errors": {},
  "meta": null
}
```

Paginated endpoints keep records in the root `data` array and put pagination details in root `meta.pagination`.

## Listing Resources

List endpoints support the package request helpers:

| Query parameter | Purpose |
| --- | --- |
| `per_page` | Number of records per page. Capped by `portal-api.pagination.max_per_page`. |
| `order_by` | Column used for sorting. |
| `direction` | `ASC` or `DESC`. |
| `with` | Comma-separated relationships to eager load when supported. |
| `filters` | JSON encoded filter payload when supported by the endpoint. |

Example:

```bash
curl "http://localhost:8000/api/v1/admin/users?per_page=15&order_by=id&direction=DESC" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
```

## API Documentation

Portal API documentation is generated with Scribe.

Generate it with:

```bash
php artisan scribe:generate
```

When Scribe's Laravel route is enabled, open:

```text
http://localhost:8000/docs
```

For staging or production, use the same path on that environment:

```text
https://staging.example.com/docs
https://api.example.com/docs
```

Scribe also generates OpenAPI and Postman artifacts, depending on your Scribe configuration.

## Using The Docs With Authentication

Scribe is configured to use the `Authorization` header:

```http
Authorization: Bearer {YOUR_AUTH_KEY}
```

To try protected endpoints from the docs:

1. Login through the admin or consumer login endpoint.
2. Copy the returned `access_token`.
3. Use it as `Bearer {access_token}` in Scribe's auth field.

## When To Extend Instead

Use the shipped Portal API endpoints when the default contract works for your clients.

Build custom controllers when you need:

- Different response shapes.
- Tenant-specific routing.
- Extra approval states.
- A custom auth flow.
- A different frontend/mobile contract.

Both approaches can share the same `portal` services and events.
