var quickConnect = exports;

var client = require('./client'),
	messages = require('./messages'),
	httpChannel = require('./httpChannel'),
	client = require('./client')

quickConnect.simpleConnect = function(gameId, usernameOrEmail, password, playerInsightSegments, successCallback, errorCallback) {
	var args = messages.SimpleConnectArgs.encode({
		gameId: gameId,
		usernameOrEmail: usernameOrEmail,
		password: password,
		playerInsightSegments: playerInsightSegments
	});
	
	httpChannel.request(400, args, messages.SimpleConnectOutput, messages.SimpleConnectError, function(obj) {
		 console.log(obj);
		 var token = obj.token;
         var userId = obj.userId;
		 successCallback(userId);
	}, errorCallback);
}