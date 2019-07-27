'use strict';

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    // req.flash('errorFormNotFilled', 'All fields are required');
    return res.redirect('/auth/login');
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isFormFilled = (req, res, next) => {
  const { username, password } = req.body;
  if (!username && !password) {
    req.flash('errorFormNotFilled', 'All fields are required');
    return res.redirect(req.originalUrl);
  } else if (!username) {
    req.flash('errorFormNotFilled', 'Username is required');
    return res.redirect(req.originalUrl);
  } else if (!password) {
    req.flash('errorFormNotFilled', 'Password is required');
    if (username) {
      req.flash('errorDataForm', username);
    }
    return res.redirect(req.originalUrl);
  }
  next();
};

// const isCorrectPassword = (req, res, next) => {
//   const { username, password } = req.body;
//   if (bcrypt.compareSync(password, user.password)) {
//     req.session.currentUser = user;
//     res.redirect('/userHome');
//   } else {
//     if (username) {
//       req.flash('errorDataForm', username);
//     }
//     req.flash('errorEmailData', 'Incorrect password');
//     res.redirect('/auth/login');
//   }
//   next();
// };

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isFormFilled
};
