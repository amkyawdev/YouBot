#!/bin/bash
# Clean Cache Script

set -e

echo "🧹 Cleaning cache..."

# Remove node_modules (optional)
if [ "$1" = "--full" ]; then
    echo "Removing node_modules..."
    find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
fi

# Clean build output
echo "Removing build outputs..."
rm -rf app/frontend/dist 2>/dev/null || true
rm -rf app/backend/dist 2>/dev/null || true

# Clean cache files
echo "Removing cache files..."
rm -rf app/storage/cache/* 2>/dev/null || true
rm -rf app/storage/memory/* 2>/dev/null || true
rm -rf app/uploads/temp/* 2>/dev/null || true

# Clean logs
echo "Removing logs..."
rm -f logs/*.log 2>/dev/null || true

echo "✅ Cache cleaned!"

# Show disk space saved
if command -v du &> /dev/null; then
    echo ""
    echo "💾 App directory size:"
    du -sh app/
fi