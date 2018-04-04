# Using a multi-stage build to keep the final image size down,
# as adding Python and GCC/G++ adds about 200mb to the image,
# and they are only required during npm install
FROM node:8.11.0-alpine as build
WORKDIR /usr/src/app
COPY . .
RUN apk update && apk add python build-base
RUN npm install --production --unsafe-perm

FROM node:8.11.0-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
ENV NODE_ENV=production
EXPOSE 80
CMD ["node", "index.js"]
