var express = require('express');
var router = express.Router();
var spotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();


// credentials are optional
var spotifyApi = new spotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

var state = 'some-state-of-my-choice';
var scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-modify-public'];
// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// /* GET /login page. */
router.get('/', function (req, res, next) {
  res.redirect(authorizeURL);
});

module.exports = router;
