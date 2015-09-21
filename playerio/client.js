var HttpChannel = require('./HttpChannel'),
	Multiplayer = require('./multiplayer')

var Client = exports = module.exports = function Client(token, connectUserId) {
	this.connectUserId = connectUserId;
	this.channel = new HttpChannel(token);
	this.multiplayer = new Multiplayer(this.channel);
}