import fs from 'fs';
import protobuf from 'protocol-buffers';

export default protobuf(fs.readFileSync('./../protobuf/Main.proto'));
