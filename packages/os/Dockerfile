FROM node:8.11.0-alpine

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV production

RUN npm install --production --no-package-lock

EXPOSE 80

CMD ["node", "index.js"]
