# 1. Imagen base con PHP 8.2 y Apache
FROM php:8.2-apache

# 2. Instalar dependencias del sistema, Node.js y herramientas necesarias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    curl \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

# 3. Copiar Composer desde la imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Habilitar el módulo rewrite de Apache
RUN a2enmod rewrite

# 5. Configurar el DocumentRoot para que apunte a la carpeta public
# Nota: Ahora la ruta es absoluta dentro del contenedor
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 6. ESTABLECER EL DIRECTORIO DE TRABAJO CORRECTO
# Aquí es donde debe estar el composer.json
WORKDIR /var/www/html/Taldea4_Erronka

# 7. Copiar los archivos del proyecto
# Copiamos todo el repo al contenedor
WORKDIR /var/www/html
COPY . .

# 8. Volver a la carpeta del proyecto para ejecutar instalaciones
WORKDIR /var/www/html/Taldea4_Erronka

# 9. Instalar dependencias de PHP (Composer)
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 10. Instalar dependencias de Node y compilar assets con Vite
RUN npm install && npm run build

# 11. Preparar la base de datos SQLite y generar la APP_KEY
RUN mkdir -p database && \
    touch database/database.sqlite && \
    [ -f .env.example ] && cp .env.example .env || echo "No .env.example found" && \
    php artisan key:generate --force

# 12. Permisos finales
RUN chown -R www-data:www-data /var/www/html/Taldea4_Erronka \
    && chmod -R 775 storage bootstrap/cache database