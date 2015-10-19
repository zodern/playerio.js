var messages = require('./messages'),
	converter = require('./converter'),
	Connection = require('./Connection')

function Multiplayer(channel) {	
	this.joinRoom = function(roomId, joinData, successCallback, errorCallback) {
		var args = messages.JoinRoomArgs.encode({
			roomId: roomId,
			joinData: converter.toKeyValuePairs(joinData),
			isDevRoom: false
		});
			
		channel.request(24, args, messages.JoinRoomOutput, function(obj) {
			var joinKey = obj.joinKey;
			var endpoints = obj.endpoints;
			var con = new Connection(getEndpoint(endpoints), joinKey, joinData);
			con.on('connect', function () {
				successCallback(con);
			});
			con.on('error', function () {
				errorCallback(con.error);				
			})
		}, errorCallback);
	}
	
	function getEndpoint(endpoints) {
		return endpoints[0];
	}
}

module.exports = Multiplayer;