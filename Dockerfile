# FROM node:18-alpine
# WORKDIR /src
# COPY . .
# # RUN yarn install --production
# RUN npm install
# # CMD ["node", "src/index.js"]
# CMD npm start
# EXPOSE 3000

# ===========================

# FROM node:12-alpine AS base
FROM node:18-alpine AS base

# DEFAULT ARGS
ENV BUILD_FOLDER=/build
ENV TARGET_APP_FOLDER=/apps/my_app

# CHECK PROJECT ID IS SET
ARG PROJECT_ID
RUN test -n "$PROJECT_ID" || (echo "PROJECT_ID not set. Need to set PROJECT_ID to the GCP project ID you're deploying to" && false)
ENV PROJECT_ID=${PROJECT_ID}

###### BUILDER BASE PREPARING FILES ######

FROM base AS builder_base

WORKDIR /base

RUN apk update && \
    apk add curl bash && \
    apk --no-cache add g++ make libpng-dev && \
    curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# COPY YARN LOCK
COPY yarn.lock ./

# Copy source
COPY . ./

# Remove unused source
RUN bin/delete-unused-apps.sh ${TARGET_APP_FOLDER}

###### BUILDER ######

FROM builder_base AS build
WORKDIR ${BUILD_FOLDER}
COPY --from=builder_base /base ./

ENV PATH=${BUILD_FOLDER}/node_modules/.bin:$PATH
RUN yarn install --production

WORKDIR ${BUILD_FOLDER}/${TARGET_APP_FOLDER}

RUN yarn build:prod && \
    /usr/local/bin/node-prune


###### RUNNER ######

FROM base AS runner
ARG PROJECT_ID
ENV PROJECT_ID=${PROJECT_ID}
ENV PATH=/app/node_modules/.bin:$PATH
WORKDIR /app

COPY --from=build ${BUILD_FOLDER}/node_modules ./node_modules
COPY --from=build ${BUILD_FOLDER}${TARGET_APP_FOLDER}/.next ./.next
COPY --from=build ${BUILD_FOLDER}${TARGET_APP_FOLDER}/public ./public
COPY --from=build ${BUILD_FOLDER}${TARGET_APP_FOLDER}/package*.json ./

# Start the server
ENV PORT=8080
CMD yarn run start -p ${PORT}
