FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY .well-known /usr/share/nginx/html/.well-known
COPY vendor /usr/share/nginx/html/vendor
EXPOSE 80
