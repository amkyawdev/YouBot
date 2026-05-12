# You Bot AI

Your Personal Offline AI System

## Features

- **Local AI Runtime** - Run AI models directly on your device
- **Offline-first PWA** - Works without internet connection
- **Multiple Model Support** - GGUF, ONNX, Transformers formats
- **Docker Deployment** - Easy containerized setup
- **Modern UI** - Dark theme with purple neon accents

## Tech Stack

| Component | Technology |
|-----------|-------------|
| Frontend | HTML + CSS + JS / Vite |
| Backend | Node.js + Express |
| AI Runtime | llama.cpp / Ollama / Transformers.js |
| Local DB | SQLite |
| Vector DB | LanceDB / Chroma |
| PWA | Service Worker |
| Container | Docker |

## Quick Start

```bash
# Install dependencies
npm install

# Start frontend (development)
npm run dev:frontend

# Start backend (development)
npm run dev:backend

# Run both
npm run dev
```

## Docker

```bash
# CPU version
docker compose -f docker/compose/docker-compose.cpu.yml up

# GPU version
docker compose -f docker/compose/docker-compose.gpu.yml up
```

## Project Structure

```
you-bot-ai/
├── app/
│   ├── frontend/     # Vite + PWA frontend
│   ├── backend/     # Node.js API server
│   ├── models/      # AI models storage
│   ├── uploads/     # User uploads
│   └── storage/     # App data storage
├── docker/          # Docker configs
├── scripts/         # Utility scripts
└── docs/            # Documentation
```

## Supported Models

- Llama (GGUF)
- Mistral (GGUF)
- Gemma (GGUF)
- DeepSeek (GGUF)
- Qwen (GGUF)
- Phi (ONNX)
- Custom Models (Transformers)

## License

MIT