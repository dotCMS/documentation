# Install dependencies only when needed
FROM node:14-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


# Rebuild the source code only when needed and export the "latest" version
FROM node:14-alpine AS latest
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN BASE_PATH=/latest yarn build

# Rebuild the source code only when needed and export the "versioned" version
FROM node:14-alpine AS versioning
ARG VERSION

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Change to Static Props
RUN mv __staticsite_/[urlTitle].tsx pages/
RUN mv __staticsite_/codeshare/[urlTitle].tsx pages/codeshare/
RUN mv __staticsite_/codeshare/topic/[topic].tsx pages/codeshare/topic/

RUN BASE_PATH=/$VERSION yarn build && yarn export

# Create a new container from a linux base image that has the aws-cli installed
FROM mesosphere/aws-cli as AWS

# Copy the latest version to /latest
COPY --from=latest app/ ./latest

# Copy the versioned version to /XX.XX.XX
ARG VERSION
COPY --from=versioning app/out ./$VERSION

# Set the default command of this container to push the files from the working directory of this container to our s3 bucket 
CMD ["s3", "sync", "./", "s3://dotcms-docs-testing"] ;