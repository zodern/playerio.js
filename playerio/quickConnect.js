var quickConnect = exports;

var client = require('./client'),
	messages = require('./messages'),
	HttpChannel = require('./HttpChannel'),
	Client = require('./Client')

quickConnect.simpleConnect = function(gameId, usernameOrEmail, password, playerInsightSegments, successCallback, errorCallback) {
	var args = messages.SimpleConnectArgs.encode({
		gameId: gameId,
		usernameOrEmail: usernameOrEmail,
		password: password,
		playerInsightSegments: playerInsightSegments
	});
		
	HttpChannel.default.request(400, args, messages.SimpleConnectOutput, function(obj) {
		 var token = obj.token;
         var userId = obj.userId;
		 successCallback(new Client(token, userId));
	}, errorCallback);
}