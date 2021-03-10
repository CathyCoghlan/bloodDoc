const path = require('path');

const express = require('express');

const patientController = require('../controllers/patient');

const router = express.Router();

router.get('/add-patient', patientController.getAddPatient);

router.get('/patients', patientController.getPatients);

router.post('/add-patient', patientController.postAddPatient);

router.get('/edit-patient/:patientId', patientController.getEditPatient);

router.post('/edit-patient', patientController.postEditPatient);

// Get individual patient details
router.get('/patient/:patientId', patientController.getPatient); 

router.post('/delete-patient', patientController.postDeletePatient);

router.get('/select-patient', patientController.getSelectPatient);

router.get('/order-entry/:patientId', patientController.getOrderEntry);




module.exports = router;
