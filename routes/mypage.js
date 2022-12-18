var express = require('express');
var router = express.Router();

/* GET mypage listing. */
router.get('/', function (req, res, next) {
  res.render('mypage');
});

module.exports = router;
