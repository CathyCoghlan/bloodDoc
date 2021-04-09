const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");

exports.getRegister = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/register", {
    path: "/register",
    pageTitle: "Register",
    errorMessage: message,
    name: null,
    oldInput: {
      firstName: "",
      lastName: "",
      mobile: "",
      practice: "",
      code: "",
      tel: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    name: null,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  Doctor.findOne({ email: email })
    .then((doctor) => {
      if (!doctor) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: errors.array()[0].msg,
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, doctor.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.doctor = doctor;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            errorMessage: errors.array()[0].msg,
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/register", {
      path: "/register",
      pageTitle: "Register",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        practice: practice,
        code: code,
        tel: tel,
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const doctor = new Doctor({
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        practice: practice,
        code: code,
        tel: tel,
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return doctor.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
