# Configuration

This page gives you the configuration-first view of NinjaPortal as a solution, centered on the two core packages:

- `ninjaportal/portal`
- `ninjaportal/portal-api`

## Installation order (recommended)

Install the packages in this order:

```bash
composer require ninjaportal/portal
composer require ninjaportal/portal-api
```

Optional authentication extension packages (such as `ninjaportal/portal-mfa`) can be installed later.

## Core configuration files

After publishing configs (optional but recommended), the key files are:

- `config/ninjaportal.php` (Portal core)
- `config/portal-api.php` (Portal API)
- `config/laraapigee.php` (LaraApigee, used by Apigee-backed Portal operations)

## Configuration checklist (solution level)

## 1. Portal core (`ninjaportal/portal`)

Review:

- `apigee_platform` (`edge` / `apigeex`)
- `models.*` (model overrides)
- `translatable.*` (locales + fallback behavior)
- `settings.cache.*`

See full reference:

- [Portal Config Reference](/portal/config-reference)

## 2. Portal API (`ninjaportal/portal-api`)

Review:

- route prefixes (`prefix`, `admin_prefix`)
- auth models/guards (`auth.*`)
- token settings (`tokens.*`)
- pagination (`pagination.*`)
- RBAC route permissions (`rbac.*`)
- policy authorization toggle (`authorization.use_policies`)
- public settings exposure allowlist (`public_settings.*`)

See full reference:

- [Portal API Config Reference](/portal-api/config-reference)

## 3. Apigee authentication (`lordjoo/laraapigee`)

Portal relies on `lordjoo/laraapigee` for Apigee-backed operations.

You must configure LaraApigee authentication before using app/credential operations and sync flows.

Common setup tasks:

- choose platform/auth strategy (Edge vs Apigee X)
- set organization and endpoint values
- provide credentials
  - Edge typically uses username/password-style credentials
  - Apigee X typically uses service account credentials (`key_file`)

Common LaraApigee config keys used by the integration:

- `laraapigee.organization`
- `laraapigee.endpoint`
- `laraapigee.username`
- `laraapigee.password`
- `laraapigee.key_file`

> Dedicated LaraApigee documentation will be added later. For now, use the package README and config file as the source of truth for authentication details.

## 4. Environment and operations

At the project level, also verify:

- database connection
- queue driver / workers (for async jobs like activity logging)
- mailer (password reset, email-based auth extensions)
- application URL(s)

## Useful setup pages

- [Getting Started](/getting-started)
- [Installation / Backend Setup](/installation/backend)
- [Introduction / Apigee Backed Operations](/introduction/apigee-backed-operations)

