# Getting Started
We have crafted a kickstart template for you to quickly get up and running with NinjaPortal.  
You can clone the kickstart template from our GitHub repository.

```bash
git clone https://github.com/ninjaportal/kickstart.git
```
once you have the kickstart template, run the following commands to install the dependencies and start the development server

```bash
cd kickstart
composer install
```
Then copy the `.env.example` file to `.env` and update the database configuration to match your local setup.
```bash
cp .env.example .env
```
Finally, run the following command to start the development server
```bash
php artisan serve
```

::: info
If you want to add NinjaPortal to your existing Laravel project, just install the ```ninjaportal/portal``` package via composer and follow the configuration steps in the documentation.
:::

he kickstart contains the basic setup of NinjaPortal, including the ```shadow-theme``` package, which is a simple and clean theme that you can use as a starting point for your portal,
also it's packed with a [Filament admin panel](https://filamentphp.com).


