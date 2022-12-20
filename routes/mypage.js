var express = require('express');
var router = express.Router();

const localStorage = require("localStorage");
const request = require('request');

const getAccessToken = () => localStorage.getItem('accessToken');

/* GET mypage listing. */
router.get('/', function (req, res, next) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    res.redirect('/login');
  } else {
    var authOptions = {
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/top/tracks',
      qs: {
        limit: 30,
        time_range: "short_term"
      },
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      json: true
    };
    request(authOptions, function (error, response, body) {
      var songList = body.items;
      res.render('mypage', { songList: songList });
    })
  }
});

router.post('/toptracks', function (req, res, next) {
  res.status(200).send('toptracks playlist make');
});

module.exports = router;
