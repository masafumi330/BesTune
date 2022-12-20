var express = require('express');
var router = express.Router();

const localStorage = require("localStorage");
const request = require('request');
const reqp = require('request-promise');

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
  const accessToken = getAccessToken();
  console.log("====================");
  console.log("Access Token: " + accessToken);
  console.log("====================");

  var getTopTracksOpt = {
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
  var getUserIDOpt = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    json: true
  };

  async function makePlaylist() {
    try {
      var songListRes = await reqp(getTopTracksOpt);
      var userIDRes = await reqp(getUserIDOpt);

      console.log("in async songList: ", songListRes.items[0]);
      console.log("in async userIDRes: ", userIDRes.id);
    } catch (error) {
      console.error(error);
    }
  }
  makePlaylist();
  console.log("out async");
  res.status(200).send('toptracks playlist make');
});

module.exports = router;
