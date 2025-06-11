# Models
A list of all DB models used in the NinjaPortal.

## Available Models
1. [Admin](#admin)
2. [ApiProduct](#apiproduct)
3. [Audience](#audience)
4. [Category](#category)
5. [Menu](#menu)
6. [MenuItem](#menuitem)
7. [Setting](#setting)
8. [SettingGroup](#settinggroup)
9. [User](#user)

---

## Admin

### Description

The `Admin` model represents the administrator of the system and extends the `Authenticatable` class from Laravel for user authentication. It also uses the `HasRoles` trait from the Spatie Permission package, allowing role-based authorization for the admin users.

### Properties

| Field    | Type   | Translatable | Description                               |
|----------|--------|--------------|-------------------------------------------|
| name     | string | No           | The name of the admin.                    |
| email    | string | No           | The email address of the admin.           |
| password | string | No           | The password for admin authentication.    |

---

## ApiProduct

### Description

The `ApiProduct` model represents an API doc for an Apigee product. It includes a relationship with the `Audience` model, allowing control over which users have access to the product based on their audience memberships. The model also supports translations for various fields like name, description, and short description.

### Properties

| Field             | Type   | Translatable | Description                                                    |
|-------------------|--------|--------------|----------------------------------------------------------------|
| slug              | string | No           | A unique identifier for the API product.                       |
| swagger_url       | string | No           | The URL to the Swagger file of the product.                    |
| apigee_product_id | string | No           | The product ID in the Apigee platform.                         |
| visibility        | string | No           | Determines the visibility of the product (`public`/`private`). |
| name              | string | Yes          | The name of the API product.                                   |
| description       | string | Yes          | A detailed description of the API product.                     |
| short_description | string | Yes          | A short summary of the API product.                            |
| thumbnail         | string | Yes          | The thumbnail image URL for the product.                       |

*For more details on how translations work, refer to the [Translation Documentation](/core/concepts/translation).*


---

## Audience

### Description

The `Audience` model represents a target audience for specific products. It is linked to the `ApiProduct` model through a many-to-many relationship and to the `User` model, allowing control over the access of a product to a user. This linkage facilitates managing which users have access to which API products based on their associated audiences.

### Properties

| Field  | Type  | Translatable | Description                                               |
|--------|-------|--------------|-----------------------------------------------------------|
| name   | string| No           | The name of the audience.                                 |

*For more details on how translations work, refer to the [Translation Documentation](/core/concepts/translation).*


---

## Category

### Description

The `Category` model is used to organize API products into different categories. It supports translations for various attributes and maintains relationships with the `ApiProduct` model.

### Properties

| Field             | Type   | Translatable | Description                                       |
|-------------------|--------|--------------|---------------------------------------------------|
| slug              | string | No           | A unique identifier for the category.             |
| name              | string | Yes          | The name of the category.                         |
| description       | string | Yes          | A detailed description of the category.           |
| short_description | string | Yes          | A short summary of the category.                  |
| thumbnail         | string | Yes          | The thumbnail image URL for the category.          |

*For more details on how translations work, refer to the [Translation Documentation](/core/concepts/translation).*

---

## Menu

### Description

The `Menu` model defines a navigational menu in the system. It has a relationship with the `MenuItem` model, allowing for dynamic management of menu items.

### Properties

| Field | Type  | Translatable | Description                                     |
|-------|-------|--------------|-------------------------------------------------|
| slug  | string| No           | A unique identifier for the menu.               |

---

## MenuItem

### Description

The `MenuItem` model represents an item within a menu. It includes support for translations for various fields like title and URL.

### Properties

| Field   | Type    | Translatable | Description                                     |
|---------|---------|--------------|-------------------------------------------------|
| slug    | string  | No           | A unique identifier for the menu item.           |
| menu_id | integer | No           | The ID of the menu to which this item belongs.   |
| title   | string  | Yes          | The title of the menu item.                      |
| url     | string  | Yes          | The URL of the menu item.                        |
| route   | string  | Yes          | The route associated with the menu item.         |

*For more details on how translations work, refer to the [Translation Documentation](/core/concepts/translation).*

---

## SettingGroup

### Description

The `SettingGroup` model organizes settings into logical groups, making it easier to manage configurations across the system.

### Properties

| Field | Type   | Translatable | Description                       |
|-------|--------|--------------|-----------------------------------|
| name  | string | No           | The name of the setting group.     |

---

## Setting

### Description

The `Setting` model stores key-value pairs used for system configuration. Settings are grouped by a `SettingGroup` and can be dynamically retrieved or modified.

### Properties

| Field            | Type  | Translatable | Description                                        |
|------------------|-------|--------------|----------------------------------------------------|
| key              | string| No           | The unique key for the setting.                    |
| value            | mixed | No           | The value associated with the setting key.         |
| label            | string| No           | A human-readable label for the setting.            |
| setting_group_id | integer| No          | The group to which this setting belongs.           |
| type             | string| No           | The data type of the setting (e.g., text, boolean).|

---


## User

### Description

The `User` model represents a system user aka `developer`, extending the `Authenticatable` class for authentication. It also includes functionality for managing user statuses and relationships with audiences. By associating users with audiences, the system can control which API products a user has access to based on their audience memberships.

### Properties

| Field             | Type     | Translatable | Description                                                       |
|-------------------|----------|--------------|-------------------------------------------------------------------|
| first_name        | string   | No           | The first name of the user.                                       |
| last_name         | string   | No           | The last name of the user.                                        |
| email             | string   | No           | The email address of the user.                                   |
| password          | string   | No           | The password for user authentication.                            |
| status            | string   | No           | The status of the user (`active`, `inactive`, `pending`).         |
| email_verified_at | datetime | No           | Timestamp of when the user's email was verified.                 |
| remember_token    | string   | No           | Token for remembering the user's session.                        |
| custom_attributes | array    | No           | An array of custom attributes associated with the user.          |
| apigee_id         | string   | No           | The user's ID in the Apigee platform.                            |

---
