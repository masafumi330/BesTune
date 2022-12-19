var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('request');

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
                redirect_uri: config.redirectUri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(config.clientId + ':' + config.clientSecret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        request(authOptions, function (error, response, body) {
            console.log(response);
            console.log(body);
        })
    }
    res.redirect('/mypage');
});

module.exports = router;