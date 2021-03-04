const path = require('path');

const express = require('express');

const doctorController = require('../controllers/patient');

const router = express.Router();

router.get('/add-patient', doctorController.getAddPatient);


module.exports = router;
