const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    patient : { type: Schema.Types.ObjectId, ref: 'Person' },
    tests: [
    {
        test: { type: Object, required: true },
        quantity: { type: Number, required: true }
    }
     ],
    doctor: {

        email: {
            type: String,
            required: true
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'Doctor'
        }
  }
});

module.exports = mongoose.model('Order', orderSchema);