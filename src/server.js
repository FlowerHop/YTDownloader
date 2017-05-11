'use strict';

const fs = require ('fs');
const path = require ('path');
const express = require ('express');
const bodyParser = require ('body-parser');
const queryString = require ('querystring');
const request = require ('request');
const ytlDownloader = require ('./YoutubeDownloader.js');

let staticFiles = {};
let app = express ();

app.set ('port', process.env.PORT || 8204);
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
  ytlDownloader.downloadVideo (url)
  .catch ((error) => {
    console.log (error);
  })
  .then ((fileName) => {
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
    staticFiles[fileName] = new Date ().getHours ();
    res.send (fileName);
    // remove machnism
  })
  .catch ((error) => {
    res.send ('Download error: ' + error);
    console.log (error);
  })
  
});

app.get ('/file/:fileName', (req, res) => {
  let fileName = req.params.fileName;
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
  console.log ('get file op');
  res.download (__dirname + '/' + fileName);
});

app.listen (app.get ('port'), () => {
  console.log ('Ready on port: ' + app.get ('port'));
  setInterval (() => {
    for (let k in staticFiles) {
      if (new Date ().getHours () - staticFiles[k] >= 2) {
        fs.unlink (__dirname + '/' + k, (err) => {
          if (err) {
            console.log (err);
          } else {
            console.log ('remove ' + fileName);
          }
        });
      } 
    }
  }, 5000);
});