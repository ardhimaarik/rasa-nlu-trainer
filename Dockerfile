FROM node:7.4-alpine

WORKDIR /rasa-nlu-trainer
COPY . ./

RUN npm install

EXPOSE 3000 4321

CMD ["npm", "start", "-p", "3000"]