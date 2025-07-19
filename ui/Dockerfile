FROM node AS vite-app

WORKDIR /app
COPY . .

RUN npm i && npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/

# Corrección: Eliminar comillas y usar && en la misma línea
RUN rm -rf html && mkdir html

WORKDIR /

COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY --from=vite-app /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]