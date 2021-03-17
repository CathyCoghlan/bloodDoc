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
    },
    cart: {
        patientId: {type: Schema.Types.ObjectId, ref: 'Patient', required: false},
        tests: [
            {
                testId: {type: Schema.Types.ObjectId, ref: 'Test', required: false}
            }
        ]
    }


});

doctorSchema.methods.addToCart = function(test) {
    
                                                               // Set the updatedCart to Cart
                                                                  // Call the mongoose method save()
}


module.exports = mongoose.model('Doctor', doctorSchema);

