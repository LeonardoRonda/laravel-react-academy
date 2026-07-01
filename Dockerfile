# === ETAPA 1: COMPILAR FRONTEND (REACT/VITE) ===
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# === ETAPA 2: SERVIDOR PRODUCCIÓN (PHP/APACHE) ===
FROM php:8.2-apache

# Instalar dependencias del sistema mínimas para PostgreSQL y Laravel
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql bcmath zip \
    && rm -rf /var/lib/apt/lists/*

# Activar módulo de reescritura de Apache
RUN a2enmod rewrite

# Configurar la raíz de Apache hacia la carpeta public de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Configurar directorio de trabajo
WORKDIR /var/www/html
COPY . .

# Copiar los archivos de React YA COMPILADOS desde la Etapa 1
COPY --from=frontend-builder /app/public/build ./public/build

# Instalar dependencias de Composer de forma segura
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Permisos correctos para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

# Ejecutar migraciones automáticamente en Supabase y encender Apache
CMD php artisan migrate --force && apache2-foreground