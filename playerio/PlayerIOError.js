var PlayerIOError = exports = module.exports = function PlayerIOError(code, message) {	
	this.code = code;
	this.message = message;
}