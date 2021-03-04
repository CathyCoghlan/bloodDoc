const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('patient', patientSchema);

