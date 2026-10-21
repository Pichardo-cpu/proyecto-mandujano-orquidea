# La interfaz Swagger se copia a la imagen del servidor, evitando dependencias CDN.
FROM swaggerapi/swagger-ui:v5.29.0 AS swagger
FROM node:22-alpine AS backend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=swagger /usr/share/nginx/html/ /app/swagger-ui/
RUN chown -R node:node /app
USER node
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
