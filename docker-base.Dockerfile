FROM node:10.4.1-stretch

EXPOSE 5000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install -g interbit --alow-root --unsafe-perm
RUN npm install
