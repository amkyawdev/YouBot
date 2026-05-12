#!/bin/bash
# Install AI Models Script

set -e

MODELS_DIR="./app/models"
GGUF_DIR="$MODELS_DIR/gguf"

echo "🤖 Installing AI Models..."
echo "========================"

# Create directories
mkdir -p "$GGUF_DIR"
mkdir -p "$MODELS_DIR/onnx"
mkdir -p "$MODELS_DIR/transformers"

echo ""
echo "📁 Model directories created:"
echo "  - $GGUF_DIR"
echo "  - $MODELS_DIR/onnx"
echo "  - $MODELS_DIR/transformers"

echo ""
echo "📥 To download models:"
echo ""
echo "  # Llama 3 (GGUF) -"
echo "  cd $GGUF_DIR"
echo "  curl -L -o llama3.gguf https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/..."
echo ""
echo "  # Mistral (GGUF)"
echo "  cd $GGUF_DIR"
echo "  curl -L -o mistral.gguf https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/..."
echo ""
echo "  # Phi-3 (ONNX)"
echo "  cd $MODELS_DIR/onnx"
echo "  curl -L -o phi3.onnx https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx/resolve/main/..."
echo ""
echo "✅ Place your .gguf or .onnx files in the model directories."
echo "   The app will auto-detect them on startup."