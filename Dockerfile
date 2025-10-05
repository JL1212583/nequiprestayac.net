# Usamos Nginx para servir archivos estáticos
FROM nginx:alpine

# Borramos el contenido default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos los archivos de tu proyecto a la carpeta pública de Nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]
