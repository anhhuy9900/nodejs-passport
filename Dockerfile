FROM node:lts-alpine

ARG ENVIRONMENT

ENV NODE_ENV=$ENVIRONMENT

WORKDIR /home/node/nodejs-passport/src

COPY ["package*.json", "/home/node/nodejs-passport/"]

RUN npm i

RUN npm i -g pm2

COPY [".", "/home/node/nodejs-passport/"]

# CMD ["pm2-runtime", "ecosystem.local.config.js"]

CMD ["npm", "run", "start:dev"]

EXPOSE 3600