FROM node:lts-alpine

WORKDIR /srv/app

COPY package*.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build --production

CMD ["npm", "run", "start"]
