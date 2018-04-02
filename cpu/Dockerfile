FROM node:8.11.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --production --unsafe-perm

EXPOSE 80

ENV NODE_ENV production

CMD ["node", "index.js"]
