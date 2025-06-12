# Role-Based Access Control (RBAC)

<!-- [[toc]] -->

## Introduction
Ninja Portal uses a [role-based access control (RBAC)](https://www.ibm.com/think/topics/rbac) system to manage user permissions. Laravel makes it easy to define roles and assign permissions using the [Spatie Permission package](https://spatie.be/docs/laravel-permission/introduction).

## Quick Example: Assigning a Role

Let's assign the `admin` role to a user:

```php
<?php
use NinjaPortal\Portal\Models\User;

$user = User::find(1);
$user->assignRole('admin');
```

## Model Policies
All models in Ninja Portal include a policy class for authorization logic. Policies determine if a user may perform a specific action on a model.

## Configuration 
<!-- In the `ninjaportal.php` config file you can configure the prefix for the permission which is used to define the permissions in the portal model's -->
we follow the template <code v-pre>{{permission}}_{{model_name}}</code> to define the permissions for the model.
we are using a predefined permission prefixes for the models shipped with the portal, you can override these prefixes in the config file.

## Permission Prefixes
| Action      | Prefix       |
|-------------|--------------|
| View        | view         |
| View Any    | view_any     |
| Create      | create       |
| Update      | update       |
| Delete      | delete       |
| Restore     | restore      |
| ForceDelete | force_delete |

::: tip
You may override permission prefixes in your configuration file.
:::

::: tip
Ninja Portal offers enterprise-grade RBAC consulting, policy audits, and custom permission strategies for large organizations.
:::
