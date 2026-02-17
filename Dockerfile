# Usamos una imagen que ya tiene Apache + PHP instalado
FROM php:8.2-apache

# 1. Habilitamos el módulo de reescritura de Apache (necesario para Laravel)
RUN a2enmod rewrite

# 2. Cambiamos el "DocumentRoot" de Apache para que apunte a /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 3. Copiamos todo tu proyecto a la carpeta del servidor
COPY . /var/www/html

# 4. Ajustamos permisos para que Apache pueda leer los archivos
RUN chown -R www-data:www-data /var/www/html