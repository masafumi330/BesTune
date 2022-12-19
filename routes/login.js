var express = require('express');
var router = express.Router();
var spotifyWebApi = require('spotify-web-api-node');
var config = require('../config');


// credentials are optional
var spotifyApi = new spotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri: config.redirectUri
});

var state = 'some-state-of-my-choice';
var scopes = ['user-read-private', 'user-read-email', 'user-top-read'];
// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// /* GET /login page. */
router.get('/', function (req, res, next) {
  res.redirect(authorizeURL);
});

module.exports = router;
