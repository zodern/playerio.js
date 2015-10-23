/* @flow */

import net from 'net';
import { EventEmitter } from 'events';
import Message from './models/message';
import PlayerIOError from './models/playerio-error';
import BinarySerializer from './helpers/binary-serializer';

export default class Connection extends EventEmitter {
	constructor(endpoint: ServerEndpoint, joinKey: string, joinData: any, roomId: string) {
		super();

		this.isConnected = false;
		this.roomId = roomId;

		let self = this;
		let serializer = new BinarySerializer();

		serializer.on('message', function (message) {
			if (!self.isConnected && message.type === 'playerio.joinresult') {
				if (!message.items[0]) {
					self.error = new PlayerIOError(message.items[1], message.items[2]);
					self.disconnect();
				} else {
					self.isConnected = true;
					self.emit('connect');
				}

			} else {
				self.emit('message', message);
			}
		});

		let sock = net.connect(endpoint.port, endpoint.address);
		this.sock = sock;

		sock.on('connect', function () {
			sock.write(new Buffer([0]));
			let msg = new Message('join', joinKey);
			for (let kv in joinData) {
				msg.add(kv.key);
				msg.add(kv.value);
			}
			self.send(msg);
		});

		sock.on('data', function (data) {
			serializer.addBytes(data);
		});

		sock.on('close', function (close) {
			if (self.isConnected) {
				self.isConnected = false;
				self.emit('disconnect');
			} else {
				self.error = self.error | new PlayerIOError(0, 'Error connecting to server.');
				self.emit('error');
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
