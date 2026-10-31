FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY .well-known /usr/share/nginx/html/.well-known
COPY vendor /usr/share/nginx/html/vendor
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY llms.txt /usr/share/nginx/html/llms.txt
EXPOSE 80
