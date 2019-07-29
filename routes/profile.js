'use strict';
const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const User = require('../models/User.js');
// const { isLoggedIn, isFormFilled, isCorrectPasswordFormat, isCorrectEmailFormat } = require('../middlewares/authMiddlewares.js');

// const saltRounds = 10;

router.get('/', async (req, res, next) => {
  const user = req.session.currentUser;
  console.log(user);
  const data = {
    messages: req.flash('errorFormNotFilled'),
    usernameExistent: req.flash('errorUserExistent'),
    emailExistent: req.flash('errorEmailExistent'),
    passwordformat: req.flash('errorPasswordFormat'),
    formData: req.flash('errorDataForm'),
    emailformat: req.flash('errorEmailFormat')
  };
  res.render('profile', data);
});

// router.post('/update', async (req, res, next) => {
//   const { username, password, email, location/*, picture */ } = req.body;
//   const newData = { username, password, email, location };
//   try {
//     const id = req.session.currentUser._id;
//     await User.findById(id).updateOne({ newData });
//     res.redirect('/profile');

// const salt = bcrypt.genSaltSync(saltRounds);
// const hashedPassword = bcrypt.hashSync(password, salt);

// const user = await User.findOne({ username });
// if (user) {
//   if (newData) {
//     req.flash('errorDataForm', newData);
//   }
//   req.flash('errorUserExistent', 'Username already exists');
//   return res.redirect('/auth/signup');
// }
// const newEmail = await User.findOne({ email });
// if (newEmail) {
//   if (newData) {
//     req.flash('errorDataForm', newData);
//   }
//   req.flash('errorEmailExistent', 'Email already exists');
//   return res.redirect('/auth/signup');
// }
// const newUser = await User.create({
//   username,
//   password: hashedPassword,
//   email,
//   location /*,
//   picture */
// });
// req.session.currentUser = newUser;
// res.redirect('/userHome');
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
