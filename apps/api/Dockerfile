FROM oven/bun:1.2.12 AS build

# ติดตั้ง openssl, curl และ node (เพื่อให้ npm ใช้งานได้)
RUN apt-get update -y && apt-get install -y openssl curl ca-certificates gnupg

# ติดตั้ง node + npm ด้วย NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# ARG สำหรับ ENV
ARG DATABASE_URL=postgresql://postgres:KdsuRYMxSTVuTZjPAiEDxQDVGoILuEXz@shortline.proxy.rlwy.net:14046/railway
ARG DATABASE_PUBLIC_URL=postgresql://postgres:KdsuRYMxSTVuTZjPAiEDxQDVGoILuEXz@shortline.proxy.rlwy.net:14046/railway
ARG BACKEND_PORT=3333

WORKDIR /app

# Copy source
COPY . .

# ติดตั้ง deps ด้วย Bun
RUN bun install

# Inject Prisma env
RUN echo "DATABASE_URL=${DATABASE_PUBLIC_URL}" > .env

# ใช้ pnpm แค่ขั้นตอน prisma
RUN pnpm turbo db:migrate:deploy
RUN pnpm turbo db:generate

EXPOSE 3333

ENV DATABASE_URL=${DATABASE_URL}
ENV BACKEND_PORT=${BACKEND_PORT}
ENV NODE_ENV=production

CMD ["bun", "./apps/api/src/index.ts"]