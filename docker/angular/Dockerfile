FROM node:18-alpine AS build

WORKDIR /app

# Install deps first (better build caching)
COPY front_end_angular/package.json front_end_angular/package-lock.json* ./
RUN npm ci || npm install

# Copy source
COPY front_end_angular/ ./

# Build (outputs dist/valsoft-library/browser by default)
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/valsoft-library/browser/ ./
COPY docker/angular/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
