# Build target development #
###########################
FROM node:14-alpine AS development
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

# Install development dependencies
RUN yarn install --frozen-lockfile

COPY . ./

EXPOSE 3000
CMD ["yarn", "dev"]