FROM node:10-alpine

WORKDIR /app

RUN apk add --no-cache zip

COPY ./package.json /app/

RUN npm install --silent

COPY ./ /app

CMD npm start
