'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var fs = require('fs');
var ytdl = require('youtube-dl');

var YoutubeDownloader = function () {
	function YoutubeDownloader() {
		_classCallCheck(this, YoutubeDownloader);
	}

	_createClass(YoutubeDownloader, [{
		key: 'getValidFilename',
		value: function getValidFilename(filename) {
			return filename.replace(/\//g, "-");
		}
	}, {
		key: 'downloadVideo',
		value: function downloadVideo(url) {
			return new Promise(function (resolve, reject) {
				var size = 0;
				var video = ytdl(url);
				var filePath = void 0;

				video.on("error", function (error) {
					reject(error);
				});

				video.on("info", function (info) {
					var filename = getValidFilename(info.title);

					if (fs.existsSync(filename + '.mp4')) {
						console.log(filename + ' exists');
						return;
					}

					filePath = filename + '.mp4';

					var output = path.join(__dirname + '/', filename + '.mp4');
					video.pipe(fs.createWriteStream(output));
				});

				video.on('data', function (chunk) {
					pos += chunk.length;

					// `size` should not be 0 here.
					if (size) {
						var percent = (pos / size * 100).toFixed(2);
						process.stdout.cursorTo(0);
						process.stdout.clearLine(1);
						process.stdout.write(percent + '%');
					}
				});

				video.on('end', function () {
					console.log(' ');
					console.log('end');
					resolve(filePath);
				});
			});
		}
	}]);

	return YoutubeDownloader;
}();

module.exports = new YoutubeDownloader();