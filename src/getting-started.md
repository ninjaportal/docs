# Getting Started

<!-- [[toc]] -->

## Introduction
This section guides you through installing and setting up Ninja Portal. Laravel makes it easy to get started, whether you want to use the full Kickstart project or install packages individually.

## Quick Example: Kickstart Project

Let's get started with the Kickstart project for a ready-to-use developer portal:

```shell
git clone https://github.com/ninjaportal/kickstart.git
cd kickstart
composer install
cp .env.example .env
php artisan key:generate
```

::: tip
The Kickstart project comes with the Shadow theme and all core features pre-installed.
:::

## Individual Package Installation

Alternatively, you may install the Ninja Portal package directly into your Laravel project:

```shell
composer require ninjaportal/portal
php artisan portal:install
```

## Prerequisites
- PHP 8.2 or higher
- Composer
- Laravel 11.x


