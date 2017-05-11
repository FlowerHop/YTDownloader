'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var queryString = require('querystring');
var request = require('request');
var ytlDownloader = require('./YoutubeDownloader.js');

var staticFiles = {};
var app = express();

app.set('port', process.env.PORT || 8204);
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
  ytlDownloader.downloadVideo(url).catch(function (error) {
    console.log(error);
  }).then(function (fileName) {
    // send to client
    // var options = {
    //   root: __dirname + '/',
    //   dotfiles: 'deny',
    //   headers: {
    //       'x-timestamp': Date.now(),
    //       'x-sent': true
    //   }
    // };

    // res.sendFile(filePath, options, (err) => {
    //   if (err) {
    //     throw (err);
    //   }
    //   else {
    //     console.log('Sent:', filePath);
    //   }
    // });
    // res.download (__dirname + '/' + filePath);
    staticFiles[fileName] = new Date().getHours();
    res.send(fileName);
    // remove machnism
  }).catch(function (error) {
    res.send('Download error: ' + error);
    console.log(error);
  });
});

app.get('/file/:fileName', function (req, res) {
  var fileName = req.params.fileName;
  // var options = {
  //   root: __dirname + '/',
  //   dotfiles: 'deny',
  //   headers: {
  //       'x-timestamp': Date.now(),
  //       'x-sent': true
  //   }
  // };

  // res.sendFile(filePath, options, (err) => {
  //   if (err) {
  //     throw (err);
  //   }
  //   else {
  //     console.log('Sent:', filePath);
  //   }
  // });
  console.log('get file op');
  res.download(__dirname + '/' + fileName);
});

app.listen(app.get('port'), function () {
  console.log('Ready on port: ' + app.get('port'));
  setInterval(function () {
    for (var k in staticFiles) {
      if (new Date().getHours() - staticFiles[k] >= 2) {
        fs.unlink(__dirname + '/' + k, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('remove ' + fileName);
          }
        });
      }
    }
  }, 5000);
});