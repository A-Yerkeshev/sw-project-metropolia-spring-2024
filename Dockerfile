FROM node:20
WORKDIR /

# Build frontend
RUN cd frontend
COPY package*.json /frontend
RUN npm install

COPY . /frontend
RUN npm run build

# Build backend


