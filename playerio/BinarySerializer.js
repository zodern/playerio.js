var ShortUnsignedIntPattern = 0x80;
var IntPattern = 0x04;
var ShortStringPattern = 0xC0;
var StringPattern = 0x0C;
var BooleanTruePattern = 0x01;
var BooleanFalsePattern = 0x00;
var ByteArrayPattern = 0x10;
var DoublePattern = 0x03;

var StateInit = 0;
var StateHeader = 1;
var StateData = 2;


var BinarySerializer = exports = module.exports = function BinarySerializer() {	
	
	this.addBytes = function (bytes) {
		for (var byte in bytes)
			this.addByte(byte);
	}
	
	this.addByte = function (byte) {
		
	}
}