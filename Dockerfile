# Imagen base
FROM php:8.2-apache

# Instala extensiones necesarias
RUN docker-php-ext-install pdo pdo_mysql

# Habilita mod_rewrite
RUN a2enmod rewrite

# Agrega permisos para la raíz del servidor
RUN echo '<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' >> /etc/apache2/apache2.conf

# ✅ Copia el proyecto ANTES de intentar mover archivos
COPY . /var/www/html/

# ✅ Mueve archivos solo si existen
RUN mkdir -p /var/www/html/js /var/www/html/assets
RUN [ -f /var/www/html/jquery-3.7.0.min.js ] && mv /var/www/html/jquery-3.7.0.min.js /var/www/html/js/ || true
RUN [ -f /var/www/html/jquery.jclockNew.js ] && mv /var/www/html/jquery.jclockNew.js /var/www/html/js/ || true
RUN [ -f /var/www/html/backblue.gif ] && mv /var/www/html/backblue.gif /var/www/html/assets/ || true
RUN [ -f /var/www/html/fade.gif ] && mv /var/www/html/fade.gif /var/www/html/assets/ || true

# Ajusta permisos
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Exponer puerto
EXPOSE 80

# Iniciar Apache
CMD ["apache2-foreground"]
