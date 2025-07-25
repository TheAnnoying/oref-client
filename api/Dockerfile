FROM oven/bun:latest

COPY tsconfig.json ./
COPY package.json ./
COPY bun.lock ./
COPY index.ts ./

RUN bun install
CMD ["bun", "run", "index.ts"]