FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY src/proto/auth.proto dist/src/proto/auth.proto

EXPOSE 50051

CMD [ "node", "dist/src/app/server.js" ]