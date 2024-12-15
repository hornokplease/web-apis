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

# sudo docker run -d --name hopin_webapi -p 4000:4000 -v/etc/ssl/certs/ap-south-1-bundle.pem:/etc/ssl/certs/ap-south-1-bundle.pem effdubois/hopin_webapi:v1.6