FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile || npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
