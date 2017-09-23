# This official base image contains node.js and npm 
FROM node:7

WORKDIR /app

COPY package.json /app/
RUN npm install --production
COPY . /app/

CMD node app.js

EXPOSE 8080
