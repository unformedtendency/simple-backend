# Step 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Use ci for faster, more reliable builds
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Production Stage
FROM node:20-alpine
WORKDIR /app

# Set to production for optimization
ENV NODE_ENV=production

# Copy only production files and install only production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Security: Run as non-root user
USER node

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main"]