FROM nginx:1.27-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# No copiar el repositorio completo: evita exponer claves, código backend y .env.
COPY index.html admin.html frontend-404.html /usr/share/nginx/html/
COPY script.js src.js style.css firebase-client.js /usr/share/nginx/html/
COPY service-worker.js manifest.json /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/
COPY docker/estado-api.html /usr/share/nginx/html/estado-api.html
EXPOSE 80
