FROM node:25-alpine3.22 AS build

RUN apk add --no-cache git bash

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build:production


FROM nginx:1.27.3-alpine

COPY --from=build /app/dist /var/www/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 1235

CMD [ "nginx", "-g", "daemon off;" ]
