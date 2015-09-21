var Message = exports = module.exports = function Message(msgType, contents) {
	this.type = msgType;	
	this.contents = contents || [];
	
	this.add = function (o) {
		// TODO: Check type
		this.contents.push(o);
	}
	
	this.item = function (index) {
		return contents[index];
	}
	
	this.addItems = function (os) {
		for (var item in os)
			this.add(item);
	}
	
	this.length = function () {
		return this.contents.length;
	}
	
	this.toString = function () {
		return this.contents.toString();
	}
}