/* @flow */

import net from 'net';
import { EventEmitter } from 'events';
import Message from './models/message';
import PlayerIOError from './models/playerio-error';
import ServerEndpoint from './models/server-endpoint';
import * as ErrorCode from './enums/error-code';
import BinarySerializer from './helpers/binary-serializer';

export default class Connection extends EventEmitter {
	constructor(endpoint: ServerEndpoint, joinKey: string, joinData: any, roomId: string) {
		super();

		this.isConnected = false;
		this.roomId = roomId;

		let serializer = new BinarySerializer();

		serializer.on('message', (message) => {
			if (!this.isConnected && message.type === 'playerio.joinresult') {
				if (!message.items[0]) {
					this.error = new PlayerIOError(message.items[1], message.items[2]);
					this.disconnect();
				} else {
					this.isConnected = true;
					this.emit('connect');
				}

			} else {
				this.emit('message', message);
			}
		});

		let sock = net.connect(endpoint.port, endpoint.address);
		this.sock = sock;

		sock.on('connect', () => {
			sock.write(new Buffer([0]));
			let msg = new Message('join', joinKey);
			for (let kv in joinData) {
				msg.add(kv.key);
				msg.add(kv.value);
			}
			this.send(msg);
		});

		sock.on('data', (data) => {
			serializer.addBytes(data);
		});

		sock.on('close', () => {
			if (this.isConnected) {
				this.isConnected = false;
				this.emit('disconnect');
			} else {
				this.error = this.error || new PlayerIOError(ErrorCode.UNSUPPORTED_METHOD, 'Error connecting to server.');
				this.emit('error');
			}
		});
	}

	send(message) {
		this.sock.write(BinarySerializer.serializeMessage(message));
	}

	disconnect() {
		this.sock.close();
	}
}
