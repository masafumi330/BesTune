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
    const accessToken = getAccessToken();
    if (!accessToken) {
        console.log("tokenがありません！");
        // auhorize -> exchange token from code
        res.redirect('/login')
    }
    console.log("accessToken: " + accessToken);
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
        console.log(body);
    })

    res.render('toptracks');
});

module.exports = router;
