# Development
FROM node:19-alpine as dev

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# Build
FROM node:19-alpine as build
WORKDIR /app
COPY . .

RUN npm install
RUN npm build

# Production
FROM node:19-alpine as prod
WORKDIR /app
COPY --from=build /app/build /app/build
COPY src /app/src
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --production

CMD node build
