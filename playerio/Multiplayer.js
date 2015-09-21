var messages = require('./messages'),
	converter = require('./converter'),
	Connection = require('./Connection')

var Multiplayer = exports = module.exports = function Multiplayer(channel) {	
	this.joinRoom = function(roomId, joinData, successCallback, errorCallback) {
		var args = messages.JoinRoomArgs.encode({
			roomId: roomId,
			joinData: converter.toKeyValuePairs(joinData)
		});
			
		channel.request(24, args, messages.JoinRoomOutput, messages.PlayerIOError, function(obj) {
			var joinKey = obj.joinKey;
			var endpoints = obj.endpoints;
			successCallback(new Connection(getEndpoint(endpoints), joinKey, joinData));
		}, errorCallback);
	}
	
	function getEndpoint(endpoints) {
		return endpoints[0];
	}
}