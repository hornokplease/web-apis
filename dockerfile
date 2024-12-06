FROM node:20.17.0
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY tsconfig.json ./
COPY src ./src
COPY .env ./.env
RUN pnpm build
CMD ["pnpm", "start"]