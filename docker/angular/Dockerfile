FROM node:20-alpine AS build

WORKDIR /app

# Install deps first (better build caching)
COPY Technical/angular/urls/package.json Technical/angular/urls/package-lock.json ./
RUN npm ci

# Copy source
COPY Technical/angular/urls/ ./

# Build (outputs dist/urls/browser by default)
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/urls/browser/ ./
COPY docker/angular/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
