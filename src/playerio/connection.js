var util = require('util'),
	events = require('events'),
	net = require('net'),
	Message = require('./models/message'),
	PlayerIOError = require('./models/playerio-error'),
	BinarySerializer = require('./helpers/binary-serializer');

function Connection(endpoint, joinKey, joinData) {
	events.EventEmitter.call(this);
				
	this.connected = false;
	var that = this;
	
	var serializer = new BinarySerializer();
	serializer.on('message', function (message) {
		if (!that.connected && message.type == "playerio.joinresult") {
			if (!message.items[0]) {
				that.error = new PlayerIOError(message.items[1], message.items[2]);
				that.disconnect();
			} else {
				that.connected = true;
				that.emit('connect');				
			}
		} else {
			that.emit('message', message);
		}
	})
		
	var sock = net.connect(endpoint.port, endpoint.address);
	sock.on('connect', function () {
		sock.write(new Buffer([0]));
		var msg = new Message('join', joinKey);
		for (var kv in joinData) {
			msg.add(kv.key);
			msg.add(kv.value);
		}
		that.send(msg);
	});
	
	sock.on('data', function (data) {		
		serializer.addBytes(data);
	});
	
	sock.on('close', function (close) {
		if (that.connected) {		
			that.connected = false;
			that.emit('disconnect');
		} else {
			that.error = that.error | new PlayerIOError(0, "Error connecting to server.");
			that.emit('error');
		}
	});	
	
	this.send = function (message) {
		sock.write(BinarySerializer.serializeMessage(message));
	}
	
	this.disconnect = function () {
		this.sock.close();
	}	
}
util.inherits(Connection, events.EventEmitter);

module.exports = Connection;