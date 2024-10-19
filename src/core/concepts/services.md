# NinjaServices
We use service pattern to handle the portal operations on the portal entities,
the services are responsible for the business logic of the portal, and they are the only classes that can interact with the database.

We have a service for each entity in the portal, and each service has a set of methods that can be used to interact with the entity.
Each service is an implementation of the `ServiceInterface` interface and extends the `BaseService` class.

## BaseService methods 

### `all()`
This method returns all the entities of the service.

```php
use NinjaPortal\Portal\Services\ApiProductService;  
$apiProducts = (new ApiProductService())->all();
```

### `find($id)`
This method returns the entity with the given id.

```php
use NinjaPortal\Portal\Services\ApiProductService;
$apiProduct = (new ApiProductService())->find(1);
```

### `create(array $data)`
This method creates a new entity with the given data.
```$data``` is an associative array that contains the data of the entity.
```php
use NinjaPortal\Portal\Services\ApiProductService;
$apiProduct = (new ApiProductService())->create([$data]);
```

### `update(int|Model $id, array $data)`
This method updates the entity with the given id with the given data.
```$data``` is an associative array that contains the data of the entity.
```php
use NinjaPortal\Portal\Services\ApiProductService;
$apiProduct = (new ApiProductService())->update(1, [$data]);
```

### `delete(int $id)`
This method deletes the entity with the given id.
```php
use NinjaPortal\Portal\Services\ApiProductService;
(new ApiProductService())->delete(1);
```


::: tip
Check the portal API reference to see the available services and their methods.
:::
