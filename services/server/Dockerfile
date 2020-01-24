FROM node:alpine
LABEL maintainer="gary.ascuy@gmail.com"

ENV NODE_ENV=production
WORKDIR /root/node/app
COPY package.json ./package.json
COPY ./build ./build
RUN npm install

CMD node build/app.js
