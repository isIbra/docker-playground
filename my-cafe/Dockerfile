FROM node:16.16.0-alpine 

WORKDIR /app

ADD package-lock.json .

ADD package.json . 

RUN npm install --silent

ADD . .

CMD npm start

EXPOSE 3000