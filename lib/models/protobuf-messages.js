/* @flow */

import fs from 'fs';
import path from 'path';
import protobuf from 'protocol-buffers';

export default protobuf(fs.readFileSync(path.join(__dirname, 'protobuf-messages.proto')));
