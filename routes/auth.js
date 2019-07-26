'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const { username, password, email, location/*, picture */ } = req.body;
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.findOne({ username });
    if (user) {
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
  res.render('login');
});

router.post('/login', async (req, res, next) => {
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
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
