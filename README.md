# rasa-nlu-trainer
This is a tool to load raw texts, label them and persist labeled texts.

![rasa-nlu-trainer-customized](./images/rasa-nlu-trainer-customized.gif)

## Up & Running

```bash
docker-compose up -d
```

## Containers

### Rasa NLU Trainer
http://localhost:8080/trainer/

### MongoDB Express
http://localhost:8082/mongo-express/db/trainer/


### Rasa NLU HTTP Server

http://localhost:8083/parse

Example request:

```bash
curl -X POST localhost:8083/parse -d '{"q": "Hi", "project": "trainer", "model": "nlu"}' | python -m json.tool
```
