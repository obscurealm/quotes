FROM node:alpine

RUN mkdir -p /app

WORKDIR /app
COPY . /app

RUN apk update && apk upgrade && apk add git
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
