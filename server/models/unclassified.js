const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UnclassifiedConvoSchema = new Schema({
    cid: String,
    source: String,
    turns: [{
        text: String,
        user: String
    }],
    isDone: Boolean
});

module.exports = mongoose.model('UnclassifiedConvo', UnclassifiedConvoSchema, 'unclassified');