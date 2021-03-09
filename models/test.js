const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
        },
    turnAroundTime: {
        type: String,
        required: true
    },
    specimenType: {
        type: String,
        required: true
    },
    group: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('Test', testSchema);
