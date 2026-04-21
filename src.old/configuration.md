# Configuration Overview

NinjaPortal configuration is split across the host Laravel app and package config files.

## Configuration layers

1. **Laravel app config + `.env`** (host runtime)
2. **Portal package config** (`config/ninjaportal.php`)
3. **Portal API package config** (`config/portal-api.php`)
4. **Portal MFA package config** (`config/portal-mfa.php`)

## Configuration strategy

### Use env variables for deployment/runtime concerns

Examples:

- API prefixes
- auth guards/models
- token TTLs
- MFA enablement and policy
- mailer / queue behavior

### Use config files for structure and customization

Examples:

- model class overrides
- allowed public settings groups
- driver class mapping (MFA)
- translation locales/fallback behavior

## What to read next

- [Portal Package Configuration](/configuration/portal)
- [Portal API Configuration](/configuration/portal-api)
- [Portal MFA Configuration](/configuration/portal-mfa)
- [Environment Variable Reference](/configuration/env-reference)
