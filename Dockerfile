# Stage 1: Build the application
FROM node:23.3.0-slim AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies, including devDependencies
RUN npm ci

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Prepare the production image
FROM node:23.3.0-slim

WORKDIR /app

# Copy production dependencies from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built application from builder
COPY --from=builder /app/.svelte-kit/output ./output

# Add non-root user
RUN addgroup --system nodejs && adduser --system --ingroup nodejs --no-create-home nodejs
USER nodejs

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "./output/server/index.js"]
