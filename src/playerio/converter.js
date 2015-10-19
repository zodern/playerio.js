var messages = require('./messages'),
	PlayerIOError = require('./PlayerIOError')

exports = module.exports = {
	toKeyValuePairs: function (o) {
		var arr = [];
		for (var key in o) {
			if (o.hasOwnProperty(key)) {
				var value = o[key];
				arr.push(new messages.KeyValuePair({
					key: key,
					value: value
				}))
			}
		}
		return arr;
	},
	toPlayerIOError: function (o) {
		return new PlayerIOError(o.errorCode, o.message);
	}
}