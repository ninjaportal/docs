# Translations (Portal `HasTranslations`)

Portal includes a custom translation system for Eloquent models via `NinjaPortal\Portal\Translatable\HasTranslations`.

It stores translated fields in a separate translation table/model and provides locale-aware accessors, fill behavior, and query scopes.

## How it works

A translatable model:

- uses `HasTranslations`
- defines `$translated_attributes`
- has a companion translation model/table
- stores translated rows keyed by `(parent_id, locale)`

Examples in Portal:

- `Category` + `CategoryTranslation`
- `ApiProduct` + `ApiProductTranslation`
- `MenuItem` + `MenuItemTranslation`

## What `HasTranslations` provides

### Attribute access

Translatable attributes are intercepted by the trait:

- `getAttribute()` reads from the translation row for the current locale
- `setAttribute()` writes to the translation row for the current locale

### Fill behavior (two supported formats)

The trait supports:

1. **Locale-keyed payloads** (recommended for create/update APIs)
2. **Flat attributes** for the current locale

#### Locale-keyed example

```php
$category->fill([
    'slug' => 'payments',
    'en' => ['name' => 'Payments', 'description' => 'Payments APIs'],
    'ar' => ['name' => 'المدفوعات', 'description' => 'واجهات المدفوعات'],
]);
```

#### Flat current-locale example

```php
$category->setLocale('en')->fill([
    'slug' => 'payments',
    'name' => 'Payments',
    'description' => 'Payments APIs',
]);
```

### Fallback locale support

If the requested locale translation does not exist and fallback is enabled, the trait can fall back to `ninjaportal.translatable.fallback_locale`.

### Translation saving lifecycle

On model save, `HasTranslations` persists dirty translation rows inside a DB transaction.

### Query scopes

Useful translation-aware scopes include:

- `withTranslation()`
- `translated()`
- `translatedIn($locale)`
- `notTranslatedIn($locale)`
- `whereTranslation($field, $value, $locale)`
- `whereTranslationLike(...)`
- `orWhereTranslation(...)`
- `orderByTranslation($field, $direction)`
- `listsTranslations($field)`

## Using translations in your own model (full example)

### 1. Create the main model table

```php
Schema::create('articles', function (Blueprint $table) {
    $table->id();
    $table->string('slug')->unique();
    $table->timestamps();
});
```

### 2. Create the translation table

```php
Schema::create('article_translations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('article_id')->constrained()->cascadeOnDelete();
    $table->string('locale')->index();
    $table->string('title');
    $table->longText('body')->nullable();
    $table->unique(['article_id', 'locale']);
    $table->timestamps();
});
```

### 3. Create the translation model

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleTranslation extends Model
{
    protected $fillable = ['article_id', 'locale', 'title', 'body'];
}
```

### 4. Create the main model using `HasTranslations`

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use NinjaPortal\Portal\Translatable\HasTranslations;

class Article extends Model
{
    use HasTranslations;

    protected $fillable = ['slug'];

    public array $translated_attributes = ['title', 'body'];
}
```

### 5. Use it

```php
$article = new Article();
$article->fill([
    'slug' => 'welcome',
    'en' => ['title' => 'Welcome', 'body' => 'Hello'],
    'ar' => ['title' => 'مرحبا', 'body' => 'أهلًا'],
]);
$article->save();

$title = $article->setLocale('ar')->title;
```

## Locale management

Portal registers a shared locale helper (`translatable.locales`) and `Locales` service.

This allows consistent locale selection across translated models without manually passing locale everywhere.

## Configuration keys you will use most

- `ninjaportal.translatable.locales`
- `ninjaportal.translatable.with_fallback`
- `ninjaportal.translatable.fallback_locale`
- `ninjaportal.translatable.translation_suffix`
- `ninjaportal.translatable.translation_model_namespace`

## Tips and caveats

- Prefer locale-keyed input arrays in APIs/forms to avoid ambiguity.
- Load translations when serializing large collections to reduce N+1 behavior.
- Keep translation table unique constraints on `(parent_id, locale)`.
