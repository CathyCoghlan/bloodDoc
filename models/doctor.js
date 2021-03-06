const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('Doctor', doctorSchema);

