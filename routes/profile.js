'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId).populate('recipes'); // con populate mongoose busca todas las recetas relacionadas con el user y las trae
  console.log(user);
  res.render('profile', user);
});

module.exports = router;
