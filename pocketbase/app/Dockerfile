# Development
FROM node:19-alpine as dev

WORKDIR /app
COPY package.json /app/package.json

RUN npm install -g pnpm
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]

# Build
FROM node:19-alpine as build
WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# Production
FROM node:19-alpine as prod
WORKDIR /app
COPY --from=build /app/build /app/build
COPY src /app/src
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install --prod

CMD node build
