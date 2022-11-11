FROM node:alpine

RUN mkdir -p /app

WORKDIR /app
COPY . /app

RUN apk update && apk upgrade
RUN npm install --ignore-scripts

EXPOSE 3000

CMD ["npm", "run", "dev"]
