# 1. Imagen base
FROM php:8.2-apache

# 2. Instalación de dependencias de sistema y Node.js
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Configuración de Apache
RUN a2enmod rewrite
# Ajuste de ruta: apuntamos a la subcarpeta public de tu proyecto
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Preparar el código
WORKDIR /var/www/html
COPY . .

# 5. Instalar dependencias de PHP
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 6. COMPILAR VITE (Aquí es donde fallaba)
# Entramos a la subcarpeta, instalamos y generamos el manifest.json
RUN cd Taldea4_Erronka && npm install && npm run build

# 7. Base de datos SQLite y APP_KEY
RUN mkdir -p /var/www/html/Taldea4_Erronka/database && \
    touch /var/www/html/Taldea4_Erronka/database/database.sqlite && \
    cp /var/www/html/Taldea4_Erronka/.env.example /var/www/html/Taldea4_Erronka/.env && \
    php /var/www/html/Taldea4_Erronka/artisan key:generate --force

# 8. Permisos (Vital para que Apache lea el build de Vite)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache /var/www/html/Taldea4_Erronka/database /var/www/html/Taldea4_Erronka/public