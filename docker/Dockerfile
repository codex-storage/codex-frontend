# Variables
ARG BUILDER=node:18
ARG IMAGE=nginx:stable-alpine
ARG APP_USER=root
ARG APP_SRC=frontend
ARG APP_HOME=/frontend
ARG NGINX_TEMPLATE=docker/nginx.template

# Build
FROM ${BUILDER} AS builder

ARG APP_USER
ARG APP_SRC
ARG APP_HOME

WORKDIR ${APP_HOME}
COPY --chown=${APP_USER}:${APP_USER} ${APP_SRC} .

RUN yarn install
RUN yarn build --production


# Create
FROM ${IMAGE}

ARG APP_USER
ARG APP_HOME
ARG NGINX_TEMPLATE

COPY --from=builder ${APP_HOME}/build /usr/share/nginx/html
COPY ${NGINX_TEMPLATE} /etc/nginx/nginx.template

ENTRYPOINT ["nginx", "-g", "daemon off;"]
