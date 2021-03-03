const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//onst session = require('express-session');
//const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
// Require User/Doctor Model
const Doctor = require('./models/doctor');

const app = express();

// set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// REQUIRE ROUTES
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    Doctor.findById('602fcadc23387e0dec61916a')
      .then(doctor => {
        req.doctor = doctor
        next();
      })
      .catch(err => console.log(err));
    
  });

// MIDDLEWARE FOR SESSION

// INITIALIZE A SESSION

// INITILIZE ROUTES
app.use(authRoutes);
app.use(doctorRoutes);
app.use(patientRoutes);
app.use(errorController.get404);


mongoose.connect(
    'mongodb+srv://Cathy-user:ilovepots@cluster0.j3a2v.mongodb.net/bloodDoc?retryWrites=true&w=majority'
    )
    .then(result => {
    Doctor.findOne().then(doctor => {
        if(!doctor) {
          const user = new Doctor({
            name: 'Cathy',
            email: 'cathy@test.com'

          });
          user.save();
        }
      });
      app.listen(3000);
    })
    .catch(err => {
      console.log(err);
    });