# 1. Imagen con PHP y Apache
FROM php:8.2-apache

# 2. Instalar dependencias del sistema y Composer
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# 4. Configurar el DocumentRoot a /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Copiar el proyecto
WORKDIR /var/www/html
COPY . .

# 6. Instalar dependencias de PHP (Vendor)
# Usamos --ignore-platform-reqs para evitar problemas con extensiones faltantes en el build
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 7. Permisos críticos para Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache