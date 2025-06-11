# Extending Models in the NinjaPortal Package

When working with models in the NinjaPortal package, you may need to add custom fields or methods. This guide explains how to extend existing models to accommodate these customizations.

## Example: Adding a Custom Field to the `User` Model

If you want to add a custom field (e.g., `national_id`) to the `User` model provided by the portal, follow these steps:

### Step 1: Extend the `User` Model

Create a new model that extends the base `User` model provided by the portal and add your custom field to it.

```php
namespace App\Models;

use NinjaPortal\Portal\Models\User as BaseUser;

class User extends BaseUser
{
    protected $fillable = [
        // existing fields from the base model
        'national_id', // your new custom field
    ];
}
```

### Step 2: Update the User Table Migration

Next, modify the `users` table to include the new field. You can generate a migration file to add the `national_id` field:

```bash
php artisan make:migration add_national_id_to_users_table
```

After generating the migration, update it as follows:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('national_id')->nullable(); // add the custom field
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('national_id'); // remove the custom field when rolling back
        });
    }
};
```

### Step 3: Update the `ninjaportal.php` Configuration

To ensure the NinjaPortal package uses your extended `User` model, update the `config/ninja-portal.php` file:

```php
return [
    'models' => [
        'user' => App\Models.User::class, // point to your custom user model
    ]
];
```

## Extending Translated Models

If you need to add a translatable field to a model (e.g., `integration_guide` in the `ApiProduct` model), follow these steps:

### Step 1: Extend the `ApiProduct` Model

Extend the base `ApiProduct` model and specify your new translatable field (`integration_guide`):

```php
namespace App\Models;

use NinjaPortal\Portal\Models\ApiProduct as BaseApiProduct;

class ApiProduct extends BaseApiProduct
{
    // add your custom translatable field along with existing fields
    public $translated_attributes = ['integration_guide'];
}
```

### Step 2: Update the `ApiProductTranslation` Model

You also need to extend the `ApiProductTranslation` model to include the new translatable field in the `$fillable` property:

```php
namespace App\Models;

use NinjaPortal\Portal\Models\ApiProductTranslation as BaseApiProductTranslation;

class ApiProductTranslation extends BaseApiProductTranslation
{
    protected $fillable = [
        'integration_guide', // add the new translatable field here
    ];
}
```

### Step 3: Update the `api_product_translations` Table Migration

Generate a new migration to add the `integration_guide` field to the `api_product_translations` table:

```bash
php artisan make:migration add_integration_guide_to_api_product_translations_table
```

Update the migration file to include the new field:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up()
    {
        Schema::table('api_product_translations', function (Blueprint $table) {
            $table->text('integration_guide')->nullable(); // add the custom field
        });
    }

    public function down()
    {
        Schema::table('api_product_translations', function (Blueprint $table) {
            $table->dropColumn('integration_guide'); // remove the custom field when rolling back
        });
    }
};
```

---


::: tip 
Make sure to review the [Translation Documentation](/core/concepts/translation.md) for more details on how to use translations in the portal.
:::

---
This approach allows you to extend the models provided by the portal package and customize them with additional fields or methods as needed, ensuring seamless integration with the existing structure.
