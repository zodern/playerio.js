var httpChannel = exports;

var http = require('http');

// todo make it not static
var playerToken = '';
var host = 'api.playerio.com';
var basePath = '/api/';

httpChannel.request = function(method, data, successMessage, errorMessage, successCallback, errorCallback) {
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
		var body = '';
		res.on("data", function (c) {
			body += c;
		});
		
		res.on("end", function () {
			var buffer = new Buffer(body);	
			console.log(buffer);		
			var result = buffer.readInt8(0);
			if (result == 0) {
				successCallback(successMessage.decode(buffer, 1));
			} else if (result == 1) {
				errorCallback(errorMessage.decode(buffer, 1));
			}
		});
	});	
	req.write(data);
	req.end();
};