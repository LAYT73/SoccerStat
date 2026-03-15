# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

FROM base AS dev

COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--host", "0.0.0.0"]

FROM base AS build

ARG VITE_FOOTBALL_DATA_API_URL=https://soccerstat-proxy.nsshipilov.workers.dev/api
ARG VITE_APP_BASE_PATH=/

ENV VITE_FOOTBALL_DATA_API_URL=${VITE_FOOTBALL_DATA_API_URL}
ENV VITE_APP_BASE_PATH=${VITE_APP_BASE_PATH}

COPY . .

RUN yarn build

FROM nginx:1.27-alpine AS production

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]