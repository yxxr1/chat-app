# syntax=docker/dockerfile:1

FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
