const express = require('express');
const router = express.Router();
const localStorage = require("localStorage");

/* POST /logout page. */
router.post('/', function (req, res, next) {
  localStorage.clear();
  res.redirect('/');
});

module.exports = router;
