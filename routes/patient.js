const path = require("path");

const express = require("express");
const { body } = require("express-validator/check");

const patientController = require("../controllers/patient");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-patient", isAuth, patientController.getAddPatient);

router.get("/patients", isAuth, patientController.getPatients);

router.post(
  "/add-patient",
  [
    body("firstName").isLength({ min: 1 }).trim(),
    body("lastName").isLength({ min: 1 }).trim(),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("address").isLength({ min: 1 }).trim(),
    body("county").isLength({ min: 1 }).trim(),
    body("eircode").isLength({ min: 1 }).trim(),
  ],
  patientController.postAddPatient
);

router.get(
  "/edit-patient/:patientId",
  isAuth,
  patientController.getEditPatient
);

router.post(
  "/edit-patient-details",
  [
    body("firstName").isLength({ min: 1 }).trim(),
    body("lastName").isLength({ min: 1 }).trim(),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("address").isLength({ min: 1 }).trim(),
    body("county").isLength({ min: 1 }).trim(),
    body("eircode").isLength({ min: 1 }).trim(),
  ],
  isAuth,
  patientController.postEditPatient
);

// Get individual patient details
router.get("/patient/:patientId", isAuth, patientController.getPatient);

router.post("/delete-patient", isAuth, patientController.postDeletePatient);

router.get("/select-patient", isAuth, patientController.getSelectPatient);

router.get("/order-entry/:patientId", isAuth, patientController.getOrderEntry);

router.get("/cart/:patientId", isAuth, patientController.getCart);

router.post("/addTest/:testId", isAuth, patientController.postAddTest);

router.delete(
  "/cart-delete-item/:testId",
  isAuth,
  patientController.postCartDeleteTest
);

router.post("/create-order", isAuth, patientController.postOrder);

router.get("/orders", isAuth, patientController.getOrders);

router.get("/orders/:patientId", isAuth, patientController.getPatientOrders);

module.exports = router;
