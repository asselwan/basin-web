FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY .well-known /usr/share/nginx/html/.well-known
EXPOSE 80
