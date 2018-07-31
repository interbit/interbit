FROM docker-base:latest

ENV APP_NAME platform-deploy

COPY env-platform-deploy.sh /usr/src/app/env-platform-deploy.sh
RUN chmod 777 /usr/src/app/env-platform-deploy.sh
RUN npm run postinstall
WORKDIR /usr/src/app/packages/platform-deploy
RUN npm run build

CMD ["sh", "-c", ". /usr/src/app/env-platform-deploy.sh; cd packages/platform-deploy; npm run serve"]
