const Doctor = require('../models/doctor');
const bcrypt = require('bcryptjs');
const doctor = require('../models/doctor');

exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
      path: '/register',
      pageTitle: 'Register',
      isAuthenticated: false
    });
  };

  exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

  exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Doctor.findOne({ email: email })
      .then(doctor => {
        if (!doctor) {
          return res.redirect('/login');
        }
        bcrypt
          .compare(password, doctor.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.doctor = doctor;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/');
              });
            }
            res.redirect('/login');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => console.log(err));
  };
  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/login');
    });
  };


  exports.postRegister = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mobile = req.body.mobile;
    const practice = req.body.practice;
    const code = req.body.code;
    const tel = req.body.tel;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    Doctor.findOne({email: email})
    .then(userDoc => {
      if(userDoc) {
        return res.redirect('/register');
      }
      return bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const doctor = new Doctor({
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          practice: practice,
          code: code,
          tel: tel,
          email: email,
          password: hashedPassword,
          cart: {items: []}
        });
        return doctor.save();
      })
      .then(result => {
        res.redirect('/login');
      });
    })    
    .catch(err => {
      console.log(err);
    });
  };