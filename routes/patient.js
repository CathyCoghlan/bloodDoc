const path = require('path');

const express = require('express');

const patientController = require('../controllers/patient');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-patient', isAuth, patientController.getAddPatient);

router.get('/patients', isAuth, patientController.getPatients);

router.post('/add-patient', patientController.postAddPatient);

router.get('/edit-patient/:patientId', isAuth, patientController.getEditPatient);

router.post('/edit-patient', isAuth, patientController.postEditPatient);

// Get individual patient details
router.get('/patient/:patientId', isAuth, patientController.getPatient); 

router.post('/delete-patient', isAuth, patientController.postDeletePatient);

router.get('/select-patient', isAuth, patientController.getSelectPatient);

router.get('/order-entry/:patientId', isAuth, patientController.getOrderEntry);

router.get('/cart/:patientId', isAuth, patientController.getCart);

router.post('/addTest/:testId', isAuth, patientController.postAddTest);

router.delete('/cart-delete-item/:testId', isAuth, patientController.postCartDeleteTest);

router.post('/create-order', isAuth, patientController.postOrder);

router.get('/orders', isAuth, patientController.getOrders);




module.exports = router;
