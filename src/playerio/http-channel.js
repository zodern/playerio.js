/* @flow */

/* global Buffer */
import http from 'http';
import messages from './models/protobuf-messages';
import converter from './helpers/converter';

var host = 'api.playerio.com';
var basePath = '/api/';

function HttpChannel(playerToken) {	
	this.request = function(method, request, successMessage, successCallback, errorCallback) {
		this.customRequest(method, request, successMessage, messages.PlayerIOError, successCallback, function (err) {
			errorCallback(converter.toPlayerIOError(err));
		})
	}
	
	this.customRequest = function(method, request, successMessage, errorMessage, successCallback, errorCallback) {
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
			var data = [];
			res.on("data", function (c) {
				data.push(c);
			});
			
			res.on("end", function () {
				var buffer = Buffer.concat(data);	
				res = readHead(buffer);	
				if (res.success) {
					successCallback(successMessage.decode(buffer, res.offset));
				} else {
					errorCallback(errorMessage.decode(buffer, res.offset));
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
			offset: pointer
		}
	}
}

HttpChannel.default = new HttpChannel('');

module.exports = HttpChannel;