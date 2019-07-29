'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { isLoggedIn, isFormFilled, isCorrectPasswordFormat, isCorrectEmailFormat } = require('../middlewares/authMiddlewares.js');
const parser = require('../config/cloudinary');

const saltRounds = 10;

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id);
  console.log(user);
  const data = {
    messages: req.flash('errorFormNotFilled'),
    usernameExistent: req.flash('errorUserExistent'),
    emailExistent: req.flash('errorEmailExistent'),
    passwordformat: req.flash('errorPasswordFormat'),
    formData: req.flash('errorDataForm'),
    emailformat: req.flash('errorEmailFormat'),
    user
  };
  res.render('modifyProfile', { data });
});

router.post('/:id/edit', parser.single('picture'), async (req, res, next) => {
  const { password, email, location } = req.body;
  const { id } = req.params;

  const picture = req.file.secure_url;

  console.log(req.body);
  try {
    await User.findByIdAndUpdate(id, {
      password,
      email,
      'location.name': location,
      picture
    });
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
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
