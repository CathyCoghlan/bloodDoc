const Patient = require('../models/patient');

exports.getAddPatient = (req, res, next) => {
    res.render('patient/add-patient', {
        pageTitle: 'Add Patient',
        path: '/add-patient'
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
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  
exports.getPatients= (req, res, next) => {
    res.render('patient/patients', {
        pageTitle: 'All Patients',
        path: '/patients'
    });
};
  