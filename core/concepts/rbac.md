# Role-Based Access Control (RBAC)
NinjaPortal uses a role-based access control (RBAC) system to manage user access to the portal. 
The RBAC system allows you to define roles and assign permissions to these roles. 
Users can then be assigned to roles, and they will inherit the permissions of the roles they are assigned to.

Underline we are using [Spatie's Laravel Permission](https://spatie.be/docs/laravel-permission/v5/introduction) package to manage the RBAC system in the portal.

## Model Policies 
All models in the NinjaPortal are shipped with a policy class that defines the authorization logic for the model.
The policy class is used to define the authorization logic for the model, and it is used to check if a user has permission to perform a specific action on the model.

## Configuration 
In the `ninjaportal.php` config file you can configure the prefix for the permission which is used to define the permissions in the portal model's
we follow the template `{{permission}}_{{model_name}}` to define the permissions for the model.
we are using a predefined permission prefixes for the models shipped with the portal, you can override these prefixes in the config file.

## Permission Prefixes
- View: `view`
- ViewAny: `view_any`
- Create: `create`
- Update: `update`
- Delete: `delete`
- Restore: `restore`
- ForceDelete: `force_delete`
