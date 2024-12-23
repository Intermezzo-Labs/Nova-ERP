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

# Stop running containers
echo "🛑 Stopping running containers..."
docker-compose down

# Clean up unused resources
echo "🧹 Cleaning up unused resources..."
docker system prune -f

# Rebuild and start containers
echo "🏗️ Rebuilding and starting containers..."
docker-compose build --no-cache
docker-compose up -d

# Verify deployment
echo "✅ Verifying deployment..."
docker-compose ps

echo "🎉 Deployment completed!"