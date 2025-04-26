FROM node:16
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y python3 build-essential
RUN npm install --build-from-source sqlite3
COPY . .
EXPOSE 5000
CMD ["npm", "start"]