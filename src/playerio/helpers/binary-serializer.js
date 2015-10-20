/* global Buffer */
var util = require('util'),
	events = require('events'),
	Message = require('./../models/message'),
	ByteBuffer = require('bytebuffer');

var StringShortPattern = 0xC0;
var StringPattern = 0x0C;

var ByteArrayShortPattern = 0x40;
var ByteArrayPattern = 0x10;

var UnsignedLongPattern = 0x38;
var LongPattern = 0x30; 

var UnsignedIntShortPattern = 0x80;
var UnsignedIntPattern = 0x08;
var IntPattern = 0x04;

var DoublePattern = 0x03;
var FloatPattern = 0x02; 
var BooleanTruePattern = 0x01;
var BooleanFalsePattern = 0x00;

var StateInit = 0
var StateHeader = 1
var StateData = 2


function BinarySerializer() {	
	events.EventEmitter.call(this);
	
	var that = this;
	var state = StateInit;
	var valtype = 0;
	var partlen = 0;
	var buf = new ByteBuffer();
		
	this.addBytes = function (bytes) {
		for (var i = 0; i < bytes.length; i++) {		
			this.addByte(bytes[i]);	
		}
	}
	
	var c = 0;
	
	this.addByte = function (b) {
		c++;
		if (state == StateInit){
			if (hasFlag(b, StringShortPattern)) {
				valtype = StringShortPattern;			
				partlen = b & ~StringShortPattern;
				if (partlen > 0) {
					state = StateData;
				} else {
					onValue("");
				}
				
			} else if (hasFlag(b, ByteArrayShortPattern)) {
				valtype = ByteArrayShortPattern;			
				partlen = b & ~StringShortPattern;
				if (partlen > 0) {
					state = StateData;
				} else {
					onValue(new Buffer());
				}
				
			} else if (hasFlag(b, UnsignedIntShortPattern)) {
				onValue(b & ~UnsignedIntShortPattern)
				
			} else if (hasFlag(b, UnsignedLongPattern)) {
				return 0; // Longs aren't supported
				
			} else if (hasFlag(b, LongPattern)) {
				return 0; // Longs aren't supported		
						
			} else if (hasFlag(b, ByteArrayPattern)) {
				partlen = readLength(b, ByteArrayPattern);
				valtype = ByteArrayPattern;
                state = StateHeader;
				
			} else if (hasFlag(b, UnsignedIntPattern)) {
				partlen = readLength(b, UnsignedIntPattern);
				valtype = UnsignedIntPattern;
                state = StateData;
				
			} else if (hasFlag(b, IntPattern)) {
				partlen = readLength(b, IntPattern);
				valtype = IntPattern;
                state = StateData;
				
			} else if (hasFlag(b, DoublePattern)) {
				valtype = DoublePattern;
				partlen = 8;
				state = StateData;
				
			} else if (hasFlag(b, FloatPattern)) {
				valtype = FloatPattern;
				partlen = 4;
				state = StateData;
				
			} else if (hasFlag(b, BooleanTruePattern)) {
				onValue(true);	
							
			} else if (hasFlag(b, BooleanFalsePattern)) {
				onValue(false);
			} 			
		} else {
			buf.writeByte(b);
			if (buf.offset == partlen) {
				buf.flip();
				
				if (state == StateHeader) {
					partlen = readInt32(buf);
					state = StateData;					
				} else if (state == StateData){					
					if (valtype == StringPattern || valtype == StringShortPattern) {
						onValue(buf.toUTF8());
					} else if (valtype == ByteArrayPattern || valtype == ByteArrayShortPattern) {
						onValue(buf.toBuffer(true));
					} else if (valtype == UnsignedIntPattern) {
						onValue(readInt32(buf));
					} else if (valtype == IntPattern) {
						if (buf.limit == 4) {
							onValue(buf.readInt32());
						} else {
							onValue(readInt32(buf));
						}
					} else if (valtype == DoublePattern) {
						onValue(buf.readDouble());
					} else if (valtype == FloatPattern) {
						onValue(buf.readFloat());
					}
				}
				
				buf.reset();
			}
		}
	}
	
	var count = -1;
	var currMsg;
	function onValue(value) {
		if (count == -1) {
			count = value;
		} else if (!currMsg) {
			currMsg = new Message(value);
		} else {
			currMsg.add(value);			
		}
		
		if (currMsg && currMsg.getLength() == count) {
			that.emit('message', currMsg);
			
			count = -1;
			currMsg = null;
		}
		
		state = StateInit;
	}
}
util.inherits(BinarySerializer, events.EventEmitter);

module.exports = BinarySerializer;


function readLength(b, pattern) {	
    return (b & ~pattern) + 1;
}

function hasFlag(b, pattern) {
	return (b & pattern) == pattern;
}

BinarySerializer.serializeMessage = function (message) {
	var buf = new ByteBuffer();
	buf.append(serializeValue(message.getLength()));
	buf.append(serializeValue(message.type));
	for (var i = 0; i < message.getLength(); i++)
		buf.append(serializeValue(message.items[i]));
	buf.flip();
	return buf.toBuffer();
}

function serializeValue(value) {
	var buf = new ByteBuffer();
	if (typeof value == 'boolean') {
		if (value) {
			buf.writeByte(BooleanTruePattern);
		} else {
			buf.writeByte(BooleanFalsePattern);				
		}
	} else if (typeof value == 'string') {
		writeShort(buf, value.length, StringShortPattern, StringPattern);
		buf.writeString(value);
	} else if (typeof value == 'number') {
		if (value % 1 || value > 0xFFFFFFFF || value < -0x80000000) { // double
			buf.writeByte(DoublePattern);
			buf.writeDouble(value);
		} else if (value > 0x7FFFFFFF) { // uint
			buf.writeByte(UnsignedIntPattern);
			buf.writeUint32(value);
		} else { // int
			writeShort(buf, value, UnsignedIntShortPattern, IntPattern);
		}
	} else if (value instanceof Buffer) {
		writeShort(buf, value.length, ByteArrayShortPattern, ByteArrayPattern);
		buf.append(buf);
	}
	buf.flip();
	return buf;
}

function writeShort(buf, length, topPattern, bottomPattern)
{
	if ((length > 63) || (length < 0))
	{
		writeInt32(buf, bottomPattern, length);
	}
	else
	{
		buf.writeByte(topPattern | length);
	}
}

function writeInt32(buf, pattern, value)
{
	var tempBuf = new ByteBuffer();
	tempBuf.writeInt32(value);
	tempBuf.flip();
	while (tempBuf.readUint8(tempBuf.offset) == 0) {
		tempBuf.offset++;
	}
	
	buf.writeByte(pattern | tempBuf.remaining() - 1);
	buf.append(tempBuf);
}

function readInt32(buf)
{
	var res = 0;
	while (buf.offset < buf.limit) {
		res <<= 8;
		res += buf.readUint8();
	}
	return res;
}