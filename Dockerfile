FROM php:8.2-apache

# 1. Instalar dependencias del sistema y Node.js 20
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 2. Configurar Apache
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# 3. Copiar el código del proyecto
WORKDIR /var/www/html
COPY . .

# 4. Instalar dependencias de PHP
WORKDIR /var/www/html/Taldea4_Erronka
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 5. Instalar Node y compilar con Vite
# Esto generará el manifest.json usando el nombre App.jsx corregido
RUN npm install
RUN npm run build

# 6. Preparar base de datos SQLite y permisos
RUN mkdir -p database && \
    touch database/database.sqlite && \
    [ -f .env.example ] && cp .env.example .env || echo "Ya existe .env" && \
    php artisan key:generate --force && \
    chown -R www-data:www-data /var/www/html/Taldea4_Erronka \
    && chmod -R 775 storage bootstrap/cache database

EXPOSE 80