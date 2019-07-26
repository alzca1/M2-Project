'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { isLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares.js');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFilled'),
    usernameExistent: req.flash('errorUserExistent'),
    formData: req.flash('errorDataForm'),
    emailformat: req.flash('errorEmailFormat')
  };
  res.render('signup', data);
});

router.post('/signup', async (req, res, next) => {
  const { username, password, email, location/*, picture */ } = req.body;
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.findOne({ username });

    if (user) {
      if (email || location) {
        req.flash('errorDataForm', email, location);
      }
      req.flash('errorUserExistent', 'Username already exists');
      return res.redirect('/auth/signup');
    }
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    if (!password.match(strongRegex)) {
      req.flash('errorDataForm', 'Password must contain at least 8 characters, 1 Uppercase letter, 1 lowercase letter and 1 number');
      return res.redirect('/auth/signup');
    }
    const emailRegex = new RegExp('^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$');
    if (!email.match(emailRegex)) {
      req.flash('errorEmailFormat', 'Incorrect email format');
      return res.redirect('/auth/signup');
    }

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      location /*,
      picture */
    });
    req.session.currentUser = newUser;
    res.redirect('/userHome');
  } catch (error) {
    next(error);
  }
});

router.get('/login', (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFilled'),
    usernameExistent: req.flash('errorUserExistent'),
    formData: req.flash('errorDataForm')
  };
  res.render('login', data);
});

router.post('/login', isLoggedIn, isFormFilled, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login');
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/userHome');
    } else {
      if (username) {
        req.flash('errorDataForm', username);
      }
      req.flash('errorEmailData', 'Incorrect password');
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
