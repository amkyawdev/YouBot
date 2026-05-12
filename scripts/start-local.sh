#!/bin/bash
# Start Local Development Script

set -e

echo "🚀 Starting You Bot AI..."
echo "======================"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js first."
    exit 1
fi

# Check for dependencies
echo "📥 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "app/frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd app/frontend && npm install && cd ..
fi

if [ ! -d "app/backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd app/backend && npm install && cd ..
fi

# Create directories
echo "📁 Creating directories..."
mkdir -p app/uploads/{temp,documents,images,models}
mkdir -p app/storage/{chats,cache,memory,sessions}
mkdir -p app/models/{gguf,onnx,transformers,embeddings,vision}

# Print info
echo ""
echo "🎉 Ready!"
echo ""
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
echo "   API Health: http://localhost:3000/api/health"
echo ""
echo "   Press Ctrl+C to stop"
echo ""

# Start both servers using concurrently
if command -v npx &> /dev/null; then
    npx concurrently \
        "npm run dev:frontend" \
        "npm run dev:backend"
else
    # Fallback: start backend in background
    echo "(concurrently not available, starting backend only)"
    cd app/backend && npm run dev
fi