var util = require('util'),
	events = require('events'),
	net = require('net'),
	Message = require('./Message')
	PlayerIOError = require('./PlayerIOError');

var Connection = exports = module.exports = function Connection(endpoint, joinKey, joinData) {
	events.EventEmitter.call(this);
		
	this.on('message', onMessageHandler);
		
	var sock = new net.Socket();
	sock.connect(endpoint.port, endpoint.host, function () {
		this.connected = true;
		
		var msg = new Message('join', [joinKey]);
		for (var kv in joinData) {			
			msg.add(kv.key);
			msg.add(kv.value);
		}
		this.send(msg);
	})
	
	sock.on('data', function (data) {
		
	});
	
	sock.on('close', function (close) {
		this.connected = false;
	});
	
	this.connected = false;
	
	this.send = function (message) {
		
	}
	
	this.disconnect = function () {
		this.connected = false;
		this.sock.close();
	}
	
	function onMessageHandler(message) {
		if (message.type != "playerio.joinresult") return;
		if (!message.item(0)) {
			this.error = new PlayerIOError(message.item(1), message.item(2));
		}
		this.finishedConnecting = true;
	}
}
util.inherits(Connection, events.EventEmitter);