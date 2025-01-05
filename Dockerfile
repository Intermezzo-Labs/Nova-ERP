# Stage 1: Build the application
FROM node:23.3.0-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY
ARG PRIVATE_SUPABASE_API_KEY
ARG PRIVATE_SUPABASE_JWT_SECRET
ARG PRIVATE_SUPABASE_SERVICE_ROLE

ENV PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL}
ENV PUBLIC_SUPABASE_ANON_KEY=${PUBLIC_SUPABASE_ANON_KEY}
ENV PRIVATE_SUPABASE_API_KEY=${PRIVATE_SUPABASE_API_KEY}
ENV PRIVATE_SUPABASE_JWT_SECRET=${PRIVATE_SUPABASE_JWT_SECRET}
ENV PRIVATE_SUPABASE_SERVICE_ROLE=${PRIVATE_SUPABASE_SERVICE_ROLE}

RUN npm run build

# Stage 2: Prepare the production image
FROM node:23.3.0-slim

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

RUN addgroup --system nodejs && adduser --system --ingroup nodejs --no-create-home nodejs
USER nodejs

EXPOSE 3000

CMD ["node", "build"]