# Development
FROM node:19-alpine as dev

WORKDIR /app
COPY package.json /app/package.json

# pnpm
RUN npm install -g pnpm
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]

# Build
FROM node:19-alpine as build
WORKDIR /app
COPY --from=dev /app /app
COPY .env.prod /app/.env

RUN npm install -g pnpm
RUN pnpm build

# Production
FROM node:19-alpine as prod
WORKDIR /app
COPY --from=build /app/build /app/build
COPY src /app/src
COPY .env.prod /app/.env
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install --prod

CMD node build
