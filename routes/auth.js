'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { isLoggedIn, isFormFilled, isCorrectPasswordFormat, isCorrectEmailFormat } = require('../middlewares/authMiddlewares.js');
const parser = require('../config/cloudinary');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFilled'),
    usernameExistent: req.flash('errorUserExistent'),
    emailExistent: req.flash('errorEmailExistent'),
    passwordformat: req.flash('errorPasswordFormat'),
    formData: req.flash('errorDataForm'),
    emailformat: req.flash('errorEmailFormat')
  };
  res.render('signup', data);
});

router.post('/signup', parser.single('picture'), isCorrectPasswordFormat, isCorrectEmailFormat, async (req, res, next) => {
  const { username, password, email, location } = req.body;
  console.log(req.body);
  const newData = { username, password, email, location };
  const picture = req.file.secure_url;
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.findOne({ username });
    if (user) {
      if (newData) {
        req.flash('errorDataForm', newData);
      }
      req.flash('errorUserExistent', 'Username already exists');
      return res.redirect('/auth/signup');
    }
    const newEmail = await User.findOne({ email });
    if (newEmail) {
      if (newData) {
        req.flash('errorDataForm', newData);
      }
      req.flash('errorEmailExistent', 'Email already exists');
      return res.redirect('/auth/signup');
    }
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      'location.name': location,
      picture
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
    emailData: req.flash('errorEmailData'),
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
      req.flash('errorUserExistent', 'Username already exists');
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
