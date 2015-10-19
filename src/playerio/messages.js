var protobuf = require('protocol-buffers'),
	fs = require('fs')

module.exports = protobuf(fs.readFileSync("./playerio/playerio.proto"));