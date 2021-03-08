const Product = require('../models/product');
const Patient = require('../models/patient');
const patient = require('../models/patient');

exports.getAddPatient = (req, res, next) => {
    res.render('patient/add-patient', {
        pageTitle: 'Add Patient',
        path: '/add-patient',
        editing: false
    });
};

exports.postAddPatient = (req, res, next) => {
    const firstName= req.body.firstName;
    const lastName= req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const email = req.body.email;
    const gender = req.body.gender;
    const address = req.body.address;
    const county = req.body.county;
    const eircode= req.body.eircode; 
    const patient = new Patient({
      firstName: firstName,                         // Value on right is data rec'd, left refers to keys you define in your schema
      lastName:lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      gender: gender,
      address: address,
      county: county,
      eircode: eircode,
      doctorId: req.doctor // same as req.user._id
    });
    patient
      .save()
      .then(result => {
         console.log(result);
        console.log('Patient Created');
        res.redirect('/patients');
      })
      .catch(err => {
        console.log(err);
      });
  };
  
exports.getEditPatient = (req, res, next) => {
 
  const patientId = req.params.patientId
  Patient.findById(patientId)
    .then(patient => {
    if (!patient) {
      return res.redirect('/')
    }
    res.render('patient/edit-patient', {
        pageTitle: 'Edit Patient',
        path: '/edit-patient',
        //editing: editMode,
        patient: patient
    })
  })
}

  
exports.getPatients = (req, res, next) => {
  Patient.find()
    .then(patients => {
      //console.log(patients);
      res.render('patient/patients', {
        patient: patients,
        pageTitle: 'Patients',
        path: '/patients'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
  

exports.getPatient = (req, res, next) => {
  const patientId = req.params.patientId;
  Patient.findById(patientId)
  .then(patient => {
    console.log(patient);
    res.render('patient/patient', {
      patient: patient,
      pageTitle: 'Patient Details',
      path: '/patient'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postDeletePatient = (req, res, next) => {
  const patientId = req.body.patientId;
  console.log(patientId);
  Patient.findByIdAndDelete(patientId)
    .then(() => {
      console.log('DESTROYED PATIENT');
      res.redirect('/patients');
    })
    .catch(err => console.log(err));
};