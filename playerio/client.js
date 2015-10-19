var HttpChannel = require('./HttpChannel'),
	Multiplayer = require('./multiplayer')

function Client(token, connectUserId) {
	this.connectUserId = connectUserId;
	this.channel = new HttpChannel(token);
	this.multiplayer = new Multiplayer(this.channel);
}

module.exports = Client;