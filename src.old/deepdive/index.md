# Deepdive

This section is for implementation teams who want to go beyond the default behavior and build custom solutions on top of NinjaPortal.

Use the Deepdive guides when you need to:

- replace or decorate core services
- add custom domain logic while preserving package contracts
- customize authentication flow behavior
- understand the helper utilities and extension infrastructure used across the packages

## Guides in this section

- [Extending the Portal](/deepdive/extending-the-portal)
- [Add Custom Auth Flow](/deepdive/custom-auth-flow)
- [Utilities](/deepdive/utilities)
- [Cookbook](/cookbook/)

## Recommended approach

Before changing package behavior:

1. Identify the contract/event/hook you can extend
2. Prefer extension over forking package source
3. Keep event dispatch behavior intact
4. Add tests around the custom seam you replaced

