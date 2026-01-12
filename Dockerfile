FROM nginx:1.27.3-alpine

COPY dist /var/www/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 1235

CMD [ "nginx", "-g", "daemon off;" ]
