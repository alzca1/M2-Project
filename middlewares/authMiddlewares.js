'use strict';

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    req.flash('errorFormNotFilled', 'All fields are required');
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

const isCorrectPasswordFormat = (req, res, next) => {
  const { username, password, email, location, picture } = req.body;
  const newData = { username, password, email, location, picture };
  const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  
  if (!password.match(passwordRegex)) {
    if (newData) {
      req.flash('errorDataForm', newData);
    }
    req.flash('errorPasswordFormat', 'Password must contain at least 8 characters, 1 Uppercase letter, 1 lowercase letter and 1 number');
    return res.redirect('/auth/signup');
  }
  next();
};

const isCorrectEmailFormat = (req, res, next) => {
  const { username, password, email, location, picture } = req.body;
  const newData = { username, password, email, location, picture };
  const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
  if (!email.match(emailRegex)) {
    if (newData) {
      req.flash('errorDataForm', newData);
    }
    req.flash('errorEmailFormat', 'Incorrect email format');

    return res.redirect('/auth/signup');
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

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isCorrectPasswordFormat,
  isCorrectEmailFormat,
  isFormFilled
};
