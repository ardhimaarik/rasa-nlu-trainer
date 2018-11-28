FROM node:10.7.0-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

WORKDIR /nlu-trainer
RUN mv /tmp/node_modules ./node_modules

COPY . ./
ENV TRAINER_HOME=/nlu-trainer
VOLUME ${TRAINER_HOME}/logs
EXPOSE 3000 4321

CMD ["npm", "start", "-p", "3000"]