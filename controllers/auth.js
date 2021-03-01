exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
      path: '/register',
      pageTitle: 'Register',
      isAuthenticated: false
    });
  };

  exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

  exports.postLogin = (req, res, next) => {
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

  exports.postRegister = (req, res, next) => {
    res.render('auth/register', {
      path: '/register',
      pageTitle: 'Register',
      isAuthenticated: false
    });
  };