# Ninja Services

<!-- [[toc]] -->

## Introduction
Ninja Portal uses the [Service Pattern](https://en.wikipedia.org/wiki/Service_layer_pattern) to encapsulate business logic for portal entities. Services provide a convenient way to interact with your data and keep your controllers clean.

## Quick Example: Fetching All API Products

Let's retrieve all API products using the service:

```php
<?php
use NinjaPortal\Portal\Services\ApiProductService;

$apiProducts = (new ApiProductService())->all();
```

## BaseService Methods

### `all()`
Return all entities for the service.

### `find($id)`
Return the entity with the given ID.

### `create(array $data)`
Create a new entity with the provided data.

### `update(int|Model $id, array $data)`
Update the entity with the given ID and data.

### `delete(int $id)`
Delete the entity with the given ID.

::: tip
You may extend or override service methods as needed. See [Extending Services](../development/extending-services.md).
:::
