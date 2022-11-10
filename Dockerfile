FROM node:16.18.1-bullseye-slim

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY app.js ./
ADD routes ./routes/
ADD prisma ./prisma/
RUN npm ci

CMD ["npm", "run", "start"]