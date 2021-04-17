const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const httpMsgs = require("http-msgs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const errorController = require("./controllers/error");
// Require User/Doctor Model
const Doctor = require("./models/doctor");

const MONGODB_URI =
  "mongodb+srv://Cathy-user:ilovepots@cluster0.j3a2v.mongodb.net/bloodDoc";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collections: "sessions",
});

//INITIALIZE FLASH FOR SUCCES & ERROR MESSAGES
app.use(flash());

// set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// REQUIRE ROUTES
const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// INITIALIZE A SESSION
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// GET A MONGODB MODEL
app.use((req, res, next) => {
  if (!req.session.doctor) {
    return next();
  }
  Doctor.findById(req.session.doctor._id)
    .then((doctor) => {
      req.doctor = doctor;
      next();
    })
    .catch((err) => console.log(err));
});

// INITILIZE ROUTES
app.use(authRoutes);
app.use(doctorRoutes);
app.use(patientRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
