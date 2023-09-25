## Laravel products api, php v8.2 required

#### Install Packages

```
composer install
```

#### Copy .env file

```
cp .env.example .env
```

#### Set Database Detail, Configure your local connection

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

#### Run database migrations

```
php artisan migrate
```

#### Link storage folder for file uploads

```
php artisan storage:link
```

#### Start Laravel Project

```
php artisan serve
```
