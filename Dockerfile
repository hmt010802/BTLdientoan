    FROM node:19-alpine As builder
    WORKDIR /app
    COPY . .
    RUN yarn install && yarn build

    FROM node:19-alpine As runner
    WORKDIR /app
    COPY . .
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json

    EXPOSE 3000
    CMD ["yarn", "start"]
