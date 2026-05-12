# GPU Dockerfile
FROM nvidia/cuda:12.4.1-runtime-ubuntu22.04

WORKDIR /app

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Copy package files
COPY app/frontend/package*.json ./app/frontend/
COPY app/backend/package*.json ./app/backend/
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p app/uploads/{temp,documents,images,models}
RUN mkdir -p app/storage/{chats,cache,memory,sessions}

# Expose ports
EXPOSE 3000 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-tty --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["npm", "run", "start"]