# Multi-stage Dockerfile for Trustable UI
# Optimized for production deployment on Coolify

# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies for build and preview)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy everything from builder (includes node_modules with vite for preview)
COPY --from=builder --chown=nodejs:nodejs /app ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application using vite preview
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
