FROM node:20

COPY package*.json ./
RUN npm install
RUN npm run build

COPY ./build .