var httpChannel = exports;

var http = require('http');

// todo make it not static
var playerToken = '';
var host = 'api.playerio.com';
var basePath = '/api/';

httpChannel.request = function(method, request, successMessage, errorMessage, successCallback, errorCallback) {
	var options = {
		host: host,
		path: basePath + method,
		method: 'POST',
		headers: {			
			'Content-Type': 'application/x-www-form-urlencoded',
			'playertoken': playerToken
		}
	}

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		
		var body = '';
		res.on("data", function (c) {
			body += c;
		});
		
		res.on("end", function () {
			var pointer = 0;
			var buffer = new Buffer(body);
			var hasToken = buffer.readInt8(pointer++);
			if (hasToken == 1) {
				var length = buffer.readInt16BE(pointer); pointer += 2;
				playerToken = buffer.toString('utf-8', pointer, length); pointer += length;
			}
			var result = buffer.readInt8(pointer++);
			
			var data = buffer.slice(pointer);
			if (result == 0) {
				successCallback(successMessage.decode(data));
			} else if (result == 1) {
				errorCallback(errorMessage.decode(data));
			}
		});
	});	
	req.write(request);
	req.end();
};