FROM node:10-alpine

ARG ENV

WORKDIR /app

RUN apk add --no-cache zip

COPY ./package.json /app/

ENV NODE_ENV=production

RUN npm install --silent

COPY ./ /app

CMD npm start
