FROM node:22.2.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22.2.0

WORKDIR /app

COPY --from=builder /app /app

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]