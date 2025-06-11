# Introduction
The Shadow Theme is Ninja Portal's modern, responsive frontend theme built with Laravel's Blade templating system. Laravel makes it easy to create beautiful, maintainable templates, and the Shadow Theme extends this with a comprehensive design system optimized for developer portals.
You'll find the theme provides everything needed for a professional developer portal: responsive layouts, interactive components, accessibility features, and extensive customization options. The theme is designed to look great out of the box while being easy to modify for your brand.

## Getting Started

### Theme Installation

The Shadow Theme comes pre-installed with the Ninja Portal kickstart template. If you need to install it separately:

```shell
composer require ninjaportal/shadow-theme
```

::: tip
comes with the kickstart template, so you may not need to install it separately.
:::

After installing, run the following command to run the theme's installation script, which sets up necessary configurations and assets:

```shell
php artisan ninja-shadow:install
```

### Building Assets

The theme uses Vite for modern frontend tooling:

```shell
# Development build with hot reloading
npm run dev

# Production build with optimization
npm run build

# Watch mode for development
npm run dev --watch
```

## Theme Structure

Understanding the theme structure helps you customize effectively:

### Directory Organization

```text
resources/
├── views/
│   ├── layouts/
│   │   ├── app.blade.php          # Main application layout
│   │   ├── guest.blade.php        # Guest/authentication layout
│   │   └── portal.blade.php       # Portal-specific layout
│   ├── components/
│   │   ├── navigation/            # Navigation components
│   │   ├── forms/                 # Form components
│   │   ├── cards/                 # Card layouts
│   │   └── ui/                    # Basic UI elements
│   ├── pages/
│   │   ├── home.blade.php         # Homepage
│   │   ├── products/              # API product pages
│   │   ├── applications/          # Application management
│   │   └── docs/                  # Documentation pages
│   └── partials/
│       ├── header.blade.php       # Site header
│       ├── footer.blade.php       # Site footer
│       └── sidebar.blade.php      # Documentation sidebar
```

### Configuration Structure

```php
// config/shadow.php
return [
    'branding' => [
        'logo' => '/images/logo.svg',
        'company_name' => 'Your Company',
        'tagline' => 'Build amazing applications with our APIs',
    ],
    
    'layout' => [
        'sidebar' => true,
        'breadcrumbs' => true,
        'search' => true,
    ],
    
    'features' => [
        'dark_mode' => true,
        'language_switcher' => false,
        'user_menu' => true,
    ],
];
```

## Customization

### Basic Branding

Laravel makes it easy to customize your portal's appearance through configuration:

```env
# Basic branding in .env
THEME_LOGO=/images/your-logo.svg
THEME_COMPANY_NAME="Your Company"
THEME_TAGLINE="Your API tagline"
THEME_PRIMARY_COLOR=#1E40AF
THEME_SECONDARY_COLOR=#475569
```

### Logo and Favicon

Replace the default branding assets:

```shell
# Add your assets to public directory
public/
├── images/
│   ├── logo.svg              # Main logo (SVG preferred)
│   ├── logo-dark.svg         # Dark mode variant
│   └── logo-small.svg        # Compact version for mobile
├── favicon.ico               # Browser favicon
└── apple-touch-icon.png      # iOS home screen icon
```

Update your configuration:

```php
// config/shadow.php
'branding' => [
    'logo' => '/images/logo.svg',
    'logo_dark' => '/images/logo-dark.svg',
    'logo_small' => '/images/logo-small.svg',
    'favicon' => '/favicon.ico',
    'apple_touch_icon' => '/apple-touch-icon.png',
],
```

### Color Scheme

Customize the theme colors through CSS custom properties:

```css
/* resources/css/custom.css */
:root {
    --color-primary: #1E40AF;
    --color-primary-hover: #1E3A8A;
    --color-secondary: #475569;
    --color-accent: #059669;
    --color-success: #10B981;
    --color-warning: #F59E0B;
    --color-error: #EF4444;
}

/* Dark mode variants */
@media (prefers-color-scheme: dark) {
    :root {
        --color-primary: #3B82F6;
        --color-primary-hover: #2563EB;
    }
}
```

### Custom Layouts

Create custom layouts for specific pages:

```php
<!-- resources/views/layouts/custom.blade.php -->
@extends('shadow::layouts.app')

@section('body')
<div class="custom-layout">
    @include('shadow::partials.header')
    
    <main class="main-content">
        @yield('content')
    </main>
    
    @include('shadow::partials.footer')
</div>
@endsection

@push('styles')
<link rel="stylesheet" href="{{ asset('css/custom-layout.css') }}">
@endpush
```

## Components

The Shadow Theme includes reusable Blade components for consistent UI:

### Navigation Components

**Main Navigation**
```php
<!-- Usage -->
<x-shadow::navigation.main :items="$menuItems" />

<!-- Component definition -->
@props(['items'])
<nav class="main-navigation">
    @foreach($items as $item)
        <x-shadow::navigation.item :item="$item" />
    @endforeach
</nav>
```

**Breadcrumbs**
```php
<x-shadow::navigation.breadcrumbs :items="[
    ['label' => 'Home', 'url' => route('home')],
    ['label' => 'API Products', 'url' => route('products.index')],
    ['label' => $product->name, 'current' => true],
]" />
```

### Card Components

**Product Card**
```php
<x-shadow::cards.product :product="$product">
    <x-slot:header>
        <h3>{{ $product->display_name }}</h3>
        <x-shadow::badges.environment :environment="$product->environment" />
    </x-slot:header>
    
    <p>{{ $product->description }}</p>
    
    <x-slot:actions>
        <x-shadow::buttons.primary href="{{ route('products.show', $product) }}">
            View Details
        </x-shadow::buttons.primary>
    </x-slot:actions>
</x-shadow::cards.product>
```

**Application Card**
```php
<x-shadow::cards.application :application="$application">
    @if($application->isApproved())
        <x-shadow::badges.success>Approved</x-shadow::badges.success>
    @else
        <x-shadow::badges.warning>Pending</x-shadow::badges.warning>
    @endif
</x-shadow::cards.application>
```

### Form Components

**Enhanced Form Inputs**
```php
<!-- API Key Display -->
<x-shadow::forms.api-key 
    :value="$key->masked_key"
    :reveal-url="route('keys.reveal', $key)"
    copyable
/>

<!-- Product Selector -->
<x-shadow::forms.product-selector 
    name="products[]"
    :products="$availableProducts"
    :selected="$selectedProducts"
    multiple
/>

<!-- Code Editor -->
<x-shadow::forms.code-editor
    name="request_body"
    language="json"
    :value="$defaultRequest"
    height="300"
/>
```

### UI Components

**Badges and Status Indicators**
```php
<x-shadow::badges.status :status="$application->status" />
<x-shadow::badges.environment environment="production" />
<x-shadow::badges.method method="POST" />
```

**Buttons and Actions**
```php
<x-shadow::buttons.primary :href="$url">Primary Action</x-shadow::buttons.primary>
<x-shadow::buttons.secondary @click="openModal">Secondary</x-shadow::buttons.secondary>
<x-shadow::buttons.danger wire:click="delete">Delete</x-shadow::buttons.danger>
```

**Loading States**
```php
<x-shadow::loading.spinner size="sm" />
<x-shadow::loading.skeleton lines="3" />
<x-shadow::loading.button>Processing...</x-shadow::loading.button>
```

## Layouts

### Main Application Layout

The main layout provides the foundation for all portal pages:

```php
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>@yield('title', config('app.name'))</title>
    
    @stack('meta')
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('styles')
</head>
<body class="antialiased">
    @include('shadow::partials.header')
    
    @hasSection('hero')
        <section class="hero">
            @yield('hero')
        </section>
    @endif
    
    <main class="main-content">
        @yield('content')
    </main>
    
    @include('shadow::partials.footer')
    
    @stack('scripts')
</body>
</html>
```

### Page-Specific Layouts

**Documentation Layout**
```php
@extends('shadow::layouts.app')

@section('content')
<div class="documentation-layout">
    <aside class="docs-sidebar">
        <x-shadow::navigation.docs :sections="$docSections" />
    </aside>
    
    <article class="docs-content">
        @yield('docs-content')
        
        <x-shadow::navigation.docs-pagination 
            :previous="$previousPage"
            :next="$nextPage"
        />
    </article>
    
    <aside class="docs-toc">
        <x-shadow::navigation.table-of-contents :headings="$headings" />
    </aside>
</div>
@endsection
```

**Dashboard Layout**
```php
@extends('shadow::layouts.app')

@section('content')
<div class="dashboard-layout">
    <aside class="dashboard-sidebar">
        <x-shadow::navigation.dashboard />
    </aside>
    
    <main class="dashboard-main">
        @if(session('message'))
            <x-shadow::alerts.success>{{ session('message') }}</x-shadow::alerts.success>
        @endif
        
        @yield('dashboard-content')
    </main>
</div>
@endsection
```

## Styling

### Tailwind CSS Integration

The Shadow Theme uses Tailwind CSS for utility-first styling:

```javascript
// tailwind.config.js
module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './vendor/ninjaportal/shadow-theme/resources/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    900: '#1e3a8a',
                },
                brand: {
                    light: '#f0f9ff',
                    DEFAULT: '#0ea5e9',
                    dark: '#0c4a6e',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
```

### Custom CSS Classes

Add your own utility classes and components:

```css
/* resources/css/custom.css */
@layer components {
    .btn-brand {
        @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand;
    }
    
    .card-elevated {
        @apply bg-white shadow-lg rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700;
    }
    
    .code-block {
        @apply bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto;
    }
}

@layer utilities {
    .text-shadow {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .gradient-brand {
        background: linear-gradient(135deg, theme('colors.brand.DEFAULT'), theme('colors.primary.500'));
    }
}
```

### Dark Mode Support

The theme includes comprehensive dark mode support:

```css
/* Dark mode styles are applied automatically */
.dark .card {
    @apply bg-gray-800 border-gray-700;
}

.dark .text-primary {
    @apply text-gray-100;
}

/* Custom dark mode overrides */
@media (prefers-color-scheme: dark) {
    :root {
        --shadow-bg: #1f2937;
        --shadow-text: #f9fafb;
        --shadow-border: #374151;
    }
}
```

## Frontend Assets

### JavaScript Components

The theme includes interactive JavaScript components:

```javascript
// resources/js/components/api-explorer.js
class ApiExplorer {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.setupTabs();
        this.setupCodeExamples();
        this.setupTryItOut();
    }
    
    setupTabs() {
        this.element.querySelectorAll('[data-tab]').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
    }
    
    setupTryItOut() {
        const tryButton = this.element.querySelector('[data-try-api]');
        if (tryButton) {
            tryButton.addEventListener('click', () => this.executeRequest());
        }
    }
    
    async executeRequest() {
        // API testing functionality
    }
}

// Auto-initialize components
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-component="api-explorer"]').forEach(el => {
        new ApiExplorer(el);
    });
});
```

### Vue.js Integration

For more complex interactions, you may use Vue.js components:

```javascript
// resources/js/components/ApplicationDashboard.vue
<template>
    <div class="application-dashboard">
        <div class="metrics-grid">
            <MetricCard 
                v-for="metric in metrics"
                :key="metric.name"
                :metric="metric"
            />
        </div>
        
        <div class="charts-section">
            <UsageChart :data="usageData" />
            <ErrorChart :data="errorData" />
        </div>
    </div>
</template>

<script>
import MetricCard from './MetricCard.vue';
import UsageChart from './charts/UsageChart.vue';
import ErrorChart from './charts/ErrorChart.vue';

export default {
    components: {
        MetricCard,
        UsageChart,
        ErrorChart,
    },
    
    data() {
        return {
            metrics: [],
            usageData: {},
            errorData: {},
        };
    },
    
    mounted() {
        this.loadMetrics();
    },
    
    methods: {
        async loadMetrics() {
            const response = await fetch('/api/dashboard/metrics');
            this.metrics = await response.json();
        },
    },
};
</script>
```

### Asset Optimization

Configure Vite for optimal performance:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['vue', 'axios'],
                    ui: ['@headlessui/vue', '@heroicons/vue'],
                },
            },
        },
    },
});
```

## Best Practices

### Performance Optimization

**Image Optimization**
```php
<!-- Use responsive images -->
<picture>
    <source srcset="{{ asset('images/hero-large.webp') }}" media="(min-width: 1024px)">
    <source srcset="{{ asset('images/hero-medium.webp') }}" media="(min-width: 640px)">
    <img src="{{ asset('images/hero-small.webp') }}" alt="Hero image" loading="lazy">
</picture>

<!-- Lazy loading for content images -->
<img src="{{ $image->url }}" alt="{{ $image->alt }}" loading="lazy" class="fade-in">
```

**CSS Optimization**
```css
/* Use critical CSS inlining for above-the-fold content */
@layer critical {
    .header, .hero, .main-nav {
        /* Critical styles here */
    }
}

/* Defer non-critical styles */
@layer deferred {
    .footer, .modal, .tooltip {
        /* Non-critical styles */
    }
}
```

### Accessibility

**Semantic HTML**
```php
<!-- Use proper heading hierarchy -->
<h1>API Documentation</h1>
<h2>Authentication</h2>
<h3>OAuth 2.0 Flow</h3>

<!-- Include ARIA labels -->
<button aria-label="Toggle dark mode" aria-pressed="{{ $darkMode ? 'true' : 'false' }}">
    <x-shadow::icons.moon class="hidden dark:block" />
    <x-shadow::icons.sun class="block dark:hidden" />
</button>

<!-- Use proper form labels -->
<label for="api-key" class="sr-only">API Key</label>
<input id="api-key" type="text" placeholder="Enter your API key">
```

**Keyboard Navigation**
```css
/* Visible focus indicators */
.focus-visible:focus {
    @apply outline-none ring-2 ring-brand ring-offset-2;
}

/* Skip navigation for screen readers */
.skip-nav {
    @apply absolute top-0 left-0 bg-brand text-white px-4 py-2 transform -translate-y-full focus:translate-y-0 transition-transform;
}
```

### Responsive Design

**Mobile-First Approach**
```css
/* Start with mobile styles */
.navigation {
    @apply flex flex-col;
}

/* Add desktop styles */
@screen md {
    .navigation {
        @apply flex-row;
    }
}

/* Use responsive utilities */
.hero-title {
    @apply text-2xl md:text-4xl lg:text-6xl;
}
```

**Touch-Friendly Interactions**
```css
/* Minimum touch target size */
.btn, .nav-link {
    @apply min-h-[44px] min-w-[44px];
}

/* Larger click areas for mobile */
@screen max-md {
    .mobile-nav-item {
        @apply py-4 px-6;
    }
}
```

### Code Organization

**Component Structure**
```php
<!-- Keep components focused and reusable -->
<x-shadow::cards.base class="product-card">
    <x-slot:image>
        <img src="{{ $product->image }}" alt="{{ $product->name }}">
    </x-slot:image>
    
    <x-slot:content>
        <h3>{{ $product->name }}</h3>
        <p>{{ $product->description }}</p>
    </x-slot:content>
    
    <x-slot:actions>
        {{ $slot }}
    </x-slot:actions>
</x-shadow::cards.base>
```

**Style Organization**
```css
/* Organize styles by component */
/* Base styles */
@import 'base/reset';
@import 'base/typography';

/* Components */
@import 'components/buttons';
@import 'components/cards';
@import 'components/navigation';

/* Pages */
@import 'pages/home';
@import 'pages/documentation';

/* Utilities */
@import 'utilities/animations';
@import 'utilities/helpers';
```

## Next Steps

Now that you understand the Shadow Theme, you may want to explore:

- **[Customization](customization.md)** - Advanced theme customization techniques
- **[Portal Module](portal-module.md)** - Understanding the data layer
- **[Frontend Assets](frontend-assets.md)** - Advanced JavaScript and CSS techniques
- **[Deployment](deployment.md)** - Optimizing themes for production

The Shadow Theme provides a solid foundation that grows with your needs. Don't worry about customizing everything immediately – Laravel and Blade make it easy to evolve your design over time.
