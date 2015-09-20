var ProtoBuf = require('protobufjs'),
	fs = require('fs');

var builder = ProtoBuf.loadProtoFile("./PlayerIO/protobuf/playerio.proto");
module.exports = builder.build("PlayerIO").Messages;