"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const db = require('mongoose');
const env = require('dotenv');
const axios = require('axios');

//load environment variables
env.config();

//connect to mongodb
const buildDbUrl = () => {
    const MONGODB_USER = process.env.MONGODB_USER;
    const MONGODB_PWD = process.env.MONGODB_PWD;
    const MONGODB_HOST = process.env.MONGODB_HOST;
    const MONGODB_PORT = process.env.MONGODB_PORT;
    const MONGODB_DB = process.env.MONGODB_DB;

    return `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;
}

let dbUrl = "";

// a hook for passing the url from outbound calling such as Docker
if(process.env.MONGO_URL){
    dbUrl = process.env.MONGO_URL;
}else{
    dbUrl = buildDbUrl();
}

console.log('---> connecting to mongodb with url', dbUrl);

db.Promise = global.Promise;
db.connect(dbUrl,  { useNewUrlParser: true });

//init HTTP server
const app = express()
app.use(bodyParser.json({ limit: '50mb' }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

/* START: HTTP APIs definition */
app.get('/api', function (req, res) {
    res.send('It works!');
});

app.get('/api/unclassified_convos', function (req, res) {
    let UnclassifiedConvo = require('./models/unclassified');
    UnclassifiedConvo.find({isDone: { $exists: false }}, function (err, result) {
        res.send(JSON.stringify(result));
    })
})

app.post('/api/save', function (req, res) {
    const examples = req.body;
    
    const turns = examples.map(example => ({
        "text": example.text,
        "user": example.user,
        "intent": example.intent,
        "isAction": example.isAction,
        "entities": example.entities
    }))
    
    const {source, cid} = examples[0];

    let ClassifiedConvoModel = require('./models/classified');

    ClassifiedConvoModel.create({
        source: source,
        cid: cid,
        turns: turns
    }, function (err) {
        if (err) {
            return res.json({err});
        }
        return res.json({ok: true});
    })
})

app.post('/api/update_unclassified_done', function (req, res) {
    const {cid} = req.body;

    let UnclassifiedConvo = require('./models/unclassified');

    UnclassifiedConvo.findOneAndUpdate({"cid": cid}, {$set: {
        'isDone' : true
    }}, function (err) {
        if (err) {
            return res.json({err});
        }
        return res.json({ok: true});
    })
});

/* END: HTTP APIs definition */

// Start HTTP server
const port = process.env.EXPRESS_PORT;
app.listen(port, () => {
    console.log(`HTTP server listening at port ${port}`)
})