# Translation System

Portal ships a database-driven translation engine powered by the `HasTranslations` trait. It works for both core models (ApiProduct, Category, Package, MenuItem…) and any custom model in your app.

## 1. Table Structure

Create a translation table per model. Example for categories:

```php
Schema::create('category_translations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('category_id')->constrained()->cascadeOnDelete();
    $table->string('locale')->index();
    $table->string('name');
    $table->text('description')->nullable();
    $table->unique(['category_id', 'locale']);
    $table->timestamps();
});
```

## 2. Models

```php
class CategoryTranslation extends Model
{
    protected $fillable = ['name', 'description'];
}

class Category extends Model
{
    use HasTranslations;

    public array $translated_attributes = ['name', 'description'];
}
```

## 3. CRUD API

```php
$category = Category::create([
    'slug' => 'payments',
    'en' => ['name' => 'Payments', 'description' => 'Accept cards.'],
    'fr' => ['name' => 'Paiements', 'description' => 'Accepter des cartes.'],
]);

$category->name;                         // localized name
$category->translate('description', 'fr');
$category->setTranslation('name', 'ar', 'المدفوعات');
$category->save();
```

## 4. Query Helpers

- `whereTranslation('name', 'Payments', 'en')`
- `whereTranslationLike('description', '%cards%', 'en')`
- `notTranslatedIn('fr')`
- `listsTranslations('name')`

These helpers are available on any model using `HasTranslations`.

## 5. Outside Portal Models

You can reuse the trait in your own models (blog posts, marketing pages, etc.) exactly the same way. Just remember to:

1. Create the translation table.
2. Build a translation model.
3. Point `config/ninjaportal.php` to your custom model if you want portal services to use it.

## 6. Performance Tips

- Use eager loading (`with('translations')`) when listing lots of records.
- Configure `translation_autoload` in `config/ninjaportal.php` to automatically load translations when converting to arrays/JSON.
- Cache expensive translation-heavy queries (e.g., building the homepage) using Laravel cache.

The translation engine is central to delivering multilingual portals without duplicating controllers or views.
