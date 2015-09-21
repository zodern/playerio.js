//var ProtoBuf = require('protobufjs');
var protobuf = require('protocol-buffers'),
	fs = require('fs')

//module.exports = ProtoBuf.loadProtoFile("./PlayerIO/protobuf/playerio.proto").build('');

module.exports = protobuf(fs.readFileSync("./PlayerIO/protobuf/playerio.proto"));