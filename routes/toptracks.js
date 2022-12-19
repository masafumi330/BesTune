var express = require('express');
var request = require('request');
var router = express.Router();
//Import Module
const localStorage = require("localStorage");

//Setting localStorage Item
localStorage.setItem('accessToken', 'testtoken')

/* Get User's Top Items */
// /me/top/tracks/?limit=30&time_range=short_term
// curl --request GET \
//   --url https://api.spotify.com/v1/me/top/tracks/?limit=30&time_range=short_term \
//   --header 'Authorization: Bearer <Access Token>' \
//   --header 'Content-Type: application/json'

const getAccessToken = () => localStorage.getItem('accessToken');

router.get('/', function (req, res, next) {
    const token = getAccessToken();
    // var options = {
    //     url: 'https://api.spotify.com/v1/me/top/tracks',
    //     method: 'GET',
    //     headers: {
    //         'Authorization': 'Bearer ' + token,
    //         'Content-Type': 'application/json'
    //     },
    //     qs: {
    //         'limit': 30,
    //         'term_range': 'short_term'
    //     }
    // };

    // request(options, function (error, response, body) {
    //     console.log(error);
    //     console.log(response);
    //     console.log(body);
    //     res.render('mypage', { json: body });
    // });
    console.log(token);
});

module.exports = router;
