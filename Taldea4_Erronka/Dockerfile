FROM php:8.2-apache

# 1. Dependencias y Node.js
RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 2. Limpieza
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Extensiones PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 4. Configurar Apache Document Root
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# --- LERRO HAU DA GAKOA (Honek konpontzen du 404 errorea) ---
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# 5. Activar mod_rewrite
RUN a2enmod rewrite

# 6. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 7. Workdir
WORKDIR /var/www/html

# 8. Copiar proyecto
COPY . .

# 9. Instalar dependencias
RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN npm install
RUN npm run build

# 10. Permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80