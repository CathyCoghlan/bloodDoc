const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  tests: [
    {
      test: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  doctor: {
    email: {
      type: String,
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
  },
  patient: {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    clinicalDetails: { type: String, required: true },
  },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
