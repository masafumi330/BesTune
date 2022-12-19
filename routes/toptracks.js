var express = require('express');
var request = require('request');
var router = express.Router();
const localStorage = require("localStorage");


/* Get User's Top Items */
// /me/top/tracks/?limit=30&time_range=short_term
// curl --request GET \
//   --url https://api.spotify.com/v1/me/top/tracks/?limit=30&time_range=short_term \
//   --header 'Authorization: Bearer <Access Token>' \
//   --header 'Content-Type: application/json'

const getAccessToken = () => localStorage.getItem('accessToken');

router.get('/', function (req, res, next) {
    const token = getAccessToken();
    if (!token) {
        console.log("tokenがありません！");
        // auhorize -> exchange token from code
        res.redirect('/')
    }

    res.render('toptracks',);
});

module.exports = router;
