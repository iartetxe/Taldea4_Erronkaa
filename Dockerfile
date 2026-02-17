# 1. Usamos PHP con Apache
FROM php:8.2-apache

# 2. Instalamos Node.js y herramientas necesarias (Arregla el error de Vite)
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Configuramos Apache para que mire a la carpeta 'public'
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Copiamos el código
WORKDIR /var/www/html
COPY . .

# 5. Instalamos dependencias de PHP (Arregla el error de autoload.php)
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 6. COMPILAMOS EL FRONTEND (Arregla el error de Vite manifest)
# Entramos a la carpeta, instalamos paquetes de React y creamos el build
RUN cd Taldea4_Erronka && npm install && npm run build

# 7. Preparamos la base de datos SQLite (Arregla el error de Database file not found)
RUN mkdir -p /var/www/html/Taldea4_Erronka/database && \
    touch /var/www/html/Taldea4_Erronka/database/database.sqlite && \
    cp /var/www/html/Taldea4_Erronka/.env.example /var/www/html/Taldea4_Erronka/.env && \
    php /var/www/html/Taldea4_Erronka/artisan key:generate --force

# 8. Permisos totales (Vital para que no de error 500 al escribir)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache /var/www/html/Taldea4_Erronka/database

EXPOSE 80