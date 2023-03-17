FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /srv/app

COPY package*.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
