'use strict';
const express = require('express');
const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

module.exports = router;
