FROM node:18-alpine

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
