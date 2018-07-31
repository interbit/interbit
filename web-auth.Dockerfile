FROM docker-base:latest

ENV APP_NAME web-auth-endpoint

COPY env-web-auth.sh /usr/src/app/env-web-auth.sh
RUN chmod 777 /usr/src/app/env-web-auth.sh
RUN npm run postinstall
WORKDIR /usr/src/app/packages/web-auth-endpoint
RUN npm run build

CMD ["sh", "-c", ". /usr/src/app/env-web-auth.sh; cd packages/web-auth-endpoint; npm run serve"]
