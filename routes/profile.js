'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/', async (req, res, next) => {
  const user = req.session.currentUser;
  const newUser = await User.findById(user._id);
  res.render('profile', { newUser });
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
