const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassifiedConvoSchema = new Schema({
    cid: String,
    source: String,
    turns: [{
        text: String,
        user: String,
        intent: String,
        isAction: Boolean,
        entities: [{
            start: Number,
            end: Number,
            value: String,
            entity: String
        }]
    }]
});

module.exports = mongoose.model('ClassifiedConvo', ClassifiedConvoSchema, 'classified');