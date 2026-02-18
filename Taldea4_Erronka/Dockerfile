# 1. PHP 8.2 eta Apache erabili oinarri gisa
FROM php:8.2-apache

# 2. Linux-eko liburutegiak eta Node.js instalatu (React-entzat)
RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 3. Cachea garbitu irudia arinagoa izateko
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 4. Laravel-ek behar dituen PHP estentsioak instalatu
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 5. Apache konfiguratu 'public' karpetara apuntatzeko
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# 6. mod_rewrite aktibatu (ezinbestekoa Laravelen rutentzat)
RUN a2enmod rewrite

# 7. Composer instalatu
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 8. Laneko direktorioa ezarri
WORKDIR /var/www/html

# 9. Proiektu osoa kopiatu
COPY . .

# 10. Backend menpekotasunak instalatu
RUN composer install --no-interaction --optimize-autoloader --no-dev

# 11. Frontend menpekotasunak instalatu eta React konpilatu
RUN npm install
RUN npm run build

# 12. Baimenak eman storage karpetari
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 13. 80 portua ireki
EXPOSE 80