'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const data = req.query;
  res.render('userHome');
  console.log(data);
});

module.exports = router;
