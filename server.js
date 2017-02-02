'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var queryString = require('querystring');
var request = require('request');
var ytlDownloader = require('./YoutubeDownloader.js');

var app = express();

app.set('port', process.env.PORT || 1338);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/helloWorld', function (req, res) {
  res.send("HelloWorld");
  res.end();
});

app.get('/video/:url', function (req, res) {
  var url = req.params.url;
  ytlDownloader.downloadVideo(url) // download
  .then(function (filePath) {
    // send to client
    var options = {
      root: __dirname + '/',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    res.sendFile(filePath, options, function (err) {
      if (err) {
        throw err;
      } else {
        console.log('Sent:', filePath);
      }
    });

    // remove machnism
  }).catch(function (error) {
    res.send('Download error: ' + error);
    console.log(error);
  }).then(function () {
    res.end();
  });
});

app.post('/video', function (req, res) {
  var url = req.body.url;
  console.log(url);
  ytlDownloader.downloadVideo(url).catch(function (error) {
    console.log(error);
  }).then(function (filePath) {
    res.end(filePath);
  }).then(function () {
    // res.end ();
  });
});

app.listen(app.get('port'), function () {
  console.log('Ready on port: ' + app.get('port'));
});