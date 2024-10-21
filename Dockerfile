FROM node:18.17.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install tsc -g
RUN npm install pm2 -g
RUN npm install
COPY . .
CMD ["npm", "run", "start:pm2Docker"]