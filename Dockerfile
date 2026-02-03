FROM ubuntu:22.04

RUN apt-get update && apt-get install -y apache2 && apt-get clean
COPY Taldea4_Erronkaa /var/www/html/
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
