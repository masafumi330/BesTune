var express = require('express');
var router = express.Router();
require('dotenv').config();
var request = require('request');
const localStorage = require("localStorage");

/* GET callback page. */
router.get('/', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null) {
        res.redirect('/' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        var authOptions = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        };
        request(authOptions, function (error, response, body) {
            if (error) {
                res.redirect('/error');
            }
            localStorage.setItem('accessToken', body.access_token)
            res.redirect('/mypage');
        })
    }
});

module.exports = router;