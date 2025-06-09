# Stage 1: Build Stage
FROM node:20-slim AS build

# Set working directory inside the container
WORKDIR /app

# Define build arguments with default values
ARG VITE_BACKEND_URL="https://st-poc-api.up.railway.app"
ARG NODE_ENV=production
ARG VITE_NODE_ENV=production

# Set environment variables for build
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV NODE_ENV=$NODE_ENV
ENV VITE_NODE_ENV=$VITE_NODE_ENV

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY .npmrc .npmrc

# Copy the entire monorepo structure
COPY . .

# Install dependencies using pnpm
# RUN rm -rf node_modules pnpm-lock.yaml && pnpm install --recursive

# RUN pnpm run build

# Build the React app using Vite
# RUN cd apps/web && rm -rf node_modules pnpm-lock.yaml && pnpm install --recursive && pnpm run build

# Stage 2: Production Stage
FROM nginx:alpine AS production

# Copy the build output from the build stage
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY /configs/nginx/nginx.frontend.conf /etc/nginx/conf.d/default.conf

# Expose the necessary port
EXPOSE 80

# Start nginx server to serve the static files
CMD ["nginx", "-g", "daemon off;"]