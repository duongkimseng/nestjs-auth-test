FROM node:alpine

WORKDIR /home/app

COPY package*.json .

COPY yarn.lock .

RUN apk update $$ apk add yarn
RUN yarn

COPY . .

RUN yarn build

CMD yarn start:prod