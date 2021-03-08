const path = require('path');

const express = require('express');

const patientController = require('../controllers/patient');

const router = express.Router();

router.get('/add-patient', patientController.getAddPatient);

router.post('/add-patient', patientController.postAddPatient);

router.get('/patients', patientController.getPatients);

router.get('/edit-patient/:patientId', patientController.getEditPatient);

// Get individual patient details
router.get('/patient/:patientId', patientController.getPatient); 

router.post('/delete-patient', patientController.postDeletePatient);




module.exports = router;
