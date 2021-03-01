const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//onst session = require('express-session');
//const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
// Require User/Doctor Model


const app = express();

// SET UP EJS VIEWS
app.set('view engine', 'ejs');
app.set('views', 'views');

// REQUIRE ROUTES
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARE FOR SESSION

// INITIALIZE A SESSION

// INITILIZE ROUTES
app.use(authRoutes);
app.use(doctorRoutes);
app.use(patientRoutes);
app.use(errorController.get404);


app.listen(3000);