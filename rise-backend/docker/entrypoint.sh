#!/bin/sh

# Exit on any error
set -e

echo "Starting Laravel application setup..."

# Wait for database to be ready (if using external database)
if [ "$DB_CONNECTION" != "sqlite" ]; then
    echo "Waiting for database connection..."
    until php artisan migrate:status 2>/dev/null; do
        echo "Database not ready, waiting..."
        sleep 2
    done
fi

# Generate application key if not set
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Create SQLite database if using SQLite
if [ "$DB_CONNECTION" = "sqlite" ]; then
    echo "Setting up SQLite database..."
    touch /var/www/html/database/database.sqlite
    chmod 664 /var/www/html/database/database.sqlite
    chown www-data:www-data /var/www/html/database/database.sqlite
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Clear and cache configuration for production
echo "Optimizing Laravel for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create symbolic link for storage
echo "Creating storage symbolic link..."
php artisan storage:link || true

# Set proper permissions
echo "Setting proper permissions..."
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache

echo "Laravel application setup completed!"

# Execute the main command
exec "$@"