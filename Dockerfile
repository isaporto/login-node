FROM node:22.2.0-slim

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c" ,"npm install &&tail -f /dev/null" ]