FROM php:8.2-apache

# 1. Dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    && docker-php-ext-install zip pdo pdo_mysql gd

# 2. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Configuración de Apache
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Copiar archivos
WORKDIR /var/www/html
COPY . .

# 5. Instalación de dependencias y configuración de Laravel
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# Si no tienes .env, creamos uno a partir del ejemplo para que no explote
RUN cp Taldea4_Erronka/.env.example Taldea4_Erronka/.env || true

# 6. Permisos y Key de Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache \
    && php Taldea4_Erronka/artisan key:generate --force

EXPOSE 80