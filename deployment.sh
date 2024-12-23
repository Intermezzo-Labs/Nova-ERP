#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Navigate to project directory
cd ~/Nova-ERP

# Backup .env file
if [ -f .env ]; then
    cp .env .env.backup
    echo "📁 Backed up .env file"
fi

# Pull latest changes
echo "📥 Pulling latest changes from git..."
git fetch origin
git reset --hard origin/main

# Restore .env file
if [ -f .env.backup ]; then
    cp .env.backup .env
    rm .env.backup
    echo "📁 Restored .env file"
fi

# Ensure correct permissions
chmod 600 .env

# Build new images without stopping containers
echo "🏗️ Building updated containers..."
docker-compose build

# Restart services one by one to avoid downtime
echo "🔄 Restarting services with zero downtime..."
docker-compose up --no-deps -d app
docker-compose up --no-deps -d nginx

# Clean up unused resources (optional for production)
echo "🧹 Cleaning up unused resources..."
docker system prune -f --volumes

# Verify deployment
echo "✅ Verifying deployment..."
docker-compose ps

echo "🎉 Deployment completed!"
