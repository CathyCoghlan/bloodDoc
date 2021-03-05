const path = require('path');

const express = require('express');

const patientController = require('../controllers/patient');

const router = express.Router();

router.get('/add-patient', patientController.getAddPatient);

router.post('/add-patient', patientController.postAddPatient);



module.exports = router;
