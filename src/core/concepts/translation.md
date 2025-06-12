# Ninja Portal Translations

<!-- [[toc]] -->

## Introduction
Ninja Portal provides a model-based translation system for Laravel, storing translations in the database using Eloquent ORM. This makes it easy to localize your portal content.

## Quick Example: Translating a Model

Let's add translations to a `Category` model:

1. Create a `category_translations` table:

```php
<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

Schema::create('category_translations', function (Blueprint $table) {
    $table->id();
    $table->string('locale')->index();
    // Add the columns that you want to translate ex: name, description, ...
    $table->string('name');
    $table->text('description')->nullable();
    
    $table->foreignId('category_id')->constrained()->cascadeOnDelete();
    $table->unique(['category_id', 'locale']);
    $table->timestamps();
});
```

2. Create a `CategoryTranslation` model:

```php
<?php
use Illuminate\Database\Eloquent\Model;

class CategoryTranslation extends Model
{
    protected $fillable = [
        'name',
        'description',
        'locale',
        'category_id',
    ];
}
```

3. Use the `HasTranslations` trait in your `Category` model:

```php
<?php
use NinjaPortal\Translatable\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasTranslations;

    protected $fillable = ['slug'];

    public array $translated_attributes = [
        'name',
        'description',
    ];
}
```

::: tip
You may translate any Eloquent model by following this pattern.
:::

## How it Works

After setting up your models and migration as shown above, the package will automatically handle the translation of your models. When you create or update a model, the translations will be saved in the `category_translations` table.

## Available Methods

When applying the `HasTranslations` trait to a model, you gain access to convenient query and utility methods for working with translations:

```php
Category::whereTranslation(string $field, $value, ?string $locale = null) // Find by translation value
Category::whereTranslationLike(string $field, $value, ?string $locale = null) // Find by partial match
Category::orWhereTranslation(string $field, $value, ?string $locale = null)
Category::orWhereTranslationLike(string $field, $value, ?string $locale = null)
Category::listsTranxslations(string $field) // List all translations for a field
Category::notTranslatedIn(?string $locale = null) // Find models missing a translation in a locale
```

::: tip
You may use these methods on any model using the HasTranslations trait to filter, search, or list translations efficiently.
:::

## Advanced Usage

- You may eager load translations using Eloquent relationships for performance.
- The translation system supports fallback locales as configured in your portal settings.
- You may add, update, or remove translations dynamically via Eloquent relationships.

::: warning
If you add new translatable fields to a model, remember to update both the migration and the `$translated_attributes` array in your model.
:::

For more details on extending or customizing translation behavior, see [Models](./models.md) and [Extending Models](../development/extending-models.md).
