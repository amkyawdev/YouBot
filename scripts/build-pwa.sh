#!/bin/bash
# Build PWA Script

set -e

echo "📦 Building PWA..."

# Check for dependencies
if [ ! -d "app/frontend/node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    cd app/frontend
    npm install
    cd ../..
fi

# Build frontend
echo "🔨 Building frontend..."
cd app/frontend
npm run build

# Copy service worker
if [ -f "dist/sw.js" ]; then
    echo "📋 Service worker found"
else
    echo "⚠️  Note: Configure service worker in vite.config.js"
fi

echo ""
echo "✅ PWA build complete!"
echo ""
echo "📁 Output: app/frontend/dist/"
echo ""
echo "🚀 To serve:"
echo "  npx serve app/frontend/dist"