var protobuf = require('protocol-buffers'),
	fs = require('fs');

module.exports = protobuf(fs.readFileSync("./PlayerIO/protobuf/playerio.proto"));