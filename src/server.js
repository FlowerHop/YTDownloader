'use strict';

const fs = require ('fs');
const path = require ('path');
const express = require ('express');
const bodyParser = require ('body-parser');
const queryString = require ('querystring');
const request = require ('request');
const ytlDownloader = require ('./YoutubeDownloader.js');

let app = express ();

app.set ('port', process.env.PORT || 1338);
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({ extended: true }));
app.use ('/', express.static ('public'));

// Additional middleware which will set headers that we need on each request.
app.use ((req, res, next) => {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader ('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader ('Cache-Control', 'no-cache');
  next ();
});

app.get ('/helloWorld', (req, res) => {
  res.send ("HelloWorld");
  res.end ();
});

app.get ('/video/:url',  (req, res) => {
  let url = req.params.url;
  ytlDownloader.downloadVideo (url) // download
  .then ((filePath) => {
    // send to client
    var options = {
      root: __dirname + '/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

    res.sendFile(filePath, options, (err) => {
      if (err) {
        throw (err);
      }
      else {
        console.log('Sent:', filePath);
      }
    });

    // remove machnism
  })
  .catch ((error) => {
  	res.send ('Download error: ' + error);
    console.log (error);
  })
  .then (() => {
  	res.end ();
  });

}); 

app.post ('/video', (req, res) => {
  let url = req.body.url;
  console.log (url);
  ytlDownloader.downloadVideo (url)
  .catch ((error) => {
    console.log (error);
  })
  .then ((filePath) => {
    // send to client
    // console.log (filePath);
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
    res.download (__dirname + '/' + filePath);
    // remove machnism
  })
  .catch ((error) => {
    res.send ('Download error: ' + error);
    console.log (error);
  })
  
});

app.get ('/file/:filePath', (req, res) => {
  let filePath = req.params.filePath;
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
  res.download (__dirname + '/' + filePath);

});

app.listen (app.get ('port'), () => {
  console.log ('Ready on port: ' + app.get ('port'));
});