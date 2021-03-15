FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV mongoURI="mongodb://database:27017/members_management"

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
