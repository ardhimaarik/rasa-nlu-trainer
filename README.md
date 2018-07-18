# rasa-nlu-trainer
This is a tool to load raw texts, label them and persist labeled texts. It is forked from [rasa NLU](https://github.com/rasahq/rasa_nlu)

## Prerequisite
- Set up and start a service of MongoDB (for storing raw texts and labeled texts)
- Set up and start a service Rasa NLU as HTTP server (for obtaining proposed intents/entities)
- Configure the connections needed at `.env`

> It is recommended to use Docker to setup about services (needed images are available on DockerHub).

## Getting started

Then, run the following commands to start this application.

```bash
$> npm install
$> npm start
# Go to `http://localhost:3000/` to access the NLU trainer. In case you want to call APIs defined in `server/server.js`, you are able to use the url `http://localhost:4321/api/unclassified_convos`, for example.
```