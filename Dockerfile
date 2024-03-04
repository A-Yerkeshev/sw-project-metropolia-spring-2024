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
ENV MONGO_URI=mongodb+srv://swp-admin:god-damn-sw-project@cluster0.iicz17f.mongodb.net/
ENV JWT_SECRET=metropolia
EXPOSE 3000

ENTRYPOINT ["npm", "start"]