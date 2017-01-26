const path = require('path');
const fs   = require('fs');
const ytdl = require('youtube-dl');

class YoutubeDownloader {
	constructor () {
    
	}

	getValidFilename (filename) {
	  return filename.replace (/\//g, "-");
	}

	downloadVideo (url) {
		return new Promise ((resolve, reject) => {
		  let size = 0;
		  let video = ytdl (url);
		  let filePath;

          video.on ("error", (error) => {
          	reject (error);
          });

		  video.on ("info", (info) => {
		    let filename = getValidFilename (info.title);

		    if (fs.existsSync (filename + '.mp4')) {
		      console.log (filename + ' exists');
		      return;
		    }

            filePath = filename + '.mp4';

		    let output = path.join (__dirname + '/', filename + '.mp4');
		    video.pipe (fs.createWriteStream (output));
		  });

		  video.on ('data', (chunk) => {
		    pos += chunk.length;

		    // `size` should not be 0 here.
		    if (size) {
		      var percent = (pos / size * 100).toFixed(2);
		      process.stdout.cursorTo(0);
		      process.stdout.clearLine(1);
		      process.stdout.write(percent + '%');
		    }
		  });

		  video.on ('end', () => {
		    console.log (' ');
		    console.log ('end');
		    resolve (filePath);
		  });
		});
		
	}
}

module.exports = new YoutubeDownloader ();