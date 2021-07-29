# Install dependencies only when needed
FROM node:14-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14-alpine AS latest
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN BASE_PATH=/latest yarn build
RUN yarn export

FROM node:14-alpine AS versioning
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN BASE_PATH=/21.07 yarn build
RUN yarn export

#Create a new container from a linux base image that has the aws-cli installed
FROM mesosphere/aws-cli

#Using the alias defined for the first container, copy the contents of the build folder to this container
COPY --from=latest app/out ./latest
COPY --from=versioning app/out ./21.07

#Set the default command of this container to push the files from the working directory of this container to our s3 bucket 
CMD ["s3", "sync", "./", "s3://dotcms-docs-testing"] 