# Models

<!-- [[toc]] -->

## Introduction
Ninja Portal provides a set of Eloquent models for managing portal data. Laravel makes it easy to work with these models, and you may extend them as needed for your application.

## Quick Example: Using the User Model

Let's retrieve all users:

```php
<?php
use NinjaPortal\Portal\Models\User;

$users = User::all();
```

## Available Models
- [Admin](#admin)
- [ApiProduct](#apiproduct)
- [Audience](#audience)
- [Category](#category)
- [Menu](#menu)
- [MenuItem](#menuitem)
- [Setting](#setting)
- [SettingGroup](#settinggroup)
- [User](#user)

---

## Admin

The `Admin` model represents portal administrators and extends Laravel's `Authenticatable` class. It uses the `HasRoles` trait from Spatie Permission for role-based authorization.

| Field    | Type   | Translatable | Description                                                                 |
|----------|--------|--------------|-----------------------------------------------------------------------------|
| name     | string | No           | The administrator's full name.                                              |
| email    | string | No           | The administrator's email address.                                          |
| password | string | No           | The hashed password for admin authentication.                               |

---

## ApiProduct

The `ApiProduct` model represents an Apigee product. It relates to the `Audience` model and supports translations for fields like name and description.

| Field             | Type   | Translatable | Description                                                                 |
|-------------------|--------|--------------|-----------------------------------------------------------------------------|
| slug              | string | No           | Unique slug identifier for the API product.                                 |
| swagger_url       | string | No           | URL to the Swagger/OpenAPI definition for the product.                      |
| apigee_product_id | string | No           | The product's unique ID in the Apigee platform.                             |
| visibility        | string | No           | Product visibility: `public` or `private`.                                  |
| name              | string | Yes          | The display name of the API product (translatable).                         |
| description       | string | Yes          | A detailed, translatable description of the API product.                    |
| short_description | string | Yes          | A short, translatable summary of the API product.                           |
| thumbnail         | string | Yes          | URL to a thumbnail image for the product.                                   |

---

## Audience

The `Audience` model represents a target audience for specific products. It is linked to the `ApiProduct` model through a many-to-many relationship and to the `User` model, allowing control over the access of a product to a user. This linkage facilitates managing which users have access to which API products based on their associated audiences.

### Properties

| Field  | Type  | Translatable | Description                                                                 |
|--------|-------|--------------|-----------------------------------------------------------------------------|
| name   | string| No           | The audience's name.                                                        |

*For more details on how translations work, refer to the [Translation Documentation](/core/concepts/translation).*

---

## Category

The `Category` model is used to organize API products into different categories. It supports translations for various attributes and maintains relationships with the `ApiProduct` model.

### Properties

| Field             | Type   | Translatable | Description                                                                 |
|-------------------|--------|--------------|-----------------------------------------------------------------------------|
| slug              | string | No           | Unique slug identifier for the category.                                    |
| name              | Yes    | Yes          | The display name of the category (translatable).                            |
| description       | string | Yes          | A detailed, translatable description of the category.                       |
| short_description | string | Yes          | A short, translatable summary of the category.                              |
| thumbnail         | string | Yes          | URL to a thumbnail image for the category (translatable).                   |

*For more details on how translations work, refer to the [Translation Documentation](/core/concepts/translation).*

---

## Menu

The `Menu` model defines a navigational menu in the system. It has a relationship with the `MenuItem` model, allowing for dynamic management of menu items.

### Properties

| Field | Type  | Translatable | Description                                                                 |
|-------|-------|--------------|-----------------------------------------------------------------------------|
| slug  | string| No           | Unique slug identifier for the menu.                                        |

---

## MenuItem

The `MenuItem` model represents an item within a menu. It includes support for translations for various fields like title and URL.

### Properties

| Field   | Type    | Translatable | Description                                                                 |
|---------|---------|--------------|-----------------------------------------------------------------------------|
| slug    | string  | No           | Unique slug identifier for the menu item.                                   |
| menu_id | integer | No           | The ID of the parent menu.                                                  |
| title   | string  | Yes          | The display title of the menu item (translatable).                          |
| url     | string  | Yes          | The URL for the menu item (translatable).                                   |
| route   | string  | Yes          | The route name associated with the menu item (translatable).                |

*For more details on how translations work, refer to the [Translation Documentation](/core/concepts/translation).*

---

## SettingGroup

The `SettingGroup` model organizes settings into logical groups, making it easier to manage configurations across the system.

### Properties

| Field | Type   | Translatable | Description                                                                 |
|-------|--------|--------------|-----------------------------------------------------------------------------|
| name  | string | No           | The name of the setting group.                                              |

---

## Setting

The `Setting` model stores key-value pairs used for system configuration. Settings are grouped by a `SettingGroup` and can be dynamically retrieved or modified.

### Properties

| Field            | Type  | Translatable | Description                                                                 |
|------------------|-------|--------------|-----------------------------------------------------------------------------|
| key              | string| No           | The unique key for the setting.                                             |
| value            | mixed | No           | The value associated with the setting key.                                  |
| label            | string| No           | A human-readable label for the setting.                                     |
| setting_group_id | integer| No          | The ID of the group to which this setting belongs.                          |
| type             | string| No           | The data type of the setting (e.g., text, boolean, select, etc.).           |

---

## User

The `User` model represents a system user aka `developer`, extending the `Authenticatable` class for authentication. It also includes functionality for managing user statuses and relationships with audiences. By associating users with audiences, the system can control which API products a user has access to based on their audience memberships.

### Properties

| Field             | Type     | Translatable | Description                                                                 |
|-------------------|----------|--------------|-----------------------------------------------------------------------------|
| first_name        | string   | No           | The user's first name.                                                      |
| last_name         | string   | No           | The user's last name.                                                       |
| email             | string   | No           | The user's email address.                                                   |
| password          | string   | No           | The hashed password for user authentication.                                |
| status            | string   | No           | The user's status: `active`, `inactive`, or `pending`.                      |
| email_verified_at | datetime | No           | Timestamp of when the user's email was verified.                            |
| remember_token    | string   | No           | Token for remembering the user's session.                                   |
| custom_attributes | array    | No           | An array of custom attributes associated with the user.                     |
| apigee_id         | string   | No           | The user's unique ID in the Apigee platform.                                |

---

For more details on extending models, see [Extending Models](../development/extending-models.md).
