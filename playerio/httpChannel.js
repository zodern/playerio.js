var http = require('http')

var host = 'api.playerio.com';
var basePath = '/api/';

var HttpChannel = exports = module.exports = function HttpChannel(playerToken) {	
	this.request = function(method, request, successMessage, errorMessage, successCallback, errorCallback) {
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
				res = readHead(buffer);		
				if (res.success) {
					successCallback(successMessage.decode(res.buffer));
				} else {
					errorCallback(errorMessage.decode(res.buffer));
				}
			});
		});	
		req.write(request);
		req.end();	
	}
	
	function readHead(buffer) {
		var pointer = 0;
		var hasToken = buffer.readInt8(pointer++);
		if (hasToken == 1) {
			var length = buffer.readInt16BE(pointer); 
			pointer += 2;
			playerToken = buffer.toString('utf-8', pointer, length); 
			pointer += length;
		}
		return {
			success: buffer.readInt8(pointer++) == 1,
			buffer: buffer.slice(pointer)
		}
	}
}

HttpChannel.default = new HttpChannel('');