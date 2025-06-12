# Extending Models

<!-- [[toc]] -->

## Introduction

You may extend Ninja Portal's Eloquent models to add custom fields, methods, or relationships. Ninja Portal and Laravel make it easy to build on top of the provided models for your application's needs. This extensibility ensures you can adapt the portal to your business requirements without modifying the core package.

## Quick Example: Adding a Custom Field

Let's add a `national_id` field to the `User` model.

### 1. Extend the `User` Model

Create a new model that extends the base `User` model provided by the portal and add your custom field to it:

```php
<?php
namespace App\Models;

use NinjaPortal\Portal\Models\User as BaseUser;

class User extends BaseUser
{
    protected $fillable = [
        // ...existing fields...
        'national_id',
    ];
}
````

### 2. Update the `users` Table Migration

Generate a migration to add the new field:

```shell
php artisan make:migration add_national_id_to_users_table
```

Then edit the migration file:

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('national_id')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('national_id');
        });
    }
};
```

### 3. Update the `ninjaportal.php` Configuration

To ensure the NinjaPortal package uses your extended `User` model, update the `config/ninjaportal.php` file:

```php
return [
    'models' => [
        'User' => App\Models\User::class, // point to your custom user model
    ]
];
```

::: tip
You may override any model method as needed. Make sure your app references your custom `App\Models\User` (not the base model).
:::

## Extending Translated Models

To add a translatable field to a model (e.g., `integration_guide` in the `ApiProduct` model), follow these steps:

### 1. Extend the `ApiProduct` Model

Extend the base `ApiProduct` model and add your new translatable field:

```php
<?php
namespace App\Models;

use NinjaPortal\Portal\Models\ApiProduct as BaseApiProduct;

class ApiProduct extends BaseApiProduct
{
    // add your custom translatable field along with existing fields
    public $translated_attributes = ['integration_guide'];
}
```

### 2. Update the `ApiProductTranslation` Model

Extend the `ApiProductTranslation` model and include the new translatable field in `$fillable`:

```php
<?php
namespace App\Models;

use NinjaPortal\Portal\Models\ApiProductTranslation as BaseApiProductTranslation;

class ApiProductTranslation extends BaseApiProductTranslation
{
    protected $fillable = [
        'integration_guide',
    ];
}
```

### 3. Update the `api_product_translations` Table Migration

Generate a migration to add the new field:

```shell
php artisan make:migration add_integration_guide_to_api_product_translations_table
```

Edit the migration:

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('api_product_translations', function (Blueprint $table) {
            $table->text('integration_guide')->nullable();
        });
    }

    public function down()
    {
        Schema::table('api_product_translations', function (Blueprint $table) {
            $table->dropColumn('integration_guide');
        });
    }
};
```

---

::: tip
For more on using translations in the portal, see the [Translation Documentation](/core/concepts/translation.md) and [Models](/core/concepts/models.md).
:::

---

This approach allows you to extend the models provided by the portal package and customize them with additional fields, methods, or relationships as needed, ensuring seamless integration with the existing structure.

Once done, you should test your extended models to confirm the new fields and behavior work as expected.

::: tip
Ninja Portal provides enterprise guidance for model and service extension, including code reviews and best practices.
:::
