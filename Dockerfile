FROM node:boron

WORKDIR /WebApp

COPY /WebApp /WebApp

RUN npm install

RUN npm install -g typescript
RUN npm install -g webpack 

RUN tsc

RUN npm run build

EXPOSE 1200

CMD [ "npm", "start" ]