# Extending Models

Portal encourages you to subclass its models instead of editing vendor files. Typical workflow:

1. **Create your subclass** in `App\Models`.
2. **Add migrations** for new columns.
3. **Update translation models** if you add translatable attributes.
4. **Point `config/ninjaportal.php`** to your subclass.

## Example: Adding `national_id` to Users

```php
namespace App\Models;

use NinjaPortal\Portal\Models\User as BaseUser;

class User extends BaseUser
{
    protected $fillable = [
        // inherit parent fields...
        'national_id',
    ];
}
```

Migration:

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('national_id')->nullable();
});
```

Config:

```php
// config/ninjaportal.php
'models' => [
    'User' => App\Models\User::class,
],
```

## Example: Translatable Field on ApiProduct

1. Extend `ApiProduct` and append to `$translated_attributes`.
2. Extend `ApiProductTranslation` with the new `$fillable` entry.
3. Add the column to `api_product_translations`.

```php
class ApiProduct extends BaseApiProduct
{
    public array $translated_attributes = [
        ...parent::$translated_attributes,
        'integration_guide',
    ];
}
```

## Observer Hooks

If you need lifecycle hooks, register observers on your subclass or use service events. Example: auto-slug categories:

```php
Category::creating(fn ($category) => $category->slug ??= Str::slug($category->name));
```

## Testing

Whenever you override a model, add tests to ensure repositories/services still behave as expected. Because services resolve models via repositories, your overrides propagate automatically once the config mapping is updated.
