FROM httpd:2.4-alpine

# 1. Limpiamos la carpeta de Apache
RUN rm -rf /usr/local/apache2/htdocs/*

# 2. Copiamos SOLO el contenido de la carpeta public al servidor
# Nota: La ruta debe ser la carpeta donde tienes el index.html real
COPY ./Taldea4_Erronka/public/ /usr/local/apache2/htdocs/

EXPOSE 80