FROM node:alpine
ENV CI=true
RUN npm i -g ts-node-dev ts-node 
WORKDIR /MicroProduct
COPY package.json .

RUN npm install --only=prod
COPY . .
 
EXPOSE 8081

CMD ["npm", "start"]