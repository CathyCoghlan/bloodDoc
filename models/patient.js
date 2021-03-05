const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// const patientSchema = new Schema({
//     firstName: {
//       type: String,
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true
//     },
//     description: {
//       type: String,
//       required: true
//     },
//     imageUrl: {
//       type: String,
//       required: true
//     },
//     doctorId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Doctor',
//       required: true
//     }
//   })
  




const patientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    eircode: {
        type: String,
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
      }

});

module.exports = mongoose.model('patient', patientSchema);

