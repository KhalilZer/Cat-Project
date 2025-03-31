# Stage 1: Development Stage
FROM node:23.9.0 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]




# Stage 2: Production Stage

