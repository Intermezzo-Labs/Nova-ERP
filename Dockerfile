# Stage 1: Build the application
FROM node:23.3.0-slim AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies, including devDependencies
RUN npm ci

# Copy the application code
COPY . .

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY

ENV PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL}
ENV PUBLIC_SUPABASE_ANON_KEY=${PUBLIC_SUPABASE_ANON_KEY}

# Build the application
RUN npm run build

# Stage 2: Prepare the production image
FROM node:23.3.0-slim

WORKDIR /app

# Copy production dependencies from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built application from builder
COPY --from=builder /app/build ./build

# Add non-root user
RUN addgroup --system nodejs && adduser --system --ingroup nodejs --no-create-home nodejs
USER nodejs

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "build"]
