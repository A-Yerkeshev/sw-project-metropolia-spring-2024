FROM node:20
WORKDIR /

# Build frontend
WORKDIR /frontend
COPY frontend/package*.json .
RUN npm install

COPY frontend/ .
RUN npm run build

# Build backend
WORKDIR /backend
COPY backend/package*.json .
RUN npm install

COPY backend/ .

# Prepare environment and run
EXPOSE 3000

ENTRYPOINT ["npm", "start"]