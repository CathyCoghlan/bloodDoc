const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  tests: [
    {
        test: { type: Object, required: true }
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