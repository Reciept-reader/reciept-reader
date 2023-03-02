#Node version
FROM node:14

#Directory
WORKDIR /usr/src/app

#Include both package json files
COPY package*.json ./

#install npm
RUN npm install

COPY . .

#port
EXPOSE 3000

#runs script in package.json that calls "node index.js"
CMD ["npm", "start"]