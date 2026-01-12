FROM node:22-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files (respecting .dockerignore)
COPY . .

# Default command (will be overridden in docker-compose)
CMD ["npm", "run", "start:all"]

