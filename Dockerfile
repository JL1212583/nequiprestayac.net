FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# No se expone puerto de bot; si más tarde añades servidor web puedes exponer uno.
EXPOSE 3000

CMD ["npm", "start"]
