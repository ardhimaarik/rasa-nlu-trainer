FROM node:12.6 as build-deps
WORKDIR /usr/src/app
RUN yarn
COPY package.json yarn.lock ./
COPY . ./
RUN yarn build


# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]


#FROM node:10.7.0-alpine
#
#ADD package.json /tmp/package.json
#RUN cd /tmp && npm install
#
#WORKDIR /nlu-trainer
#RUN mv /tmp/node_modules ./node_modules
#
#COPY . ./
#ENV TRAINER_HOME=/nlu-trainer
#VOLUME ${TRAINER_HOME}/logs
#EXPOSE 3000 4321
#
#CMD ["npm", "start", "-p", "3000"]